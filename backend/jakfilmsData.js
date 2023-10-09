// app.js

import {config} from 'dotenv';
config();

import express from 'express';
import {createServer} from 'http';
import mongoose from 'mongoose';
import {Server} from 'socket.io';
import authRoute from './routes/authRoute.js';
import secureRoute from './routes/secureRoute.js';
import userRoutes from './routes/userRoutes.js';

import ChatMessage from './models/ChatMessage.js';
import LikeModel from './models/Likes.js';
import User from './models/User.js';
import passport from './utils/pass.js';

const connectPort = 3002;
const app = express();
const http = createServer(app);
const io = new Server(http);
const maxSavedMessages = 300;
const startTime = new Date();
console.log(
  ' Backend database server start time: ' + startTime.toLocaleString()
);
app.get('/', (req, res) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  res.send(`
    <h1>This is backend server calling</h1>
    <h2>It's running on port ${connectPort}</h2>
    <p>Start time: ${startTime.toLocaleString()}</p>
    <p>Uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds</p>
    `);
});

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

// Serve static files

// Connect to the MongoDB database
mongoose
  .connect('mongodb://localhost/jakfilms', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Use user routes
app.use('/users', userRoutes);
app.use('/auth', authRoute);
app.use(
  '/secure',
  passport.authenticate('jwt', {session: false}),
  secureRoute
);
let totalViewers = 0;
let liveViewers = 0;



io.on('connection', (socket) => {

  socket.on('NewLiveViewer', (data) => {
    // console.log('NewLiveViewer', data);
    liveViewers++;
    totalViewers++;
    io.emit('LiveViewers', liveViewers);
    io.emit('TotalViewers', totalViewers);
  });

  socket.on('getInitialLikeCounts', async (userId) => {
    try {
      const likeDocument = await LikeModel.findOne({ name: userId });
      if (likeDocument) {
        socket.emit('initialLikeCounts', {
          likes: likeDocument.likes,
          dislikes: likeDocument.dislikes,
        });
      }
    } catch (error) {
      console.error('Error getting initial like counts:', error);
    }
  });



  socket.on('likeVideo', async (userId) => {
    try {
      // Find the like document for the user
      let likeDocument = await LikeModel.findOne({ name: userId });

      // If 'likeDocument' is null or undefined, create a new document with initial values
      if (!likeDocument) {
        likeDocument = new LikeModel({ name: userId, likes: 1, dislikes: 0 });
      } else {
        // Increment the 'likes' count
        likeDocument.likes += 1;
      }

      // Save the updated like document back to the database
      await likeDocument.save();

      // Emit the updated like counts to all connected clients
      io.emit('likeCountsUpdated', { likes: likeDocument.likes, dislikes: likeDocument.dislikes });
    } catch (error) {
      console.error('Error liking video:', error);
    }
  });

  socket.on('dislikeVideo', async (userId) => {
    try {
      // Find the like document for the user
      let likeDocument = await LikeModel.findOne({ name: userId });

      // If 'likeDocument' is null or undefined, create a new document with initial values
      if (!likeDocument) {
        likeDocument = new LikeModel({ name: userId, likes: 0, dislikes: 1 });
      } else {
        // Increment the 'dislikes' count
        likeDocument.dislikes += 1;
      }

      // Save the updated like document back to the database
      await likeDocument.save();

      // Emit the updated like counts to all connected clients
      io.emit('likeCountsUpdated', { likes: likeDocument.likes, dislikes: likeDocument.dislikes });
    } catch (error) {
      console.error('Error disliking video:', error);
    }
  });

  socket.on('undoLikeVideo', async (userId) => {
    try {
      // Find the like document for the user
      const likeDocument = await LikeModel.findOne({ name: userId });

      // If 'likeDocument' exists and has more than 0 likes, decrement the 'likes' count
      if (likeDocument && likeDocument.likes > 0) {
        likeDocument.likes -= 1;

        // Save the updated like document back to the database
        await likeDocument.save();

        // Emit the updated like counts to all connected clients
        io.emit('likeCountsUpdated', { likes: likeDocument.likes, dislikes: likeDocument.dislikes });
      }
    } catch (error) {
      console.error('Error undoing like video:', error);
    }
  });

  socket.on('undoDislikeVideo', async (userId) => {
    try {
      // Find the like document for the user
      const likeDocument = await LikeModel.findOne({ name: userId });

      // If 'likeDocument' exists and has more than 0 dislikes, decrement the 'dislikes' count
      if (likeDocument && likeDocument.dislikes > 0) {
        likeDocument.dislikes -= 1;

        // Save the updated like document back to the database
        await likeDocument.save();

        // Emit the updated like counts to all connected clients
        io.emit('likeCountsUpdated', { likes: likeDocument.likes, dislikes: likeDocument.dislikes });
      }
    } catch (error) {
      console.error('Error undoing dislike video:', error);
    }
  });


  // console.log(socket.id, ' has entered the building');
  // const ip = socket.request.connection.remoteAddress;

  // console.log(`Client connected with IP address: ${ip}`);
  socket.on('disconnect', () => {
    // console.log(socket.id, ' has left the building');
    if (liveViewers > 0) {
      liveViewers--;
    }
    io.emit('LiveViewers', liveViewers);
  });
  socket.on('join room', (room) => {
    // console.log(socket.id, ' joined room: ', room);
    socket.join(room);
    ChatMessage.find({room: room})
      .sort({createdAt: -1})
      .limit(maxSavedMessages)
      .then((messages) => {
        messages.forEach((message) => {
          socket.emit('chat message', {
            countryid: message.countryid,
            username: message.username,
            message: message.message,
            room: message.room,
          });
        });
      })
      .catch((err) => console.error('Error retrieving chat messages from MongoDB', err));
    // Count the number of users in the room
    const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;

    // Emit the user count to all users in the room
    io.to(room).emit('user count', roomSize);
  });
  socket.on('leave room', (room) => {
    // console.log(socket.id, ' left room: ', room);
    socket.leave(room);
    const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;

    // Emit the user count to all users in the room
    io.to(room).emit('user count', roomSize);
  });
  socket.on('chat message', async (data) => {
    try {
      // console.log(data.username, ' sent message: ', data.message);
      // Find the user with the matching username
      const user = await User.findOne({name: data.username});

      // Check if the user was found and the userId matches the user._id property
      if (user && user._id.toString() === data.user_id) {
        // Save chat message to MongoDB
        const chatMessage = new ChatMessage({
          countryid: data.countryid,
          username: data.username,
          message: data.message,
          room: data.room,
        });
        await chatMessage.save();
        console.log('Mongodb saved message: ' + data.message);
        io.to(data.room).emit('chat message', {
          countryid: data.countryid,
          username: data.username,
          message: data.message,
          room: data.room,
        });
      } else {
        console.log('User not found or userId does not match');
      }
    } catch (error) {
      console.error('Error saving chat message to MongoDB', error);
    }
    // Delete chat messages older than 48 hours from MongoDB

    const cutoffDate = new Date(Date.now() - 48 * 60 * 60 * 1000);
    ChatMessage.deleteMany({createdAt: {$lt: cutoffDate}})
      .then(() => {
        // Do nothing
        // console.log('Chat messages older than 48 hours deleted from MongoDB')
      })
      .catch((err) => console.error('Error deleting chat messages from MongoDB', err));
  });


  socket.on('typing', ({username, room}) => {
    // console.log('typing: ', username, room);
    socket.broadcast.to(room).emit("typing", {username});
    // console.log('typing event emitted successfully');
  });
  socket.on('stop typing', ({username, room}) => {
    // console.log('stop typing: ', username, room);
    socket.broadcast.to(room).emit("stop typing", {username});
  });
  socket.on('get messages', (room) => {
    // console.log('get messages for room: ', room);
    ChatMessage.find({room: room})
      .sort({createdAt: -1})
      .limit(1)
      .then((messages) => {
        if (messages.length > 0) {
          const latestMessage = messages[0];
          // console.log('latest message: ', latestMessage);
          socket.broadcast.to(room).emit("typing", {username});
          socket.emit('chat message', {
            countryid: latestMessage.countryid,
            username: latestMessage.username,
            message: latestMessage.message,
            room: latestMessage.room,
            userId: latestMessage.userId,
          });
        }
      })
      .catch((err) => console.error('Error retrieving chat messages from MongoDB', err));
  });
});



http.listen(connectPort, () => {
  console.log('Server started on port ' + connectPort);
});
