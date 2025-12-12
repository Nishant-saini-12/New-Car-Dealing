# 🔑 How to Get Gemini API Key (Step-by-Step with Screenshots)

## 📋 Quick Steps

1. Visit Google AI Studio
2. Sign in with Google
3. Create API Key
4. Copy the key
5. Add to .env file
6. Restart backend

---

## 🎯 Detailed Steps

### Step 1: Visit Google AI Studio

Open this link in your browser:
```
https://makersuite.google.com/app/apikey
```

Or search "Google AI Studio API Key" on Google.

### Step 2: Sign In

- Click **"Sign in"** button (top-right)
- Use your Google account (Gmail)
- Accept terms if prompted

### Step 3: Create API Key

You'll see a page with API keys.

**Option A: New Project**
- Click **"Create API Key"** button
- Select **"Create API key in new project"**
- Wait 5-10 seconds

**Option B: Existing Project**
- Click **"Create API Key"** button
- Select your existing Google Cloud project
- Wait 5-10 seconds

### Step 4: Copy Your API Key

You'll see something like:
```
API Key created successfully!

AIzaSyAbc123def456ghi789jkl012mno345pqr678
```

- Click the **"Copy"** icon
- Or manually select and copy the entire key
- Keep this key safe and private!

### Step 5: Add to .env File

1. Open your project folder: `D:\Car Dealing`
2. Navigate to: `backend\.env`
3. Open in any text editor (VS Code, Notepad, etc.)
4. Find this line:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
5. Replace with your actual key:
   ```
   GEMINI_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr678
   ```
6. Save the file (Ctrl + S)

### Step 6: Restart Backend

```bash
# In your backend terminal:
# Press Ctrl + C to stop the server
# Then restart:
npm start
```

You should see:
```
🚀 Server running on port 5001
📍 Environment: development
```

### Step 7: Test Your Chatbot

1. Open frontend: http://localhost:5173
2. Click the blue robot icon (bottom-right)
3. Type: "Show me all SUVs"
4. Press Enter

**You should see AI respond with SUV details!** 🎉

---

## 🔍 Verify It's Working

### Test 1: Check Environment
```bash
cd backend
node test-env.js
```

Should show:
```
✅ GEMINI_API_KEY is configured!
First 10 chars: AIzaSyAbc1...
```

### Test 2: Test API Connection
```bash
cd backend
node test-gemini-api.js
```

Should show:
```
🎉 SUCCESS! Gemini API is working perfectly!
```

### Test 3: Test Chatbot Endpoint
```bash
cd backend
node test-chatbot.js
```

Should show AI responses for all test queries.

---

## ⚠️ Important Notes

### Security
- ❌ Never share your API key publicly
- ❌ Never commit .env file to GitHub
- ✅ Keep it in .env file only
- ✅ Add .env to .gitignore

### Free Tier Limits
- 60 requests per minute
- 1,500 requests per day
- Enough for testing and small projects

### If Key Doesn't Work
1. Make sure you copied the entire key
2. No extra spaces before/after the key
3. Key should start with `AIza`
4. Try generating a new key

---

## 📸 Visual Guide

### What You'll See:

**1. Google AI Studio Homepage**
```
┌─────────────────────────────────────┐
│  Google AI Studio                   │
│                                     │
│  [Create API Key]  [Sign In]       │
│                                     │
│  Build with Gemini API              │
└─────────────────────────────────────┘
```

**2. Create API Key Dialog**
```
┌─────────────────────────────────────┐
│  Create API Key                     │
│                                     │
│  ○ Create API key in new project   │
│  ○ Select existing project         │
│                                     │
│  [Cancel]  [Create]                │
└─────────────────────────────────────┘
```

**3. API Key Created**
```
┌─────────────────────────────────────┐
│  ✅ API Key Created                 │
│                                     │
│  AIzaSyAbc123def456ghi789jkl012... │
│  [📋 Copy]                          │
│                                     │
│  Keep this key secure!              │
└─────────────────────────────────────┘
```

**4. Your .env File**
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/cardealing
JWT_SECRET=cardealing_super_secret_jwt_key_2024
JWT_EXPIRE=7d
NODE_ENV=development

# Email Configuration
EMAIL_USER=nishantsainiii123@gmail.com
EMAIL_PASS=euvwwopojycgquvk

# Gemini AI Configuration
GEMINI_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr678
                ↑↑↑ Paste your key here ↑↑↑
```

---

## 🎉 Success!

Once you've added the API key and restarted the backend:

✅ Chatbot will respond to queries
✅ AI will answer from car database
✅ No more error messages
✅ Smooth conversation experience

---

## 🆘 Need Help?

### Can't access Google AI Studio?
- Try different browser
- Clear cache and cookies
- Use incognito mode
- Check if you're signed in to Google

### API Key not working?
- Run: `node test-gemini-api.js`
- Check error message
- Generate new key if needed

### Still getting errors?
- Check `CHATBOT_FIX_GUIDE.md`
- Look at backend console logs
- Test with Postman

---

**Total Time: 2 minutes**
**Difficulty: Easy**
**Cost: Free** 💰

Get your key now and start chatting! 🚀
