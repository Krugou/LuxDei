'use strict';
/* simple chat app */

import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
const app = express();
const http = createServer(app);
const io = new Server(http);
const lastMessages = {};

// server's adjustable settings
const port = 3001;
const maxSavedMessages = 20;
const startTime = new Date();
console.log(' Backend chat/frontend server start time: ' + startTime.toLocaleString());
app.use(express.static('jakfilms'));
app.get('*', (req, res) => {
  res.sendFile('index.html', {root: 'jakfilms'});
});
io.on('connection', (socket) => {
    console.log(socket.id, ' has entered the building');
    const ip = socket.request.connection.remoteAddress;
    // console.log(`Client connected with IP address: ${ip}`);

    socket.on('disconnect', () => {
      console.log(socket.id, ' has left the building');
    });
    socket.on('join room', (room) => {
      // console.log(socket.id, ' joined room: ', room);
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
      // console.log(socket.id, ' left room: ', room);
      socket.leave(room);
    });
    socket.on('chat message', (data) => {
      // console.log('chat message received:', data);
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
        username: data.username ,
        message: data.message,
        room: data.room,
      });
    });
    const typingUsers = {};

    const isTyping = username => {
      const now = Date.now();
      if (!typingUsers[username] || now - typingUsers[username] > 60000) {
        typingUsers[username] = now;
        return true;
      }
      return false;
    };

    socket.on('typing', ({username, room}) => {
      console.log('typing: ', username, room);

      if (isTyping(username)) {
        socket.broadcast.to(room).emit("typing", {username});
        console.log('typing event emitted successfully');
      }
    });

    socket.on('stop typing', ({username, room}) => {
      console.log('stop typing: ', username, room);

      if (isTyping(username)) {
        socket.broadcast.to(room).emit("stop typing", {username});
        console.log('stop typing event emitted successfully');
      }
    });

    setInterval(() => {
      const now = Date.now();
      for (const [username, timestamp] of Object.entries(typingUsers)) {
        if (now - timestamp > 60000) {
          delete typingUsers[username];
        }
      }
    }, 60000);
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


http.listen(port, () => {
  console.log(
    'Jakfilms backend chat/frontend server Started at: http://localhost:' +
    port +
    '/index.html '
  );
});
