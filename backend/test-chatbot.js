import axios from 'axios';

const API_URL = 'http://localhost:5001/api/chat';

const testQueries = [
  'Show me all SUVs',
  'Which car has the best mileage?',
  'Cars under 10 lakhs',
  'Tell me about Honda City',
  'Compare Hyundai Creta and Kia Seltos',
  'Show me automatic transmission cars',
  'Tell me about BMW X5'  // This should return "not available"
];

async function testChatbot() {
  console.log('🤖 Testing AI Car Chatbot...\n');
  console.log('=' .repeat(60));

  for (let i = 0; i < testQueries.length; i++) {
    const query = testQueries[i];
    console.log(`\n📝 Test ${i + 1}: "${query}"`);
    console.log('-'.repeat(60));

    try {
      const response = await axios.post(API_URL, {
        message: query
      });

      console.log('✅ Response:');
      console.log(response.data.response);
    } catch (error) {
      console.error('❌ Error:', error.response?.data || error.message);
    }

    console.log('='.repeat(60));
    
    // Wait 2 seconds between requests to avoid rate limiting
    if (i < testQueries.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n✨ Testing complete!');
}

// Run tests
testChatbot();
