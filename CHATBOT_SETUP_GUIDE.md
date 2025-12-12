# 🤖 AI Car Chatbot - Complete Setup Guide

## 📁 Folder Structure

```
Car Dealing/
├── backend/
│   ├── controllers/
│   │   └── chatController.js       # AI chat logic
│   ├── routes/
│   │   └── chatRoutes.js          # Chat API routes
│   ├── data/
│   │   └── cars.json              # Car inventory database
│   ├── .env                       # Environment variables
│   └── server.js                  # Updated with chat routes
│
└── automart-frontend/
    └── src/
        └── components/
            └── Chatbot.jsx        # Chat UI component
```

## 🚀 Setup Steps

### Step 1: Get Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your API key

### Step 2: Configure Backend

1. Open `backend/.env`
2. Add your Gemini API key:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### Step 3: Install Dependencies

Backend already has the required package installed:
- `@google/generative-ai` ✅

### Step 4: Start Backend Server

```bash
cd backend
npm start
```

Server will run on: http://localhost:5001

### Step 5: Start Frontend

```bash
cd automart-frontend
npm run dev
```

Frontend will run on: http://localhost:5173

## 🎯 How to Use

1. Open your website in browser
2. Look for the **floating blue robot icon** at bottom-right
3. Click it to open the chatbot
4. Ask questions like:
   - "Show me all SUVs"
   - "Which car has best mileage?"
   - "Cars under 10 lakhs"
   - "Tell me about Honda City"
   - "Compare Creta and Seltos"
   - "Automatic transmission cars"

## 🧪 Testing the Chatbot

### Test 1: Basic Query
```
User: "Show me all cars"
Bot: Will list all 10 cars with details
```

### Test 2: Price Filter
```
User: "Cars under 10 lakhs"
Bot: Will show Maruti Swift, Baleno, Tata Nexon, etc.
```

### Test 3: Specific Car
```
User: "Tell me about Toyota Fortuner"
Bot: Will show price, mileage, fuel type, etc.
```

### Test 4: Comparison
```
User: "Compare Creta and Seltos"
Bot: Will compare both SUVs
```

### Test 5: Missing Info
```
User: "Tell me about BMW X5"
Bot: "Is car ki info available nahi hai."
```

## 🎨 Features

### Frontend (Chatbot.jsx)
- ✅ Floating button (bottom-right)
- ✅ Modern chat UI with gradient colors
- ✅ User & bot message bubbles
- ✅ Typing indicator (3 dots animation)
- ✅ Dark mode support
- ✅ Smooth animations
- ✅ Timestamp on messages
- ✅ Auto-scroll to latest message
- ✅ Responsive design

### Backend (chatController.js)
- ✅ POST /api/chat endpoint
- ✅ Loads cars.json data
- ✅ Sends data + query to Gemini AI
- ✅ AI responds ONLY from car data
- ✅ Handles missing information
- ✅ Error handling
- ✅ Hinglish responses

## 📊 Cars Database (cars.json)

10 cars included with fields:
- id
- name
- type (Sedan/SUV/Hatchback)
- price (Indian Rupees)
- mileage (kmpl)
- fuel (Petrol/Diesel)
- transmission (Manual/Automatic)
- year
- color

## 🔧 API Endpoint

**POST** `http://localhost:5001/api/chat`

Request:
```json
{
  "message": "Show me all SUVs"
}
```

Response:
```json
{
  "success": true,
  "response": "Here are the SUVs available..."
}
```

## 🎭 Customization

### Change Chatbot Position
In `Chatbot.jsx`, modify:
```jsx
className="fixed bottom-6 right-6"  // Change bottom/right values
```

### Change Colors
```jsx
className="bg-gradient-to-r from-blue-600 to-purple-600"  // Change colors
```

### Add More Cars
Edit `backend/data/cars.json` and add more car objects.

### Change AI Model
In `chatController.js`:
```javascript
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
// Change to 'gemini-1.5-pro' for better responses
```

## ⚠️ Troubleshooting

### Issue 1: "Chatbot me kuch problem hai"
- Check if GEMINI_API_KEY is set in .env
- Verify API key is valid
- Check backend console for errors

### Issue 2: Chatbot button not showing
- Check if Chatbot component is imported in App.jsx
- Check browser console for errors
- Verify frontend is running

### Issue 3: "Is car ki info available nahi hai"
- This is correct behavior for cars not in database
- Add more cars to cars.json if needed

### Issue 4: Backend not starting
- Check if port 5001 is available
- Run: `npm install` in backend folder
- Check MongoDB connection

## 🎉 Success Checklist

- [ ] Gemini API key added to .env
- [ ] Backend running on port 5001
- [ ] Frontend running on port 5173
- [ ] Floating robot icon visible
- [ ] Chat window opens on click
- [ ] Messages send successfully
- [ ] AI responds with car information
- [ ] Dark mode works
- [ ] Mobile responsive

## 📝 Notes

- Chatbot uses Gemini AI (free tier)
- Responses are in Hinglish (English + Hindi)
- Only answers from cars.json data
- Works in both light and dark mode
- Fully responsive on mobile

## 🚀 Next Steps

1. Add more cars to database
2. Add car images in responses
3. Add voice input/output
4. Add chat history persistence
5. Add user authentication for chat
6. Add analytics tracking

---

**Made with ❤️ for AutoMart**
