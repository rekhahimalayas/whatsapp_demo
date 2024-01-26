const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:3000');

socket.on('open', () => {
  console.log('Connected to server');

  // Send a message to the server
  socket.send('Hello from Client 1!');
});

socket.on('message', (message) => {
  console.log(`Received message: ${message}`);
});

