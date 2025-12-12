import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function testGeminiAPI() {
  console.log('🧪 Testing Gemini API Connection (Google AI Studio)\n');
  console.log('='.repeat(70));

  // Check API key
  if (!process.env.GEMINI_API_KEY) {
    console.log('\n❌ GEMINI_API_KEY not found in .env file!');
    console.log('\n📝 Please add it to backend/.env:');
    console.log('   GEMINI_API_KEY=your_actual_api_key_here');
    console.log('\n🔑 Get your API key from:');
    console.log('   https://aistudio.google.com/app/apikey');
    console.log('\n💡 Make sure to create a NEW API key from Google AI Studio');
    console.log('   (NOT from Google Cloud Console or Vertex AI)');
    return;
  }

  console.log('\n✅ API Key found:', process.env.GEMINI_API_KEY.substring(0, 15) + '...');
  console.log('🔄 Initializing Gemini AI with Google AI Studio SDK...');

  try {
    // Initialize with the NEW Google AI Studio SDK
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Use gemini-1.5-flash model (supported by AI Studio)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash'
    });

    console.log('✅ Gemini AI initialized successfully');
    console.log('📋 Model: gemini-1.5-flash');
    console.log('🌐 Endpoint: https://generativelanguage.googleapis.com/v1/models');
    console.log('\n📤 Sending test prompt...');

    const prompt = 'Say "Hello! I am working perfectly!" in one short sentence.';
    
    // Generate content using the correct AI Studio format
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log('✅ Response received successfully!');
    console.log('\n📥 AI Response:');
    console.log('-'.repeat(70));
    console.log(text);
    console.log('-'.repeat(70));

    console.log('\n🎉 SUCCESS! Gemini API is working perfectly!');
    console.log('\n✨ Your chatbot is ready to use!');
    console.log('\n📋 Next steps:');
    console.log('   1. Make sure backend is running: npm start');
    console.log('   2. Open frontend: http://localhost:5173');
    console.log('   3. Click the robot icon (💬) in bottom-right corner');
    console.log('   4. Start chatting about cars!');
    console.log('\n💡 Try asking:');
    console.log('   - "Show me cars under 10 lakhs"');
    console.log('   - "Which cars have automatic transmission?"');
    console.log('   - "Compare Honda City and Maruti Swift"');

  } catch (error) {
    console.log('\n❌ ERROR testing Gemini API:');
    console.log('-'.repeat(70));
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key not valid')) {
      console.log('\n🔑 Your API key is INVALID!');
      console.log('\n� Solutiones:');
      console.log('   1. Get a NEW API key from: https://aistudio.google.com/app/apikey');
      console.log('   2. Make sure you copy the ENTIRE key');
      console.log('   3. Update backend/.env with the new key');
      console.log('   4. Restart this test: node test-gemini-api.js');
    } else if (error.message?.includes('404') || error.message?.includes('not found')) {
      console.log('\n🚫 Model or endpoint NOT FOUND (404 error)!');
      console.log('\n📝 This usually means:');
      console.log('   1. Using wrong SDK version');
      console.log('   2. Using wrong model name');
      console.log('   3. API key is for Vertex AI (not AI Studio)');
      console.log('\n✅ Solution:');
      console.log('   1. Create a NEW API key from: https://aistudio.google.com/app/apikey');
      console.log('   2. Make sure it says "API Key" (not "Service Account")');
      console.log('   3. Update your .env file');
    } else if (error.message?.includes('PERMISSION_DENIED')) {
      console.log('\n🚫 Permission denied!');
      console.log('\n� YSolutions:');
      console.log('   1. Make sure your API key is active');
      console.log('   2. Check if Gemini API is enabled for your key');
      console.log('   3. Try creating a new API key from: https://aistudio.google.com/app/apikey');
    } else if (error.message?.includes('RESOURCE_EXHAUSTED') || error.message?.includes('quota')) {
      console.log('\n⏰ Rate limit exceeded!');
      console.log('\n📝 Solutions:');
      console.log('   1. Wait a few minutes and try again');
      console.log('   2. Check your quota at: https://aistudio.google.com');
      console.log('   3. Free tier: 15 requests per minute');
    } else {
      console.log('\n🔍 Unexpected error. Full details:');
      console.log(error);
    }
    
    console.log('\n💡 Need help? Check:');
    console.log('   - API Key: https://aistudio.google.com/app/apikey');
    console.log('   - Documentation: https://ai.google.dev/gemini-api/docs');
  }

  console.log('\n' + '='.repeat(70));
}

testGeminiAPI();
