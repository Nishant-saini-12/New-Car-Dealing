# 🧪 Car API Testing Guide

## Quick Verification

### ✅ What Was Fixed

1. **Route Order** - Protected routes now come before `/:id` to avoid conflicts
2. **CORS** - Added multiple ports (5173, 5174, 5175) for frontend
3. **All files verified** - No diagnostic errors

---

## Testing Steps

### 1. Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output:**
```
🚀 Server running on port 5001
📍 Environment: development
✅ MongoDB Connected: localhost
```

### 2. Start Frontend Server

```bash
cd automart-frontend
npm run dev
```

**Expected Output:**
```
VITE v7.2.1  ready in XXX ms
➜  Local:   http://localhost:5174/
```

### 3. Test Car Creation

**Steps:**
1. Open browser: `http://localhost:5174`
2. Login to your account
3. Click "Sell Car" button (green)
4. Fill in the form:
   - Brand: Toyota
   - Model: Camry
   - Year: 2020
   - Price: 25000
   - Mileage: 30000
   - Fuel: Petrol
   - Location: Mumbai
   - Description: Well maintained car
5. Click "List My Car"

**Expected Result:**
- ✅ Shows "Submitting..." button
- ✅ Success message appears
- ✅ Redirects to Browse Cars after 3 seconds

### 4. Test Car Fetching

**Steps:**
1. Navigate to "Browse Cars"
2. Wait for loading spinner

**Expected Result:**
- ✅ Loading spinner appears
- ✅ Cars load from database
- ✅ Your newly added car appears in the list
- ✅ All car details are displayed correctly

---

## API Endpoints Test

### Test with cURL

#### 1. Create Car (Protected)

```bash
# First, login to get token
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "test123"
  }'

# Copy the token from response, then:
curl -X POST http://localhost:5001/api/cars \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "brand": "Honda",
    "model": "Civic",
    "year": 2021,
    "price": 22000,
    "mileage": 25000,
    "fuel": "Petrol",
    "location": "Delhi",
    "description": "Excellent condition, single owner"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Car listed successfully",
  "car": {
    "_id": "...",
    "brand": "Honda",
    "model": "Civic",
    "year": 2021,
    "price": 22000,
    "mileage": 25000,
    "fuel": "Petrol",
    "location": "Delhi",
    "description": "Excellent condition, single owner",
    "image": "https://...",
    "seller": "...",
    "sellerName": "...",
    "sellerEmail": "...",
    "sellerPhone": "...",
    "status": "available",
    "createdAt": "..."
  }
}
```

#### 2. Get All Cars (Public)

```bash
curl http://localhost:5001/api/cars
```

**Expected Response:**
```json
{
  "success": true,
  "count": 2,
  "cars": [
    {
      "_id": "...",
      "brand": "Honda",
      "model": "Civic",
      ...
    },
    {
      "_id": "...",
      "brand": "Toyota",
      "model": "Camry",
      ...
    }
  ]
}
```

#### 3. Get Single Car (Public)

```bash
curl http://localhost:5001/api/cars/CAR_ID_HERE
```

#### 4. Get My Cars (Protected)

```bash
curl http://localhost:5001/api/cars/user/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Troubleshooting

### Issue: CORS Error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Backend CORS is configured for ports 5173, 5174, 5175
- Check which port your frontend is running on
- Restart backend server after changes

### Issue: 401 Unauthorized

**Error:**
```
401 Unauthorized - Not authorized to access this route
```

**Solution:**
- Make sure you're logged in
- Check if token exists in localStorage
- Token might be expired - login again

### Issue: MongoDB Connection Error

**Error:**
```
MongoDB Connection Error: connect ECONNREFUSED
```

**Solution:**
```bash
# Windows
net start MongoDB

# Mac/Linux
brew services start mongodb-community
```

### Issue: Cars Not Appearing

**Possible Causes:**
1. Backend not running
2. MongoDB not connected
3. API URL mismatch
4. CORS issue

**Debug Steps:**
1. Check browser console for errors
2. Check backend logs
3. Verify MongoDB is running
4. Test API with cURL

---

## Verification Checklist

### Backend
- ✅ Server running on port 5001
- ✅ MongoDB connected
- ✅ Car routes registered at `/api/cars`
- ✅ CORS configured for frontend ports
- ✅ No errors in console

### Frontend
- ✅ Running on port 5174 (or 5173/5175)
- ✅ API URL points to `http://localhost:5001/api`
- ✅ carAPI functions defined
- ✅ SellCar calls `carAPI.createCar()`
- ✅ CarsPage calls `carAPI.getAllCars()`
- ✅ No errors in browser console

### Database
- ✅ MongoDB running
- ✅ Database: `cardealing`
- ✅ Collections: `users`, `cars`
- ✅ Cars have seller references

### Flow
- ✅ User can login
- ✅ User can access Sell Car page
- ✅ Form submits to `/api/cars`
- ✅ Car saves to MongoDB
- ✅ Success message shows
- ✅ Redirects to Browse Cars
- ✅ Browse Cars fetches from `/api/cars`
- ✅ New car appears in list

---

## Expected Behavior

### When Adding a Car:

```
1. User fills Sell Car form
2. Clicks "List My Car"
3. Frontend validates form
4. Calls POST /api/cars with JWT token
5. Backend verifies token
6. Backend saves car to MongoDB with seller info
7. Backend returns success response
8. Frontend shows success message
9. Frontend redirects to Browse Cars
10. Browse Cars fetches all cars
11. New car appears in the list
```

### When Viewing Cars:

```
1. User navigates to Browse Cars
2. Component mounts
3. Shows loading spinner
4. Calls GET /api/cars
5. Backend fetches all available cars from MongoDB
6. Backend returns cars array
7. Frontend updates state
8. Frontend displays cars
9. User can filter, search, sort
```

---

## Success Indicators

✅ **Backend Console:**
```
🚀 Server running on port 5001
📍 Environment: development
✅ MongoDB Connected: localhost
```

✅ **Frontend Console:**
```
Car listing created: {success: true, message: "Car listed successfully", car: {...}}
```

✅ **Browser:**
- No CORS errors
- No 401 errors
- Cars load successfully
- New cars appear immediately

✅ **MongoDB:**
```bash
# Check in MongoDB
use cardealing
db.cars.find().pretty()
```

Should show your cars with seller information.

---

## Quick Test Script

Run this in your browser console after logging in:

```javascript
// Test car creation
const testCar = {
  brand: 'Test Brand',
  model: 'Test Model',
  year: 2022,
  price: 20000,
  mileage: 10000,
  fuel: 'Petrol',
  location: 'Test City',
  description: 'Test description'
};

// Create car
fetch('http://localhost:5001/api/cars', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify(testCar)
})
.then(res => res.json())
.then(data => console.log('Create result:', data));

// Get all cars
fetch('http://localhost:5001/api/cars')
.then(res => res.json())
.then(data => console.log('All cars:', data));
```

---

## Summary

✅ **Routes Fixed** - Proper order to avoid conflicts  
✅ **CORS Fixed** - Multiple ports supported  
✅ **POST /api/cars** - Creates car with seller info  
✅ **GET /api/cars** - Fetches all cars  
✅ **Frontend** - Calls correct endpoints  
✅ **No Errors** - All diagnostics pass  

**Everything is ready to test! 🚀**
