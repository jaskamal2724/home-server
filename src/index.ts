import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

let roomState = {
  bedroom: {
    light1: false,
    light2: false,
  },
  kitchen: {
    light1: false,
    light2: false,
  },
};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the current state to the newly connected client
  socket.emit('initialState', roomState);

  socket.on('roomUpdate', (updatedState) => {
    console.log('Received room update:', updatedState);
    // Update the server's state
    roomState = updatedState;
    
    // Broadcast the updated state to all connected clients
    io.emit('roomUpdate', roomState);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

