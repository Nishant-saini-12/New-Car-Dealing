import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Test credentials - update these with your actual test user
const TEST_USER = {
  email: 'test@example.com',
  password: 'test123'
};

let authToken = '';
let testCarId = '';

// Helper function to make authenticated requests
const makeRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${API_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message 
    };
  }
};

// Test 1: Login
async function testLogin() {
  console.log('\n🔐 Test 1: Login');
  try {
    const response = await axios.post(`${API_URL}/auth/login`, TEST_USER);
    authToken = response.data.token;
    console.log('✅ Login successful');
    console.log('Token:', authToken.substring(0, 20) + '...');
    return true;
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data || error.message);
    return false;
  }
}

// Test 2: Get all cars (to get a test car ID)
async function testGetCars() {
  console.log('\n🚗 Test 2: Get all cars');
  const result = await makeRequest('GET', '/cars');
  
  if (result.success && result.data.cars && result.data.cars.length > 0) {
    testCarId = result.data.cars[0]._id;
    console.log('✅ Got cars successfully');
    console.log('Test Car ID:', testCarId);
    console.log('Test Car:', result.data.cars[0].brand, result.data.cars[0].model);
    return true;
  } else {
    console.log('❌ Failed to get cars:', result.error);
    return false;
  }
}

// Test 3: Get empty wishlist
async function testGetEmptyWishlist() {
  console.log('\n📋 Test 3: Get empty wishlist');
  const result = await makeRequest('GET', '/wishlist');
  
  if (result.success) {
    console.log('✅ Got wishlist successfully');
    console.log('Wishlist count:', result.data.count);
    console.log('Wishlist items:', result.data.wishlist.length);
    return true;
  } else {
    console.log('❌ Failed to get wishlist:', result.error);
    return false;
  }
}

// Test 4: Add car to wishlist
async function testAddToWishlist() {
  console.log('\n➕ Test 4: Add car to wishlist');
  const result = await makeRequest('POST', '/wishlist/toggle', { carId: testCarId });
  
  if (result.success && result.data.inWishlist === true) {
    console.log('✅ Added to wishlist successfully');
    console.log('Message:', result.data.message);
    return true;
  } else {
    console.log('❌ Failed to add to wishlist:', result.error);
    return false;
  }
}

// Test 5: Check if car is in wishlist
async function testCheckWishlist() {
  console.log('\n🔍 Test 5: Check if car is in wishlist');
  const result = await makeRequest('GET', `/wishlist/check/${testCarId}`);
  
  if (result.success && result.data.inWishlist === true) {
    console.log('✅ Car is in wishlist');
    return true;
  } else {
    console.log('❌ Check failed or car not in wishlist:', result.error);
    return false;
  }
}

// Test 6: Get wishlist with car
async function testGetWishlistWithCar() {
  console.log('\n📋 Test 6: Get wishlist with car');
  const result = await makeRequest('GET', '/wishlist');
  
  if (result.success && result.data.wishlist.length > 0) {
    console.log('✅ Got wishlist with cars');
    console.log('Wishlist count:', result.data.count);
    console.log('First car:', result.data.wishlist[0].brand, result.data.wishlist[0].model);
    return true;
  } else {
    console.log('❌ Failed to get wishlist with cars:', result.error);
    return false;
  }
}

// Test 7: Remove car from wishlist
async function testRemoveFromWishlist() {
  console.log('\n➖ Test 7: Remove car from wishlist');
  const result = await makeRequest('POST', '/wishlist/toggle', { carId: testCarId });
  
  if (result.success && result.data.inWishlist === false) {
    console.log('✅ Removed from wishlist successfully');
    console.log('Message:', result.data.message);
    return true;
  } else {
    console.log('❌ Failed to remove from wishlist:', result.error);
    return false;
  }
}

// Test 8: Verify wishlist is empty again
async function testVerifyEmptyWishlist() {
  console.log('\n📋 Test 8: Verify wishlist is empty');
  const result = await makeRequest('GET', '/wishlist');
  
  if (result.success && result.data.wishlist.length === 0) {
    console.log('✅ Wishlist is empty as expected');
    return true;
  } else {
    console.log('❌ Wishlist is not empty:', result.error);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Wishlist API Tests...');
  console.log('=====================================');
  
  const results = [];
  
  results.push(await testLogin());
  if (!results[0]) {
    console.log('\n❌ Cannot continue without authentication');
    return;
  }
  
  results.push(await testGetCars());
  if (!results[1]) {
    console.log('\n❌ Cannot continue without test car');
    return;
  }
  
  results.push(await testGetEmptyWishlist());
  results.push(await testAddToWishlist());
  results.push(await testCheckWishlist());
  results.push(await testGetWishlistWithCar());
  results.push(await testRemoveFromWishlist());
  results.push(await testVerifyEmptyWishlist());
  
  console.log('\n=====================================');
  console.log('📊 Test Results Summary:');
  console.log('=====================================');
  const passed = results.filter(r => r).length;
  const total = results.length;
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the output above.');
  }
}

// Run the tests
runAllTests();
