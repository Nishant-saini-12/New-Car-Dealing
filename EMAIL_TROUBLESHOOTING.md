# Email Configuration Troubleshooting Guide

## 🔍 Quick Diagnosis

Run this command to check your configuration:

```bash
cd backend
node check-email-config.js
```

This will tell you exactly what's wrong and how to fix it.

## ⚠️ Common Issues & Solutions

### Issue 1: "Email credentials not configured"

**Symptoms:**
- Error message: "EMAIL_USER or EMAIL_PASS not set in .env"
- Contact form returns 500 error

**Solution:**
1. Open `backend/.env` file
2. Add these lines:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password-here
   ```
3. Replace with your actual values
4. Restart backend server

### Issue 2: "Using placeholder values"

**Symptoms:**
- .env has `your-email@gmail.com` or `your-app-password-here`
- Error: "Email service is not properly configured"

**Solution:**
1. Get your Gmail App Password:
   - Go to https://myaccount.google.com/security
   - Enable "2-Step Verification"
   - Click "App passwords"
   - Select "Mail" → "Other (Custom name)"
   - Name it "CarDealing"
   - Click "Generate"
   - Copy the 16-character password

2. Update `backend/.env`:
   ```env
   EMAIL_USER=john.doe@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop
   ```

3. Restart backend server

### Issue 3: "Authentication Failed" (EAUTH)

**Symptoms:**
- Error code: EAUTH
- Message: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solutions:**

**A. Using Regular Password Instead of App Password**
- ❌ Don't use your regular Gmail password
- ✅ Use App Password (16 characters)
- Get it from: https://myaccount.google.com/apppasswords

**B. 2-Step Verification Not Enabled**
- Go to https://myaccount.google.com/security
- Enable "2-Step Verification"
- Then generate App Password

**C. Wrong Email Address**
- Make sure EMAIL_USER is your full Gmail address
- Example: `john.doe@gmail.com` (not just `john.doe`)

**D. Spaces in App Password**
- App Password can have spaces: `abcd efgh ijkl mnop`
- Or no spaces: `abcdefghijklmnop`
- Both work, but make sure it's 16 characters total

**E. Old/Invalid App Password**
- Generate a new App Password
- Delete old ones from Google Account settings
- Update .env with new password

### Issue 4: "Network Error" (ESOCKET/ETIMEDOUT)

**Symptoms:**
- Error code: ESOCKET or ETIMEDOUT
- Message: "Connection timeout"

**Solutions:**

**A. Internet Connection**
- Check your internet is working
- Try accessing gmail.com in browser

**B. Firewall Blocking SMTP**
- SMTP uses ports 587 (TLS) or 465 (SSL)
- Check firewall settings
- Allow Node.js through firewall

**C. VPN Issues**
- Try disabling VPN
- Some VPNs block SMTP

**D. Corporate Network**
- Corporate networks often block SMTP
- Try from home network
- Or use mobile hotspot

### Issue 5: "Cannot connect to server"

**Symptoms:**
- Error: ECONNREFUSED
- Frontend shows network error

**Solutions:**

**A. Backend Not Running**
```bash
cd backend
npm start
```
Wait for: "🚀 Server running on port 5001"

**B. Wrong Port**
- Backend should run on port 5001
- Check `backend/.env`: `PORT=5001`
- Frontend API calls should use `http://localhost:5001`

**C. Port Already in Use**
- Kill process using port 5001
- Or change PORT in .env

### Issue 6: "Email not received"

**Symptoms:**
- Form submits successfully
- No error messages
- But email doesn't arrive

**Solutions:**

**A. Check Spam Folder**
- Look in Gmail Spam/Junk folder
- Mark as "Not Spam" if found

**B. Check All Mail**
- Go to Gmail → All Mail
- Search for sender email

**C. Wrong Recipient**
- Email is sent to EMAIL_USER (your own email)
- Check that EMAIL_USER in .env is correct

**D. Gmail Filters**
- Check Gmail filters/rules
- Might be auto-archiving or deleting

**E. Delivery Delay**
- Sometimes takes 1-2 minutes
- Wait and refresh inbox

## 🧪 Testing Steps

### Step 1: Check Configuration
```bash
cd backend
node check-email-config.js
```

Expected output:
```
✅ Configuration values are set
✅ SUCCESS: SMTP connection verified!
```

### Step 2: Test API
```bash
cd backend
node test-contact.js
```

Expected output:
```
✅ Success!
📧 Check your email inbox for the message!
```

### Step 3: Test Frontend
1. Start backend: `cd backend && npm start`
2. Start frontend: `cd automart-frontend && npm run dev`
3. Open http://localhost:5173
4. Go to Contact page
5. Fill and submit form
6. Check for success message
7. Check email inbox

## 🔧 Manual SMTP Test

Test SMTP connection directly:

```javascript
// test-smtp.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

transporter.verify()
  .then(() => console.log('✅ SMTP working!'))
  .catch(err => console.log('❌ Error:', err.message));
```

Run: `node test-smtp.js`

## 📋 Configuration Checklist

- [ ] .env file exists in backend folder
- [ ] EMAIL_USER is set to your Gmail address
- [ ] EMAIL_PASS is set to App Password (not regular password)
- [ ] App Password is 16 characters
- [ ] 2-Step Verification is enabled on Gmail
- [ ] Backend server is running
- [ ] No firewall blocking SMTP
- [ ] Internet connection is working
- [ ] Not using placeholder values

## 🆘 Still Not Working?

### Check Backend Console

Look for these messages:
- ✅ "SMTP connection verified" = Good!
- ❌ "Email credentials not configured" = Update .env
- ❌ "SMTP verification failed" = Check credentials
- ❌ "EAUTH" = Wrong password or 2FA not enabled

### Check Browser Console

Look for these errors:
- ❌ "Network Error" = Backend not running
- ❌ "500 Internal Server Error" = Check backend console
- ❌ "Failed to send message" = Check backend logs

### Enable Debug Mode

In `backend/controllers/contactController.js`, the transporter already has:
```javascript
debug: process.env.NODE_ENV === 'development',
logger: process.env.NODE_ENV === 'development'
```

This shows detailed SMTP logs in backend console.

## 📚 Resources

- **Setup Guide:** CONTACT_FORM_SETUP.md
- **Quick Start:** CONTACT_FORM_QUICK_START.md
- **Complete Guide:** CONTACT_FORM_COMPLETE.md

- **Gmail App Passwords:** https://myaccount.google.com/apppasswords
- **Enable 2FA:** https://myaccount.google.com/security
- **Nodemailer Docs:** https://nodemailer.com/

## 💡 Pro Tips

1. **Use App Password, not regular password**
   - Regular password won't work
   - Must use 16-character App Password

2. **Enable 2FA first**
   - App Passwords only available with 2FA
   - Enable at https://myaccount.google.com/security

3. **Check .env is loaded**
   - Restart backend after changing .env
   - Use `console.log(process.env.EMAIL_USER)` to verify

4. **Test incrementally**
   - First: Check config with `check-email-config.js`
   - Then: Test API with `test-contact.js`
   - Finally: Test frontend form

5. **Read error messages**
   - Backend console shows detailed errors
   - Error codes tell you what's wrong
   - Follow the troubleshooting steps

## ✅ Success Indicators

You'll know it's working when:
- ✅ `check-email-config.js` passes
- ✅ `test-contact.js` succeeds
- ✅ Frontend form shows success message
- ✅ Email arrives in your Gmail inbox
- ✅ Backend console shows "Email sent successfully"

## 🎯 Quick Fix Checklist

Try these in order:

1. ✅ Run `node check-email-config.js`
2. ✅ Update .env with real Gmail and App Password
3. ✅ Restart backend server
4. ✅ Run `node test-contact.js`
5. ✅ Test frontend form
6. ✅ Check email inbox (and spam folder)

If all steps pass, your contact form is working! 🎉
