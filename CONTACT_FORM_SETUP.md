# Contact Form Email Integration Guide

## ✅ What's Been Implemented

### Backend:
- ✅ Nodemailer package installed
- ✅ Contact controller created (`backend/controllers/contactController.js`)
- ✅ Contact routes created (`backend/routes/contactRoutes.js`)
- ✅ Server.js updated with contact routes
- ✅ Email configuration added to .env

### Frontend:
- ✅ ContactPage updated with form state management
- ✅ API integration with axios
- ✅ Success/error message display
- ✅ Loading states
- ✅ Form validation

## 🔧 Gmail Setup Instructions

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the steps to enable 2FA if not already enabled

### Step 2: Generate App Password

1. After enabling 2FA, go back to Security settings
2. Under "Signing in to Google", click on "App passwords"
3. You might need to sign in again
4. Select app: Choose "Mail"
5. Select device: Choose "Other (Custom name)"
6. Enter a name like "CarDealing Contact Form"
7. Click "Generate"
8. **Copy the 16-character password** (it will look like: `xxxx xxxx xxxx xxxx`)

### Step 3: Update .env File

Open `backend/.env` and update these values:

```env
# Email Configuration (Gmail SMTP)
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

**Example:**
```env
EMAIL_USER=john.doe@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

⚠️ **Important:** 
- Use the 16-character App Password, NOT your regular Gmail password
- Keep spaces in the app password or remove them (both work)
- Never commit the .env file to Git

## 🚀 Testing the Contact Form

### 1. Start the Backend:
```bash
cd backend
npm start
```

Wait for: `🚀 Server running on port 5001`

### 2. Start the Frontend:
```bash
cd automart-frontend
npm run dev
```

### 3. Test the Form:

1. Open your browser: `http://localhost:5173`
2. Navigate to "Contact" page
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 123-456-7890 (optional)
   - Message: This is a test message
4. Click "Send Message"
5. Wait for success message
6. Check your Gmail inbox for the email

## 📧 Email Features

### What You'll Receive:
- **Subject:** "New Contact Form Submission from [Name]"
- **From:** Your Gmail address
- **To:** Your Gmail address
- **Content:**
  - Sender's name
  - Sender's email (clickable)
  - Sender's phone (if provided)
  - Message content
  - Timestamp
  - Formatted HTML email with styling

### Email Template:
The email is beautifully formatted with:
- Professional header with blue accent
- Clear sections for contact info
- Highlighted message area
- Footer with timestamp
- Both HTML and plain text versions

## 🔍 Troubleshooting

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution:**
- Make sure 2FA is enabled on your Google account
- Use App Password, not your regular password
- Double-check the email address in .env
- Remove any extra spaces from the app password

### Error: "Failed to send message"

**Check:**
1. Backend server is running
2. .env file has correct credentials
3. Internet connection is working
4. Gmail SMTP is not blocked by firewall

### Error: "Network Error"

**Solution:**
- Verify backend is running on port 5001
- Check CORS settings in server.js
- Ensure frontend is making request to correct URL

### Email Not Received:

**Check:**
1. Spam/Junk folder
2. Gmail "All Mail" folder
3. Backend console for error messages
4. Email address in .env is correct

## 📋 API Endpoint Details

### POST /api/contact

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "message": "I'm interested in buying a car"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! We will get back to you soon."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Please provide name, email, and message"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Failed to send message. Please try again later."
}
```

## 🧪 Testing with cURL

Test the API directly:

```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "123-456-7890",
    "message": "This is a test message"
  }'
```

## 🔒 Security Best Practices

1. **Never commit .env file:**
   - Add `.env` to `.gitignore`
   - Use environment variables in production

2. **Use App Passwords:**
   - Never use your main Gmail password
   - Generate unique app passwords for each application

3. **Rate Limiting (Optional):**
   - Consider adding rate limiting to prevent spam
   - Use packages like `express-rate-limit`

4. **Input Validation:**
   - Already implemented: required fields
   - Email format validation
   - Consider adding captcha for production

## 📝 Customization Options

### Change Email Template:

Edit `backend/controllers/contactController.js`:
- Modify the `html` section in `mailOptions`
- Change colors, layout, or content
- Add your company logo

### Change Recipient Email:

To send to a different email than the sender:
```javascript
to: 'support@yourcompany.com', // Instead of process.env.EMAIL_USER
```

### Add Auto-Reply:

Add a second email to send confirmation to the user:
```javascript
// After sending the main email
const autoReplyOptions = {
  from: process.env.EMAIL_USER,
  to: email, // User's email
  subject: 'Thank you for contacting us',
  html: `<p>Hi ${name},</p><p>We received your message and will get back to you soon!</p>`
};

await transporter.sendMail(autoReplyOptions);
```

## ✨ Features Implemented

- ✅ Send email via Gmail SMTP
- ✅ Beautiful HTML email template
- ✅ Plain text fallback
- ✅ Form validation
- ✅ Success/error messages
- ✅ Loading states
- ✅ Dark mode support
- ✅ Mobile responsive
- ✅ Optional phone field
- ✅ Timestamp in email
- ✅ Professional formatting

## 🎯 Next Steps

1. Update .env with your Gmail credentials
2. Test the contact form
3. Check your email inbox
4. Customize email template if needed
5. Consider adding captcha for production
6. Set up email notifications (optional)

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Google 2FA Setup](https://www.google.com/landing/2step/)

## 🆘 Need Help?

If you encounter issues:
1. Check backend console for error messages
2. Verify .env configuration
3. Test with cURL to isolate frontend/backend issues
4. Check Gmail security settings
5. Ensure 2FA and App Password are set up correctly

---

**Your contact form is ready to use! Just update the .env file with your Gmail credentials and start testing.** 🚀
