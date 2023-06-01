const express = require('express');
const path = require('path');
const http = require("http");

const { Server } = require("socket.io");
//Adding CORS from socket.io
const cors = require('cors');

// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');


const app = express();

//Custom Middleware
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  },
});

// Listening to events
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  })
  //Back end is listening to an event in the front end (send_message)
  socket.on("send_message", (data) => {
    //recieve the messages that were emitted by other people
    //Then emits this data to the front end (receive_messages) function
    socket.broadcast.emit("receive_message", data);
    console.log(data);
  });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING")
});

