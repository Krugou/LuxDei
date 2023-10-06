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

import passport from './utils/pass.js';

const connectPort = 3002;
const app = express();
const http = createServer(app);
const io = new Server(http);
const lastMessages = {};
const maxSavedMessages = 10;
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
    console.log('NewLiveViewer', data);
    liveViewers++;
    totalViewers++;
    io.emit('LiveViewers', liveViewers);
    io.emit('TotalViewers', totalViewers);
  });


  console.log(socket.id, ' has entered the building');
  // const ip = socket.request.connection.remoteAddress;

  // console.log(`Client connected with IP address: ${ip}`);
  socket.on('disconnect', () => {
    console.log(socket.id, ' has left the building');
    if (liveViewers > 0) {
      liveViewers--;
    }
    io.emit('LiveViewers', liveViewers);
  });
  socket.on('join room', (room) => {
    console.log(socket.id, ' joined room: ', room);
    socket.join(room);
    if (lastMessages) {
      for (const room in lastMessages) {
        if (lastMessages.hasOwnProperty(room)) {
          lastMessages[room].forEach((message) => {
            socket.emit('chat message', {
              message: message.message,
              username: message.username,
              room: message.room,
              countryid: message.countryid,
            });
          });
        }
      }
    }
  });
  socket.on('leave room', (room) => {
    console.log(socket.id, ' left room: ', room);
    socket.leave(room);
  });
  socket.on('chat message', (data) => {
    console.log('chat message received:', data);
    if (!lastMessages[data.room]) {
      lastMessages[data.room] = [];
    }
    if (lastMessages[data.room].length > maxSavedMessages) {
      lastMessages[data.room].shift();
    }
    lastMessages[data.room].push(data);

    console.log('data.room: ', data.room);
    console.log('data.countryid: ', data.countryid);
    io.to(data.room).emit('chat message', {
      countryid: data.countryid,
      username: data.username,
      message: data.message,
      room: data.room,
    });
  });
  socket.on('typing', ({username, room}) => {
    console.log('typing: ', username, room);
    socket.broadcast.to(room).emit("typing", {username});
    console.log('typing event emitted successfully');
  });
  socket.on('stop typing', ({username, room}) => {
    console.log('stop typing: ', username, room);
    socket.broadcast.to(room).emit("stop typing", {username});
  });
  socket.on('get messages', (room) => {
    console.log('get messages for room: ', room);
    if (lastMessages[room]) {
      const latestMessage = lastMessages[room][lastMessages[room].length - 1];
      console.log('latest message: ', latestMessage);
      socket.broadcast.to(room).emit("typing", {username});
      socket.emit('chat message', {
        countryid: latestMessage.countryid,
        username: latestMessage.username,
        message: latestMessage.message,
        room: latestMessage.room,
      });
    }
  });
}
);
http.listen(connectPort, () => {
  console.log('Server started on port ' + connectPort);
});
