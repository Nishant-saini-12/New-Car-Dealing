import { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  initializeSocket, 
  joinRoom, 
  sendMessage, 
  leaveRoom, 
  onMessage, 
  onUserJoined, 
  onUserLeft,
  removeAllListeners,
  generateRoomId 
} from '../services/socket';

export default function Chat({ car, onClose, onNavigate }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!user || !car) return;

    // Generate unique room ID
    const generatedRoomId = generateRoomId(car._id, user._id, car.sellerId || car.userId);
    setRoomId(generatedRoomId);

    // Initialize socket connection
    initializeSocket();
    setIsConnected(true);

    // Listen for incoming messages
    onMessage((messageData) => {
      console.log('📨 Received message:', messageData);
      setMessages(prev => [...prev, messageData]);
    });

    // Listen for user joined notifications
    onUserJoined((notification) => {
      console.log('👤 User joined:', notification);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        message: notification.message,
        senderName: 'System',
        senderId: 'system',
        timestamp: notification.timestamp,
        isSystem: true
      }]);
    });

    // Listen for user left notifications
    onUserLeft((notification) => {
      console.log('👋 User left:', notification);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        message: notification.message,
        senderName: 'System',
        senderId: 'system',
        timestamp: notification.timestamp,
        isSystem: true
      }]);
    });

    // Cleanup on unmount
    return () => {
      removeAllListeners();
      setIsConnected(false);
    };
  }, [user, car]);

  // Separate effect for room management - CRITICAL FOR ISOLATION
  useEffect(() => {
    if (!roomId || !user) return;

    console.log(`🏠 Joining room: ${roomId} as ${user.name}`);
    
    // Clear messages when switching rooms - PREVENTS MESSAGE MIXING
    setMessages([]);
    
    // Join the new room
    joinRoom(roomId, user.name);

    // MANDATORY: Leave room on cleanup or room change
    return () => {
      console.log(`🚪 Leaving room: ${roomId} as ${user.name}`);
      leaveRoom(roomId, user.name);
    };
  }, [roomId, user]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !isConnected || !roomId) return;

    // Send message via socket
    sendMessage(roomId, newMessage.trim(), user.name, user._id);
    
    // Clear input
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user || !car) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Please login to start chatting</p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Chat about {car.brand} {car.model}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isConnected ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Connecting...
                  </span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Car Info Bar */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
          <div className="flex items-center gap-4">
            <img
              src={car.image || '/placeholder-car.jpg'}
              alt={`${car.brand} ${car.model}`}
              className="w-16 h-12 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {car.brand} {car.model} ({car.year})
              </h3>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ${car.price?.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onNavigate('car-details', car._id);
              }}
              className="ml-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Car
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Start the conversation about this car!
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.senderId === user._id ? 'items-end' : 'items-start'
                } ${msg.isSystem ? 'items-center' : ''}`}
              >
                {msg.isSystem ? (
                  <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-600 dark:text-gray-400">
                    {msg.text || msg.message}
                  </div>
                ) : (
                  <>
                    {/* Sender Name ABOVE Message Bubble - MANDATORY UX FIX */}
                    <div className={`text-xs font-medium mb-1 px-2 ${
                      msg.senderId === user._id 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {msg.senderId === user._id ? `${msg.senderName} (You)` : msg.senderName}
                    </div>
                    
                    {/* Message Bubble */}
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        msg.senderId === user._id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.text || msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.senderId === user._id
                            ? 'text-blue-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {formatTime(msg.createdAt || msg.timestamp)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              disabled={!isConnected}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || !isConnected}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
          {!isConnected && (
            <p className="text-xs text-red-500 mt-2">
              Connecting to chat server...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}