# 🚀 AI Chatbot - Quick Start (2 Minutes)

## Step 1: Get API Key (30 seconds)
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

## Step 2: Add API Key (10 seconds)
Open `backend/.env` and add:
```
GEMINI_API_KEY=paste_your_key_here
```

## Step 3: Start Backend (30 seconds)
```bash
cd backend
npm start
```
✅ Should see: "Server running on port 5001"

## Step 4: Start Frontend (30 seconds)
```bash
cd automart-frontend
npm run dev
```
✅ Should see: "Local: http://localhost:5173"

## Step 5: Test (30 seconds)
1. Open http://localhost:5173
2. Click the **blue robot icon** (bottom-right)
3. Type: "Show me all SUVs"
4. Press Enter

## ✅ Success!
You should see the AI respond with SUV details!

## 🧪 Quick Test Commands

Try these in the chatbot:
```
1. "Show me all cars"
2. "Cars under 10 lakhs"
3. "Which car has best mileage?"
4. "Tell me about Honda City"
5. "Compare Creta and Seltos"
```

## ⚠️ If Not Working

**Backend Error?**
- Check if GEMINI_API_KEY is in .env
- Check if MongoDB is running
- Check port 5001 is free

**Frontend Error?**
- Check if backend is running
- Check browser console (F12)
- Clear cache and reload

**Chatbot Not Showing?**
- Look for blue robot icon at bottom-right
- Check if page is fully loaded
- Try refreshing the page

## 📱 Features Working?

- [ ] Floating robot button visible
- [ ] Chat window opens
- [ ] Can send messages
- [ ] AI responds
- [ ] Dark mode works
- [ ] Mobile responsive

## 🎉 Done!

Your AI Car Chatbot is ready!

For detailed guide, see: `CHATBOT_SETUP_GUIDE.md`
