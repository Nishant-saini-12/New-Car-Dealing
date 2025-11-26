// Quick test script to verify POST /api/cars route
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

async function testCarRoute() {
  try {
    console.log('🧪 Testing POST /api/cars route...\n');

    // First, login to get token
    console.log('1️⃣ Logging in...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'test@test.com',
      password: 'test123'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login successful, token received\n');

    // Then, create a car
    console.log('2️⃣ Creating car...');
    const carData = {
      brand: 'Test Brand',
      model: 'Test Model',
      year: 2022,
      price: 20000,
      mileage: 10000,
      fuel: 'Petrol',
      location: 'Test City',
      description: 'This is a test car listing',
      imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600'
    };

    const carResponse = await axios.post(`${API_URL}/cars`, carData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Car created successfully!');
    console.log('📦 Response:', JSON.stringify(carResponse.data, null, 2));

    // Verify by fetching all cars
    console.log('\n3️⃣ Fetching all cars...');
    const allCarsResponse = await axios.get(`${API_URL}/cars`);
    console.log(`✅ Found ${allCarsResponse.data.count} cars in database`);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testCarRoute();
