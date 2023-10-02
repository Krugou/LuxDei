'use strict';
/* simple chat app */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const http = createServer(app);
const io = new Server(http);
const lastMessages = {};

// server's adjustable settings
const port = 3001;
const maxSavedMessages = 20;

app.use(express.static('jakfilms'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'jakfilms', 'index.html'));
});
io.on('connection', (socket) => {
  console.log(socket.id, ' has entered the building');
  const ip = socket.request.connection.remoteAddress;
  console.log(`Client connected with IP address: ${ip}`);

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
    console.log(
      `message: ${data.message}, username: ${data.username}, room: ${data.room}`
    );
    io.to(data.room).emit('chat message', {
      message: data.message,
      username: data.username,
      room: data.room,
    });
  });
  socket.on('get messages', (room) => {
    console.log('get messages for room: ', room);
    if (lastMessages[room]) {
      lastMessages[room].forEach((message) => {
        console.log('message: ', message);
        socket.emit('chat message', {
          username: message.username,
          message: message.message,
        });
      });
    }
  });
});

http.listen(port, () => {
  console.log(
    'Jakfilms backend server Started at: http://localhost:' +
      port +
      '/index.html '
  );
});
