# Contact Form - Quick Start Guide

## ⚡ 3-Minute Setup

### Step 1: Get Gmail App Password (2 minutes)

1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification" (if not already enabled)
3. Click "App passwords"
4. Select "Mail" and "Other (Custom name)"
5. Name it: "CarDealing Contact Form"
6. Click "Generate"
7. **Copy the 16-character password**

### Step 2: Update .env File (30 seconds)

Open `backend/.env` and update:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

Replace with your actual Gmail and the app password you just copied.

### Step 3: Test It! (30 seconds)

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd automart-frontend
npm run dev

# Terminal 3: Test API (optional)
cd backend
node test-contact.js
```

Then:
1. Open http://localhost:5173
2. Go to "Contact" page
3. Fill the form and submit
4. Check your Gmail inbox! 📧

## ✅ What's Working

- ✅ Contact form with validation
- ✅ Email sent via Gmail SMTP
- ✅ Beautiful HTML email template
- ✅ Success/error messages
- ✅ Loading states
- ✅ Dark mode support

## 📧 Email You'll Receive

**Subject:** New Contact Form Submission from [Name]

**Content:**
- Sender's name, email, phone
- Their message
- Timestamp
- Professional formatting

## 🔧 Troubleshooting

**Email not sending?**
1. Check .env has correct EMAIL_USER and EMAIL_PASS
2. Use App Password, not regular Gmail password
3. Make sure 2FA is enabled on Gmail
4. Check backend console for errors

**Form not submitting?**
1. Backend must be running on port 5001
2. Check browser console for errors
3. Verify network tab shows POST to /api/contact

## 📚 Full Documentation

See `CONTACT_FORM_SETUP.md` for:
- Detailed setup instructions
- API documentation
- Customization options
- Security best practices

## 🎯 That's It!

Your contact form is ready. Just update the .env file and start testing! 🚀
