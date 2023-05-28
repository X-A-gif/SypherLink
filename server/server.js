const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require('path');

// Set the MIME type for JavaScript files to "application/javascript"
express.static.mime.types['js'] = 'application/javascript';

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, '..', 'client')));

// Route for serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
