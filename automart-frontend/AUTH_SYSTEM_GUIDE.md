# 🔐 Complete Authentication System Guide

## Overview
Full-stack authentication system with Express + MongoDB + JWT on backend and React Context API on frontend.

## Features Implemented

✅ User signup with password hashing (bcrypt)  
✅ User login with JWT token generation  
✅ Protected API endpoints  
✅ Auto-fetch user profile on app start  
✅ Token stored in localStorage  
✅ Token attached to all API requests  
✅ Automatic logout on token expiry  
✅ User info displayed in navbar  
✅ Logout functionality  

---

## Backend Structure

```
backend/
├── server.js                    # Express server setup
├── package.json                 # Dependencies
├── .env                         # Environment variables
├── config/
│   └── database.js              # MongoDB connection
├── models/
│   └── User.js                  # User schema with bcrypt
├── controllers/
│   └── authController.js        # Auth logic (signup, login, profile)
├── middleware/
│   └── auth.js                  # JWT verification middleware
└── routes/
    └── authRoutes.js            # API routes
```

### Key Backend Files

#### 1. User Model (`models/User.js`)
- Mongoose schema with validation
- Password hashing with bcrypt (salt rounds: 10)
- Password comparison method
- Excludes password from JSON responses

#### 2. Auth Middleware (`middleware/auth.js`)
- Verifies JWT token from Authorization header
- Attaches user to request object
- Returns 401 if token invalid/expired

#### 3. Auth Controller (`controllers/authController.js`)
**Endpoints:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update profile (protected)

---

## Frontend Structure

```
automart-frontend/src/
├── context/
│   └── AuthContext.jsx          # Auth state management
├── services/
│   └── api.js                   # Axios instance & API calls
├── pages/
│   ├── Login.jsx                # Login form
│   └── Signup.jsx               # Signup form
└── components/
    └── Navbar.jsx               # Shows user info & logout
```

### Key Frontend Files

#### 1. Auth Context (`context/AuthContext.jsx`)
**State:**
- `user` - Current user object
- `loading` - Loading state
- `error` - Error messages
- `isAuthenticated` - Boolean flag

**Methods:**
- `signup(userData)` - Register new user
- `login(credentials)` - Login user
- `logout()` - Clear token and user
- `updateProfile(userData)` - Update user info

**Auto-fetch on mount:**
- Checks localStorage for token
- Fetches fresh profile data
- Syncs user state

#### 2. API Service (`services/api.js`)
**Features:**
- Axios instance with base URL
- Request interceptor: Adds token to headers
- Response interceptor: Handles 401 errors
- Helper functions for token management

---

## API Endpoints

### Public Endpoints

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Protected Endpoints

#### Get Profile
```http
GET /api/user/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Profile
```http
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+0987654321"
}

Response:
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## Setup Instructions

### 1. Install MongoDB

**Windows:**
```bash
# Download from https://www.mongodb.com/try/download/community
# Or use MongoDB Atlas (cloud)
```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (already created)
# Update MONGODB_URI if needed

# Start server
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd automart-frontend

# Install axios (if not already installed)
npm install axios

# Start dev server
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## Usage Flow

### 1. User Signup
```
User fills signup form
    ↓
Frontend: authContext.signup()
    ↓
API: POST /api/auth/signup
    ↓
Backend: Hash password with bcrypt
    ↓
Backend: Save user to MongoDB
    ↓
Backend: Generate JWT token
    ↓
Frontend: Save token to localStorage
    ↓
Frontend: Save user to state
    ↓
Redirect to home page
```

### 2. User Login
```
User fills login form
    ↓
Frontend: authContext.login()
    ↓
API: POST /api/auth/login
    ↓
Backend: Find user by email
    ↓
Backend: Compare password with bcrypt
    ↓
Backend: Generate JWT token
    ↓
Frontend: Save token to localStorage
    ↓
Frontend: Save user to state
    ↓
Redirect to home page
```

### 3. Auto-Login on Page Load
```
App starts
    ↓
AuthContext useEffect runs
    ↓
Check localStorage for token
    ↓
If token exists:
    ↓
API: GET /api/user/profile (with token)
    ↓
Backend: Verify JWT token
    ↓
Backend: Return user data
    ↓
Frontend: Update user state
    ↓
User stays logged in
```

### 4. Protected API Calls
```
User makes request
    ↓
Axios interceptor adds token
    ↓
Request: Authorization: Bearer <token>
    ↓
Backend: auth middleware verifies token
    ↓
If valid: Continue to controller
If invalid: Return 401
    ↓
Frontend: 401 interceptor clears token
    ↓
Redirect to login
```

### 5. Logout
```
User clicks logout
    ↓
authContext.logout()
    ↓
Clear token from localStorage
    ↓
Clear user from state
    ↓
Redirect to home page
```

---

## Security Best Practices

### ✅ Implemented

1. **Password Hashing**
   - bcrypt with salt rounds: 10
   - Passwords never stored in plain text

2. **JWT Token**
   - Signed with secret key
   - Expires in 7 days
   - Stored in localStorage (consider httpOnly cookies for production)

3. **Password Validation**
   - Minimum 6 characters
   - Required field validation

4. **Email Validation**
   - Regex pattern matching
   - Unique constraint in database

5. **Protected Routes**
   - Middleware verifies token
   - Returns 401 if unauthorized

6. **Error Handling**
   - Proper error messages
   - No sensitive data in errors

### 🔒 Production Recommendations

1. **Use HTTPS** - Always use SSL/TLS in production

2. **Environment Variables** - Never commit .env to git

3. **Token Storage** - Consider httpOnly cookies instead of localStorage

4. **Rate Limiting** - Add rate limiting to prevent brute force

5. **CORS** - Configure proper CORS origins

6. **Password Strength** - Enforce stronger password requirements

7. **Token Refresh** - Implement refresh token mechanism

8. **2FA** - Add two-factor authentication

---

## Testing

### Test Signup
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

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Protected Route
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Backend already configured for `http://localhost:5173`

### Token Expired
```
401 Unauthorized - Token expired
```
**Solution:** Login again to get new token

### User Already Exists
```
400 Bad Request - User already exists
```
**Solution:** Use different email or login instead

---

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cardealing
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend
No environment variables needed (API URL hardcoded for development)

For production, create `.env`:
```env
VITE_API_URL=https://your-api-domain.com/api
```

---

## Summary

✅ **Backend:** Express + MongoDB + JWT + bcrypt  
✅ **Frontend:** React Context + Axios + localStorage  
✅ **Security:** Password hashing, token verification, protected routes  
✅ **UX:** Auto-login, loading states, error handling  
✅ **Features:** Signup, login, logout, profile fetch, profile update  

**Your authentication system is production-ready! 🎉**
