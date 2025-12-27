import { io } from 'socket.io-client';

// Socket.io connection
let socket = null;

// Initialize socket connection
export const initializeSocket = () => {
  if (!socket) {
    // socket = io('http://localhost:5001', {
    //   transports: ['websocket', 'polling'],
    //   cors: {
    //     origin: 'http://localhost:5173',
    //     credentials: true
    //   }
    // });


    socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket', 'polling'],
  withCredentials: true
});



    socket.on('connect', () => {
      console.log('🔌 Connected to server:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected from server');
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
    });
  }
  return socket;
};

// Get current socket instance
export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

// Join a chat room
export const joinRoom = (roomId, userName) => {
  const socketInstance = getSocket();
  socketInstance.emit('joinRoom', { roomId, userName });
  console.log(`🏠 Joining room: ${roomId} as ${userName}`);
};

// Send a message
export const sendMessage = (roomId, message, senderName, senderId) => {
  const socketInstance = getSocket();
  socketInstance.emit('sendMessage', { roomId, message, senderName, senderId });
  console.log(`💬 Sending message to room ${roomId}: ${message}`);
};

// Leave a room
export const leaveRoom = (roomId, userName) => {
  const socketInstance = getSocket();
  socketInstance.emit('leaveRoom', { roomId, userName });
  console.log(`🚪 Leaving room: ${roomId}`);
};

// Listen for messages
export const onMessage = (callback) => {
  const socketInstance = getSocket();
  socketInstance.on('receiveMessage', callback);
};

// Listen for user joined
export const onUserJoined = (callback) => {
  const socketInstance = getSocket();
  socketInstance.on('userJoined', callback);
};

// Listen for user left
export const onUserLeft = (callback) => {
  const socketInstance = getSocket();
  socketInstance.on('userLeft', callback);
};

// Remove all listeners
export const removeAllListeners = () => {
  const socketInstance = getSocket();
  socketInstance.removeAllListeners();
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('🔌 Socket disconnected');
  }
};

// Generate room ID based on carId, buyerId, sellerId
export const generateRoomId = (carId, buyerId, sellerId) => {
  // DO NOT sort IDs - each buyer should have separate chat with seller
  // Format: carId_buyerId_sellerId ensures unique room per buyer-seller pair
  return `${carId}_${buyerId}_${sellerId}`;
};