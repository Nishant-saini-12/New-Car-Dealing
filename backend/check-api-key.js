import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function checkAPIKey() {
  console.log('🔍 Checking Google AI Studio API Key\n');
  console.log('='.repeat(70));

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log('\n❌ No API key found in .env file!');
    console.log('\n📝 Add this to backend/.env:');
    console.log('   GEMINI_API_KEY=your_api_key_here');
    console.log('\n🔑 Get your API key from:');
    console.log('   https://aistudio.google.com/app/apikey');
    return;
  }

  console.log('\n✅ API Key found:', apiKey.substring(0, 20) + '...');
  console.log('📏 Key length:', apiKey.length, 'characters');
  console.log('🔤 Key format:', apiKey.startsWith('AIza') ? '✅ Valid format' : '❌ Invalid format');

  console.log('\n🔄 Testing API key with different models...\n');

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const modelsToTest = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest'
  ];

  for (const modelName of modelsToTest) {
    try {
      console.log(`\n📋 Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say "OK" in one word.');
      const response = result.response.text();
      console.log(`   ✅ SUCCESS! Response: ${response.trim()}`);
      console.log(`   ✨ This model works with your API key!`);
      break; // If one works, we're good
    } catch (error) {
      console.log(`   ❌ FAILED: ${error.message.substring(0, 100)}...`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n💡 IMPORTANT NOTES:');
  console.log('   1. The SDK internally uses v1beta endpoint - this is NORMAL');
  console.log('   2. Your API key must be from: https://aistudio.google.com/app/apikey');
  console.log('   3. NOT from Google Cloud Console or Vertex AI');
  console.log('   4. If all models fail, create a NEW API key');
  console.log('\n🔗 Create new API key: https://aistudio.google.com/app/apikey');
  console.log('='.repeat(70));
}

checkAPIKey();
