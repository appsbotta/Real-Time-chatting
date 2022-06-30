const randomColor = require('randomcolor');
const Server = require('socket.io');
const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
app.use(express.static(path.join(__dirname)));

const server = http.createServer(app);
const io = Server(server);
var name;
var color;

io.on('connection', (socket) => {
  console.log('new user connected');
  
  socket.on('joining msg', (username) => {
  	name = username;
  	io.emit('chat message', `---${name} joined the chat---`);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', `---${name} left the chat---`);
    
  });
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);         //sending message to all except the sender
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
