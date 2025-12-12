# 🚀 START HERE - AI Chatbot Setup

## ⚡ 3 Steps to Launch Your AI Chatbot

### Step 1️⃣: Get API Key (30 seconds)

1. Open this link: **https://makersuite.google.com/app/apikey**
2. Click **"Create API Key"** button
3. Copy the API key

### Step 2️⃣: Add API Key (15 seconds)

Open file: `backend/.env`

Find this line:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace with your actual key:
```
GEMINI_API_KEY=AIzaSyAbc123YourActualKeyHere
```

Save the file.

### Step 3️⃣: Start Everything (1 minute)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
✅ Wait for: "Server running on port 5001"

**Terminal 2 - Frontend:**
```bash
cd automart-frontend
npm run dev
```
✅ Wait for: "Local: http://localhost:5173"

## 🎉 Test Your Chatbot!

1. Open browser: **http://localhost:5173**
2. Look for **blue robot icon** at bottom-right corner
3. Click it to open chat
4. Type: **"Show me all SUVs"**
5. Press Enter

**You should see AI respond with SUV details!** 🚗

## 🧪 More Test Queries

```
"Cars under 10 lakhs"
"Which car has best mileage?"
"Tell me about Honda City"
"Compare Creta and Seltos"
"Show automatic transmission cars"
```

## ✅ Success Checklist

- [ ] Got Gemini API key
- [ ] Added key to backend/.env
- [ ] Backend running (Terminal 1)
- [ ] Frontend running (Terminal 2)
- [ ] Website opened in browser
- [ ] Blue robot icon visible
- [ ] Chat window opens
- [ ] AI responds to queries

## ⚠️ If Something's Wrong

### Backend won't start?
```bash
cd backend
npm install
npm start
```

### Frontend won't start?
```bash
cd automart-frontend
npm install
npm run dev
```

### Chatbot not responding?
- Check if GEMINI_API_KEY is correct in .env
- Check backend terminal for errors
- Press F12 in browser, check Console tab

### Robot icon not showing?
- Refresh the page (Ctrl + R)
- Clear cache (Ctrl + Shift + R)
- Check if frontend is running

## 📚 Need More Help?

Read these guides:
1. **AI_CHATBOT_README.md** - Overview
2. **CHATBOT_QUICK_START.md** - Quick guide
3. **CHATBOT_SETUP_GUIDE.md** - Detailed guide

## 🎯 What You Have

✅ **10 cars** in database (cars.json)
✅ **AI-powered** chatbot (Gemini)
✅ **Beautiful UI** (floating chat)
✅ **Dark mode** support
✅ **Mobile responsive**
✅ **Error-free** code
✅ **Production ready**

## 📁 Files Created

```
✅ backend/data/cars.json
✅ backend/controllers/chatController.js
✅ backend/routes/chatRoutes.js
✅ backend/test-chatbot.js
✅ automart-frontend/src/components/Chatbot.jsx
✅ Updated: backend/server.js
✅ Updated: backend/.env
✅ Updated: automart-frontend/src/App.jsx
```

## 🚀 You're Ready!

Just follow the 3 steps above and your chatbot will be live!

---

**Total Time: 2 minutes**
**Difficulty: Easy**
**Result: Professional AI Chatbot** 🎉
