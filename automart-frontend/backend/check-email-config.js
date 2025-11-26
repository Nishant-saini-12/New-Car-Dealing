import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

console.log('═══════════════════════════════════════');
console.log('   Email Configuration Checker');
console.log('═══════════════════════════════════════\n');

// Step 1: Check if .env file exists and has values
console.log('📋 Step 1: Checking .env Configuration\n');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log('EMAIL_USER:', emailUser || '❌ NOT SET');
console.log('EMAIL_PASS:', emailPass ? '✅ SET (length: ' + emailPass.length + ' characters)' : '❌ NOT SET');

if (!emailUser || !emailPass) {
  console.log('\n❌ FAILED: Email credentials not configured!\n');
  console.log('📝 To fix this:');
  console.log('1. Open backend/.env file');
  console.log('2. Add these lines:');
  console.log('   EMAIL_USER=your-email@gmail.com');
  console.log('   EMAIL_PASS=your-16-char-app-password');
  console.log('\n📚 See CONTACT_FORM_SETUP.md for detailed instructions\n');
  process.exit(1);
}

if (emailUser === 'your-email@gmail.com' || emailPass === 'your-app-password-here') {
  console.log('\n⚠️  WARNING: Using placeholder values!\n');
  console.log('📝 To fix this:');
  console.log('1. Go to https://myaccount.google.com/security');
  console.log('2. Enable 2-Step Verification');
  console.log('3. Click "App passwords"');
  console.log('4. Generate password for "Mail"');
  console.log('5. Update .env file with your actual Gmail and App Password\n');
  console.log('📚 See CONTACT_FORM_SETUP.md for step-by-step guide\n');
  process.exit(1);
}

console.log('\n✅ Configuration values are set\n');

// Step 2: Test SMTP connection
console.log('📋 Step 2: Testing SMTP Connection\n');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
  },
  debug: true,
  logger: true
});

console.log('Attempting to connect to Gmail SMTP...\n');

try {
  await transporter.verify();
  console.log('\n✅ SUCCESS: SMTP connection verified!\n');
  console.log('Your email configuration is working correctly.');
  console.log('You can now send emails through the contact form.\n');
  
  console.log('═══════════════════════════════════════');
  console.log('   Configuration Check: PASSED ✅');
  console.log('═══════════════════════════════════════\n');
  
  console.log('🚀 Next steps:');
  console.log('1. Start backend: cd backend && npm start');
  console.log('2. Start frontend: cd automart-frontend && npm run dev');
  console.log('3. Test contact form at http://localhost:5173\n');
  
} catch (error) {
  console.log('\n❌ FAILED: SMTP connection error!\n');
  console.log('Error:', error.message);
  console.log('Code:', error.code);
  
  console.log('\n💡 Common Issues:\n');
  
  if (error.code === 'EAUTH') {
    console.log('Authentication Failed:');
    console.log('- Make sure you\'re using an App Password, not your regular Gmail password');
    console.log('- App Password should be 16 characters (with or without spaces)');
    console.log('- Verify 2-Step Verification is enabled on your Google account');
    console.log('- Try generating a new App Password');
  } else if (error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') {
    console.log('Network Error:');
    console.log('- Check your internet connection');
    console.log('- Verify firewall is not blocking SMTP (port 587/465)');
    console.log('- Try disabling VPN if you\'re using one');
  } else if (error.code === 'ECONNECTION') {
    console.log('Connection Error:');
    console.log('- Gmail SMTP might be temporarily unavailable');
    console.log('- Check if Gmail is accessible in your region');
    console.log('- Try again in a few minutes');
  } else {
    console.log('Unknown Error:');
    console.log('- Double-check your EMAIL_USER is a valid Gmail address');
    console.log('- Verify EMAIL_PASS is the App Password (not regular password)');
    console.log('- See CONTACT_FORM_SETUP.md for troubleshooting');
  }
  
  console.log('\n📚 Resources:');
  console.log('- Setup Guide: CONTACT_FORM_SETUP.md');
  console.log('- Get App Password: https://myaccount.google.com/apppasswords');
  console.log('- Enable 2FA: https://myaccount.google.com/security\n');
  
  console.log('═══════════════════════════════════════');
  console.log('   Configuration Check: FAILED ❌');
  console.log('═══════════════════════════════════════\n');
  
  process.exit(1);
}
