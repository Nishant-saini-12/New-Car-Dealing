import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    console.log('📩 Received message:', message);
    console.log('🔑 API Key exists:', !!process.env.GEMINI_API_KEY);

    if (!message) {
      return res.status(400).json({ 
        success: false,
        error: 'Message is required' 
      });
    }

    // Check if API key is set
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not configured!');
      return res.status(500).json({ 
        success: false,
        error: 'Chatbot configuration incomplete. Please add GEMINI_API_KEY to .env file.',
        details: 'Get your API key from: https://aistudio.google.com/app/apikey'
      });
    }

    // Load cars data
    const carsPath = path.join(__dirname, '../data/cars.json');
    console.log('📁 Cars file path:', carsPath);
    
    if (!fs.existsSync(carsPath)) {
      console.error('❌ cars.json not found at:', carsPath);
      return res.status(500).json({
        success: false,
        error: 'Car database not found',
        details: 'cars.json file is missing'
      });
    }

    const carsData = JSON.parse(fs.readFileSync(carsPath, 'utf8'));
    console.log('✅ Loaded', carsData.length, 'cars');

    // Create prompt for AI
    const prompt = `You are a helpful car sales assistant for an Indian car dealership. You have access to the following car inventory:

${JSON.stringify(carsData, null, 2)}

User Question: ${message}

Instructions:
- Answer ONLY based on the car data provided above
- Be friendly and helpful
- If the user asks about a car that's not in the inventory, say: "Is car ki info available nahi hai."
- If the user asks about features not mentioned in the data, say: "Is car ki detailed info available nahi hai."
- Provide prices in Indian Rupees format
- You can compare cars, suggest cars based on budget, fuel type, transmission, etc.
- Keep responses concise and helpful
- Use a mix of English and Hindi (Hinglish) to sound natural

Answer:`;

    // Initialize Gemini AI with the API key
    console.log('🤖 Initializing Gemini AI...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Use the correct model name for AI Studio
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash'
    });

    console.log('📤 Sending request to Gemini API...');
    
    // Generate content using the NEW AI Studio format
    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text();
    
    console.log('✅ AI Response received:', aiResponse.substring(0, 100) + '...');

    res.json({ 
      success: true,
      response: aiResponse 
    });

  } catch (error) {
    console.error('\n🔥🔥🔥 CHATBOT ERROR DETAILS 🔥🔥🔥');
    console.error('Error Message:', error.message);
    console.error('Error Status:', error.status);
    console.error('Error Details:', error.statusText);
    
    // Detailed error handling
    let errorMessage = 'Chatbot me kuch problem hai. Please try again.';
    let errorDetails = error.message;

    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key not valid')) {
      console.error('🔑 INVALID API KEY!');
      errorMessage = 'Invalid API key. Please check your GEMINI_API_KEY in .env file.';
      errorDetails = 'Get a new API key from: https://aistudio.google.com/app/apikey';
    } else if (error.message?.includes('404') || error.message?.includes('not found')) {
      console.error('🚫 MODEL NOT FOUND!');
      errorMessage = 'Model not found. Using incorrect API endpoint.';
      errorDetails = 'Make sure you are using the correct model name: gemini-1.5-flash';
    } else if (error.message?.includes('PERMISSION_DENIED')) {
      console.error('🚫 PERMISSION DENIED!');
      errorMessage = 'Permission denied. API key may not have access to Gemini API.';
      errorDetails = 'Enable Gemini API for your API key at: https://aistudio.google.com';
    } else if (error.message?.includes('RESOURCE_EXHAUSTED') || error.message?.includes('quota')) {
      console.error('⏰ RATE LIMIT EXCEEDED!');
      errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
      errorDetails = 'You have hit the free tier limit.';
    } else if (error.code === 'ENOENT') {
      console.error('📁 FILE NOT FOUND!');
      errorMessage = 'Car database file not found.';
      errorDetails = 'cars.json is missing from backend/data/';
    }
    
    console.error('🔥🔥🔥 END ERROR DETAILS 🔥🔥🔥\n');
    
    res.status(500).json({ 
      success: false,
      error: errorMessage,
      details: errorDetails
    });
  }
};
