// const express = require('express');
// const path = require('path');
// const http = require("http");

// const { Server } = require("socket.io");
// //Adding CORS from socket.io
// const cors = require('cors');

// // const { typeDefs, resolvers } = require('./schemas');
// // const db = require('./config/connection');


// const app = express();

// //Custom Middleware
// app.use(express.static(path.join(__dirname, '../client/dist')));
// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ["GET", "POST"],
//   },
// });

// // Listening to events
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   })
//   //Back end is listening to an event in the front end (send_message)
//   socket.on("send_message", (data) => {
//     //recieve the messages that were emitted by other people
//     //Then emits this data to the front end (receive_messages) function
//     socket.broadcast.emit("receive_message", data);
//     console.log(data);
//   });
// });


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

// server.listen(3001, () => {
//   console.log("SERVER IS RUNNING")
// });

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

  //Listening event for sending a message
  socket.on('send_message', (data) => {
    // When someone types a message they emit the data here and the message is received
    socket.to(data.room).emit('receive_message', data);
  });

  //Listening for when the user wants to disconnect
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });

});


server.listen(3001, () => {
  console.log('SERVER RUNNING');
})