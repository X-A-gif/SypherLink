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

