import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function listModels() {
  console.log('🔍 Listing Available Gemini Models\n');
  console.log('='.repeat(60));

  if (!process.env.GEMINI_API_KEY) {
    console.log('\n❌ GEMINI_API_KEY not found!');
    return;
  }

  console.log('\n✅ API Key found:', process.env.GEMINI_API_KEY.substring(0, 10) + '...');

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try different model names
    const modelsToTry = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
      'gemini-1.5-pro-latest',
      'models/gemini-pro',
      'models/gemini-1.5-flash'
    ];

    console.log('\n🧪 Testing different model names:\n');

    for (const modelName of modelsToTry) {
      try {
        console.log(`Testing: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say "Hello"');
        const response = result.response;
        const text = response.text();
        console.log(`✅ ${modelName} - WORKS! Response: ${text.substring(0, 50)}`);
        break; // Stop after first working model
      } catch (error) {
        console.log(`❌ ${modelName} - Failed: ${error.message.substring(0, 80)}...`);
      }
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }

  console.log('\n' + '='.repeat(60));
}

listModels();
