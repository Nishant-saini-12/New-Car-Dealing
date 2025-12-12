import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

console.log('🧪 Testing Chat Endpoints\n');
console.log('='.repeat(60));

async function testEndpoints() {
  
  // Test 1: Health check
  console.log('\n📍 Test 1: Health Check');
  console.log('-'.repeat(60));
  try {
    const response = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check passed');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    console.log('⚠️  Make sure backend is running on port 5001');
    return;
  }

  // Test 2: Test endpoint (no AI)
  console.log('\n📍 Test 2: Chat Test Endpoint (No AI)');
  console.log('-'.repeat(60));
  try {
    const response = await axios.post(`${API_URL}/chat-test`, {
      message: 'Test message'
    });
    console.log('✅ Test endpoint passed');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('❌ Test endpoint failed');
    console.error('Error:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
  }

  // Test 3: Actual chat endpoint (with AI)
  console.log('\n📍 Test 3: Actual Chat Endpoint (With AI)');
  console.log('-'.repeat(60));
  try {
    console.log('Sending request...');
    const response = await axios.post(`${API_URL}/chat`, {
      message: 'Show me all SUVs'
    }, {
      timeout: 30000 // 30 second timeout
    });
    console.log('✅ Chat endpoint passed');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('❌ Chat endpoint failed');
    
    if (error.response) {
      // Server responded with error
      console.error('Status:', error.response.status);
      console.error('Error Data:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('No response received');
      console.error('Request:', error.request);
    } else {
      // Error in request setup
      console.error('Error:', error.message);
    }
    
    console.log('\n🔍 Check backend terminal for detailed error logs');
  }

  console.log('\n' + '='.repeat(60));
  console.log('✨ Testing complete!\n');
}

testEndpoints();
