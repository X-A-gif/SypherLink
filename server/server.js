const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

const { Server } = require('socket.io');

const server = http.createServer(app);
app.use(cors());


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  },
});

//Listening for for an event with the name connection and calling a callback function
io.on('connection', (socket) => {
  console.log('User Connected: ', socket.id);

  //Listening for when someone wants to join a room
  // This takes the room data as data and allows the user to join
  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  //Listening for when the user wants to disconnect
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });

  //Listening event for sending a message
  socket.on('send_message', (data) => {
   // When someone types a message they emit the data here and the message is received
   socket.to(data.room).emit('receive_message', data);
  });
});


server.listen(3001, () => {
  console.log('SERVER RUNNING');
})