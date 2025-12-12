# 🔍 Backend Diagnostic Guide

## Current Issue

Frontend shows `ERR_NETWORK` when sending chat request.

## Root Cause Analysis

The error happens because:
1. Backend receives the request ✅
2. Backend tries to call Gemini API ❓
3. Something fails in the process ❌
4. Frontend doesn't get response ❌

## Step-by-Step Diagnosis

### Step 1: Check if Backend is Running

```bash
curl http://localhost:5001/api/health
```

**Expected:** `{"success":true,"message":"Server is running"}`

**If fails:** Backend is not running. Start it:
```bash
cd backend
npm start
```

### Step 2: Check Environment Variables

```bash
cd backend
node test-env.js
```

**Expected:** 
```
✅ GEMINI_API_KEY is configured!
First 10 chars: AIzaSyAbc1...
```

**If fails:** API key not set. Add to `backend/.env`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

### Step 3: Test Gemini API Connection

```bash
cd backend
node test-gemini-api.js
```

**Expected:**
```
🎉 SUCCESS! Gemini API is working perfectly!
```

**If fails:** Check the error message and fix accordingly.

### Step 4: Test Chat Endpoint (Without AI)

```bash
cd backend
node test-chat-endpoint.js
```

This will test:
1. Health endpoint
2. Test endpoint (no AI)
3. Actual chat endpoint (with AI)

### Step 5: Check Backend Logs

When you send a message from frontend, backend terminal should show:

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

**If you see error logs instead:**
```
🔥🔥🔥 CHATBOT ERROR DETAILS 🔥🔥🔥
Error Name: [error name]
Error Message: [error message]
...
```

This tells you the exact problem!

## Common Errors & Solutions

### Error 1: "API_KEY_INVALID"
```
🔑 INVALID API KEY! Get a new one from: https://makersuite.google.com/app/apikey
```

**Solution:** 
1. Get new API key
2. Update `backend/.env`
3. Restart backend

### Error 2: "PERMISSION_DENIED"
```
🚫 PERMISSION DENIED! Enable Gemini API in Google Cloud Console
```

**Solution:**
1. Go to Google Cloud Console
2. Enable Gemini API
3. Try again

### Error 3: "RESOURCE_EXHAUSTED"
```
⏰ RATE LIMIT EXCEEDED! Wait or upgrade your plan
```

**Solution:**
- Wait 1 minute
- Or upgrade to paid plan

### Error 4: "ENOENT"
```
📁 FILE NOT FOUND! Check cars.json path
```

**Solution:**
- Check if `backend/data/cars.json` exists
- Check file path in code

### Error 5: Network Timeout
```
Error: timeout of 30000ms exceeded
```

**Solution:**
- Gemini API is slow
- Increase timeout
- Check internet connection

### Error 6: "Cannot read property 'text'"
```
TypeError: Cannot read property 'text' of undefined
```

**Solution:**
- AI response format changed
- Update response parsing code

## Testing Workflow

### 1. Start Backend
```bash
cd backend
npm start
```

Wait for:
```
🚀 Server running on port 5001
📍 Environment: development
```

### 2. Test from Terminal
```bash
# In new terminal
cd backend
node test-chat-endpoint.js
```

### 3. Test from Frontend
1. Open http://localhost:5173
2. Click robot icon
3. Type: "Show me all SUVs"
4. Watch backend terminal for logs

### 4. Test from Postman
**POST** `http://localhost:5001/api/chat`

Headers:
```
Content-Type: application/json
```

Body:
```json
{
  "message": "Show me all SUVs"
}
```

## Debug Checklist

- [ ] Backend is running on port 5001
- [ ] Health endpoint responds
- [ ] GEMINI_API_KEY is set in .env
- [ ] API key is valid (not placeholder)
- [ ] Gemini API test passes
- [ ] cars.json file exists
- [ ] Test endpoint works (no AI)
- [ ] Actual chat endpoint works (with AI)
- [ ] Backend logs show no errors
- [ ] Frontend receives response

## What I Added

### 1. Enhanced Error Logging
`chatController.js` now logs:
- Error object
- Error name
- Error message
- Error code
- Error status
- Error stack
- Specific error type hints

### 2. Test Endpoint
`/api/chat-test` - Tests without AI:
- Checks if request reaches backend
- Loads cars.json
- Returns simple response
- No Gemini API call

### 3. Test Scripts
- `test-env.js` - Check environment
- `test-gemini-api.js` - Test Gemini API
- `test-chat-endpoint.js` - Test all endpoints

## Next Steps

1. **Start backend** if not running
2. **Run test scripts** to identify issue
3. **Check backend logs** when sending message
4. **Fix the specific error** shown in logs
5. **Test again** until working

## Expected Backend Logs (Success)

```
🚀 Server running on port 5001
📍 Environment: development
📨 POST /api/chat
📩 Received message: Show me all SUVs
🔑 API Key exists: true
🔑 API Key value: AIzaSyAbc1...
📁 Cars file path: D:\Car Dealing\backend\data\cars.json
✅ Loaded 10 cars
🤖 Calling Gemini AI...
✅ AI Response received: Here are the SUVs available in our inventory...
```

## Expected Backend Logs (Error)

```
🚀 Server running on port 5001
📍 Environment: development
📨 POST /api/chat
📩 Received message: Show me all SUVs
🔑 API Key exists: true
🔑 API Key value: your_gemini...
❌ GEMINI_API_KEY not configured!

🔥🔥🔥 CHATBOT ERROR DETAILS 🔥🔥🔥
Error Name: Error
Error Message: API key not found or using placeholder value
...
🔥🔥🔥 END ERROR DETAILS 🔥🔥🔥
```

The error logs will tell you exactly what's wrong!

---

**Start backend and check the logs to see the real error!** 🔍
