import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Environment Variables Check\n');
console.log('=' .repeat(50));

console.log('\n📊 All Environment Variables:');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Not set');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Not set');

console.log('\n🔑 GEMINI_API_KEY Check:');
console.log('Exists:', !!process.env.GEMINI_API_KEY);
console.log('Value:', process.env.GEMINI_API_KEY);
console.log('Is placeholder:', process.env.GEMINI_API_KEY === 'your_gemini_api_key_here');

if (!process.env.GEMINI_API_KEY) {
  console.log('\n❌ GEMINI_API_KEY is not set!');
  console.log('Please add it to backend/.env file');
} else if (process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
  console.log('\n⚠️  GEMINI_API_KEY is using placeholder value!');
  console.log('Please replace it with your actual API key');
  console.log('\nGet your API key from:');
  console.log('https://makersuite.google.com/app/apikey');
} else {
  console.log('\n✅ GEMINI_API_KEY is configured!');
  console.log('First 10 chars:', process.env.GEMINI_API_KEY.substring(0, 10) + '...');
}

console.log('\n' + '='.repeat(50));
