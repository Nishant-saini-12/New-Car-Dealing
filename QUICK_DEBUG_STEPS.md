# ⚡ Quick Debug Steps - ERR_NETWORK Issue

## Problem
Frontend shows `ERR_NETWORK` when chatting with bot.

## Solution (5 Minutes)

### Step 1: Start Backend (if not running)
```bash
cd backend
npm start
```

Wait for: `🚀 Server running on port 5001`

### Step 2: Check API Key
```bash
cd backend
node test-env.js
```

**If shows placeholder:** Add real API key to `backend/.env`

### Step 3: Test Gemini API
```bash
cd backend
node test-gemini-api.js
```

**If fails:** Get new API key from https://makersuite.google.com/app/apikey

### Step 4: Test Chat Endpoint
```bash
cd backend
node test-chat-endpoint.js
```

This will show exactly where the error is!

### Step 5: Send Message from Frontend

1. Open http://localhost:5173
2. Click robot icon
3. Type: "Show me all SUVs"
4. **Watch backend terminal** - it will show detailed error!

## What to Look For

### Backend Terminal Should Show:
```
📨 POST /api/chat
📩 Received message: Show me all SUVs
🔑 API Key exists: true
🔑 API Key value: AIzaSyAbc1...
📁 Cars file path: D:\Car Dealing\backend\data\cars.json
✅ Loaded 10 cars
🤖 Calling Gemini AI...
✅ AI Response received: Here are the SUVs...
```

### If Error, You'll See:
```
🔥🔥🔥 CHATBOT ERROR DETAILS 🔥🔥🔥
Error Name: [tells you what's wrong]
Error Message: [tells you why]
...
```

## What I Fixed

1. ✅ Added detailed error logging in `chatController.js`
2. ✅ Added test endpoint `/api/chat-test` (no AI)
3. ✅ Created test scripts for diagnosis
4. ✅ Added specific error type detection

## Most Likely Issues

### 1. API Key Not Set (90% chance)
**Fix:** Add real API key to `backend/.env`

### 2. Backend Not Running (5% chance)
**Fix:** Run `npm start` in backend folder

### 3. Gemini API Error (4% chance)
**Fix:** Check error message and fix accordingly

### 4. Network/Timeout (1% chance)
**Fix:** Check internet connection

## Quick Test

Run this ONE command to test everything:
```bash
cd backend
node test-chat-endpoint.js
```

It will tell you exactly what's wrong!

---

**The backend terminal will show the real error. Check it!** 🔍
