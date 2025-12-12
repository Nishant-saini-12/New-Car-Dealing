import express from 'express';
import { chat } from '../controllers/chatController.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// POST /api/chat
router.post('/chat', chat);

// Test endpoint - no AI, just return cars data
router.post('/chat-test', (req, res) => {
  try {
    console.log('🧪 Test endpoint called');
    const { message } = req.body;
    
    // Load cars data
    const carsPath = path.join(__dirname, '../data/cars.json');
    const carsData = JSON.parse(fs.readFileSync(carsPath, 'utf8'));
    
    res.json({
      success: true,
      message: 'Test endpoint working!',
      receivedMessage: message,
      carsCount: carsData.length,
      response: `Test response: I received "${message}". We have ${carsData.length} cars in database.`
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
