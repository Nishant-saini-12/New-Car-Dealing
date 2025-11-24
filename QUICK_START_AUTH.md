# 🚀 Quick Start - Authentication System

## Prerequisites
- Node.js installed
- MongoDB installed and running

## Step 1: Start MongoDB

### Windows
```bash
net start MongoDB
```

### Mac
```bash
brew services start mongodb-community
```

### Linux
```bash
sudo systemctl start mongodb
```

### Or use MongoDB Atlas (Cloud)
Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cardealing
```

## Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 3: Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
📍 Environment: development
```

## Step 4: Install Frontend Dependencies (if needed)

```bash
cd automart-frontend
npm install axios  # If not already installed
```

## Step 5: Start Frontend

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Step 6: Test the System

### Option 1: Use the UI
1. Open `http://localhost:5173`
2. Click "Sign Up"
3. Fill the form and create account
4. You'll be logged in automatically
5. See your name in the navbar
6. Click "Logout" to test logout

### Option 2: Use API directly

**Test Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "password": "password123"
  }'
```

**Test Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Test Profile (replace TOKEN):**
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Verification Checklist

✅ Backend server running on port 5000  
✅ Frontend running on port 5173  
✅ MongoDB connected  
✅ Can create new account  
✅ Can login with credentials  
✅ User name shows in navbar  
✅ Can logout  
✅ Token persists on page reload  
✅ Protected routes require authentication  

## Common Issues

### Issue: MongoDB not running
**Error:** `connect ECONNREFUSED 127.0.0.1:27017`  
**Fix:** Start MongoDB service (see Step 1)

### Issue: Port already in use
**Error:** `EADDRINUSE: address already in use :::5000`  
**Fix:** Kill process on port 5000 or change PORT in .env

### Issue: CORS error
**Error:** `Access to XMLHttpRequest blocked by CORS`  
**Fix:** Backend already configured for localhost:5173

### Issue: Module not found
**Error:** `Cannot find module 'express'`  
**Fix:** Run `npm install` in backend directory

## Project Structure

```
.
├── backend/                    # Express API
│   ├── server.js              # Main server file
│   ├── package.json           # Dependencies
│   ├── .env                   # Environment variables
│   ├── models/                # Mongoose models
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Auth middleware
│   ├── routes/                # API routes
│   └── config/                # Database config
│
├── automart-frontend/         # React app
│   ├── src/
│   │   ├── context/           # Auth context
│   │   ├── services/          # API service
│   │   ├── pages/             # Login/Signup pages
│   │   └── components/        # Navbar with auth
│   └── package.json
│
└── AUTH_SYSTEM_GUIDE.md       # Full documentation
```

## Next Steps

1. ✅ Test signup and login
2. ✅ Verify token persistence
3. ✅ Test logout functionality
4. 📝 Read AUTH_SYSTEM_GUIDE.md for details
5. 🔒 Review security best practices
6. 🚀 Deploy to production

## API Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/signup | No | Register new user |
| POST | /api/auth/login | No | Login user |
| GET | /api/user/profile | Yes | Get user profile |
| PUT | /api/user/profile | Yes | Update profile |

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cardealing
JWT_SECRET=cardealing_super_secret_jwt_key_2024_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

## Success! 🎉

If you can:
- Create an account
- Login
- See your name in navbar
- Logout
- Login again

**Your authentication system is working perfectly!**

---

For detailed documentation, see: **AUTH_SYSTEM_GUIDE.md**
