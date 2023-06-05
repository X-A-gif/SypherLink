const express = require('express');
const path = require('path');
const http = require("http");

//---------------------------------------------------------------
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
//---------------------------------------------------------------

const { Server } = require("socket.io");
//Adding CORS from socket.io
const cors = require('cors');
//-------------------------------------------------------------------
 const { typeDefs, resolvers } = require('./schemas');
 const db = require('./config/connection');
//-------------------------------------------------------------------

//-------------------------------------------------------------------
const PORT = process.env.PORT || 3001;
//const app = express();
const server2 = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
//-------------------------------------------------------------------


const app = express();

//Custom Middleware
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors());

//--------------------------------------------------------------
app.use(express.json());
//--------------------------------------------------------------

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

//----------------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
//----------------------------------------------------------------------


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });


//--------------------------------------------------------------
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server2.start();
  server2.applyMiddleware({ app });
  
  
  db.once('open', () => {
    server.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server2.graphqlPath}`);
    })
  })
  };
 
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
//--------------------------------------------------------------

