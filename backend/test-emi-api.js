import dotenv from 'dotenv';

dotenv.config();

async function testEMIAPI() {
  console.log('🧪 Testing EMI Calculator API\n');
  console.log('='.repeat(60));

  const testData = {
    carPrice: 25000,
    downPayment: 5000,
    annualRate: 9.0,
    tenureMonths: 60
  };

  console.log('\n📤 Sending test data:');
  console.log(JSON.stringify(testData, null, 2));

  try {
    const response = await fetch('http://localhost:5001/api/emi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    console.log('\n📥 API Response:');
    console.log('Status:', response.status);
    console.log('Success:', result.success);

    if (result.success) {
      console.log('\n✅ EMI Calculation Result:');
      console.log('-'.repeat(60));
      console.log(`Car Price: $${result.data.carPrice.toLocaleString()}`);
      console.log(`Down Payment: $${result.data.downPayment.toLocaleString()}`);
      console.log(`Principal: $${result.data.principal.toLocaleString()}`);
      console.log(`Interest Rate: ${result.data.annualRate}% per annum`);
      console.log(`Tenure: ${result.data.months} months`);
      console.log(`Monthly EMI: $${result.data.emi.toLocaleString()}`);
      console.log(`Total Interest: $${result.data.totalInterest.toLocaleString()}`);
      console.log(`Total Payment: $${result.data.totalPayment.toLocaleString()}`);
      console.log('-'.repeat(60));
      console.log('\n🎉 EMI API is working perfectly!');
    } else {
      console.log('\n❌ API Error:', result.error);
    }

  } catch (error) {
    console.log('\n❌ Connection Error:', error.message);
    console.log('\n💡 Make sure backend is running:');
    console.log('   cd backend');
    console.log('   npm start');
  }

  console.log('\n' + '='.repeat(60));
}

testEMIAPI();