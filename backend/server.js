

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import emiRoutes from './routes/emiRoutes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Create HTTP server
const server = createServer(app);

// Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // Vite ports
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded avatars)
app.use('/uploads', express.static('uploads'));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authRoutes);
app.use('/api/users', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', chatRoutes);
app.use('/api', emiRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`👤 User connected: ${socket.id}`);

  // Handle joining a chat room
  socket.on('joinRoom', ({ roomId, userName }) => {
    socket.join(roomId);
    console.log(`🏠 ${userName} joined room: ${roomId}`);
    
    // Notify others in the room that someone joined
    socket.to(roomId).emit('userJoined', {
      message: `${userName} joined the chat`,
      timestamp: new Date().toISOString()
    });
  });

  // Handle sending messages
  socket.on('sendMessage', ({ roomId, message, senderName, senderId }) => {
    const messageData = {
      id: Date.now().toString(),
      text: message,  // Changed from 'message' to 'text' as per requirement
      senderId,
      senderName,
      createdAt: new Date().toISOString()  // Changed from 'timestamp' to 'createdAt'
    };

    console.log(`💬 Message in room ${roomId} from ${senderName}: ${message}`);
    
    // Send message to all users in the room (including sender)
    io.to(roomId).emit('receiveMessage', messageData);
  });

  // Handle leaving a room
  socket.on('leaveRoom', ({ roomId, userName }) => {
    socket.leave(roomId);
    console.log(`🚪 ${userName} left room: ${roomId}`);
    
    // Notify others in the room that someone left
    socket.to(roomId).emit('userLeft', {
      message: `${userName} left the chat`,
      timestamp: new Date().toISOString()
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`👋 User disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`💬 Socket.io enabled for real-time chat`);
});
