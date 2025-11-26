import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

const API_URL = 'http://localhost:5001/api';

// Check environment configuration
function checkConfiguration() {
  console.log('🔍 Checking Configuration...\n');
  
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  console.log('EMAIL_USER:', emailUser || '❌ NOT SET');
  console.log('EMAIL_PASS:', emailPass ? '✅ SET (hidden)' : '❌ NOT SET');
  
  if (!emailUser || !emailPass) {
    console.log('\n❌ Email credentials not configured!');
    console.log('\n📝 To fix this:');
    console.log('1. Open backend/.env file');
    console.log('2. Set EMAIL_USER to your Gmail address');
    console.log('3. Set EMAIL_PASS to your Gmail App Password');
    console.log('\n📚 See CONTACT_FORM_SETUP.md for detailed instructions');
    return false;
  }
  
  if (emailUser === 'your-email@gmail.com' || emailPass === 'your-app-password-here') {
    console.log('\n⚠️  Email credentials are using placeholder values!');
    console.log('\n📝 To fix this:');
    console.log('1. Open backend/.env file');
    console.log('2. Replace "your-email@gmail.com" with your actual Gmail');
    console.log('3. Replace "your-app-password-here" with your Gmail App Password');
    console.log('\n📚 See CONTACT_FORM_SETUP.md for how to get App Password');
    return false;
  }
  
  console.log('\n✅ Configuration looks good!\n');
  return true;
}

// Test server connection
async function testServerConnection() {
  console.log('🔌 Testing Server Connection...\n');
  
  try {
    const response = await axios.get(`${API_URL}/health`);
    console.log('✅ Server is running');
    console.log('Response:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Cannot connect to server');
    console.log('Error:', error.message);
    console.log('\n💡 Make sure backend server is running:');
    console.log('   cd backend && npm start');
    return false;
  }
}

// Test contact form submission
async function testContactForm() {
  console.log('\n🧪 Testing Contact Form API...\n');

  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    message: 'This is a test message from the contact form API test script.'
  };

  try {
    console.log('📤 Sending contact form data...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await axios.post(`${API_URL}/contact`, testData);
    
    console.log('\n✅ Success!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    console.log('\n📧 Check your email inbox for the message!');
    return true;
    
  } catch (error) {
    console.log('\n❌ Error!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.data.error) {
        console.log('\n💡 Error Details:', error.response.data.error);
      }
    } else if (error.code === 'ECONNREFUSED') {
      console.log('Error: Cannot connect to server');
      console.log('\n💡 Make sure backend server is running:');
      console.log('   cd backend && npm start');
    } else {
      console.log('Error:', error.message);
    }
    
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure backend server is running (npm start)');
    console.log('2. Check .env file has EMAIL_USER and EMAIL_PASS configured');
    console.log('3. Verify Gmail App Password is correct');
    console.log('4. Check backend console for detailed error messages');
    console.log('5. See CONTACT_FORM_SETUP.md for setup instructions');
    return false;
  }
}

// Test without phone (optional field)
async function testContactFormWithoutPhone() {
  console.log('\n🧪 Testing Contact Form without Phone...\n');

  const testData = {
    name: 'Test User 2',
    email: 'test2@example.com',
    message: 'This is a test message without phone number.'
  };

  try {
    console.log('📤 Sending contact form data (no phone)...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await axios.post(`${API_URL}/contact`, testData);
    
    console.log('\n✅ Success!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.log('\n❌ Error!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Test validation (missing required fields)
async function testValidation() {
  console.log('\n🧪 Testing Validation (Missing Fields)...\n');

  const testData = {
    name: 'Test User',
    // Missing email and message
  };

  try {
    console.log('📤 Sending incomplete data...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await axios.post(`${API_URL}/contact`, testData);
    
    console.log('\n⚠️  Unexpected success (should have failed validation)');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.log('\n✅ Validation working correctly!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Run all tests
async function runAllTests() {
  console.log('═══════════════════════════════════════');
  console.log('   Contact Form API Test Suite');
  console.log('═══════════════════════════════════════\n');

  // Step 1: Check configuration
  if (!checkConfiguration()) {
    console.log('\n═══════════════════════════════════════');
    console.log('   Tests Aborted - Configuration Error');
    console.log('═══════════════════════════════════════\n');
    return;
  }

  // Step 2: Test server connection
  const serverRunning = await testServerConnection();
  if (!serverRunning) {
    console.log('\n═══════════════════════════════════════');
    console.log('   Tests Aborted - Server Not Running');
    console.log('═══════════════════════════════════════\n');
    return;
  }

  // Step 3: Test contact form
  const contactFormWorking = await testContactForm();
  
  if (contactFormWorking) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    await testContactFormWithoutPhone();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    await testValidation();
  }

  console.log('\n═══════════════════════════════════════');
  console.log('   Tests Complete!');
  console.log('═══════════════════════════════════════\n');
}

runAllTests();
