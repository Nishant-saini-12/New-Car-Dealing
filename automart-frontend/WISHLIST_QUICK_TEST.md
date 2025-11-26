# Wishlist Feature - Quick Test Guide

## 🚀 Quick Start

### 1. Start Backend
```bash
cd backend
npm start
```
Wait for: `🚀 Server running on port 5001`

### 2. Start Frontend
```bash
cd automart-frontend
npm run dev
```
Open: `http://localhost:5173`

### 3. Test Backend APIs (Optional)
```bash
cd backend
node test-wishlist.js
```

## ✅ Quick Test Flow (2 minutes)

### Test 1: Login (10 seconds)
1. Click "Login" button
2. Enter your credentials
3. Click "Login"
4. ✅ Should redirect to home page

### Test 2: Add to Wishlist from Cars Page (20 seconds)
1. Click "Browse Cars" in navbar
2. Find any car card
3. Click the **heart icon** (top-left of car image)
4. ✅ Heart should turn **RED** and **FILLED**
5. Click heart again
6. ✅ Heart should become **OUTLINE** (not filled)
7. Click heart one more time to add it back

### Test 3: View Wishlist Page (15 seconds)
1. Click the **heart icon** in navbar (desktop) or "My Wishlist" (mobile)
2. ✅ Should see wishlist page (NOT white screen)
3. ✅ Should see the car you just saved
4. ✅ Should show car details: price, year, mileage, etc.

### Test 4: Remove from Wishlist (10 seconds)
1. On wishlist page, click the **trash icon** on any car
2. ✅ Car should disappear immediately
3. ✅ If no cars left, should show "Your wishlist is empty"

### Test 5: Add from Car Details (20 seconds)
1. Click "Back to Cars" or navigate to cars page
2. Click on any car card (not the heart, click the card itself)
3. Should open car details page
4. Click the **heart button** (top-right of main image)
5. ✅ Heart should turn **RED** and **FILLED**

### Test 6: View Details from Wishlist (15 seconds)
1. Navigate to wishlist page (heart icon in navbar)
2. Click "View Details" button on any car
3. ✅ Should navigate to car details page
4. ✅ Heart button should be **RED** and **FILLED**

### Test 7: Toggle from Details Page (10 seconds)
1. On car details page, click the heart button
2. ✅ Heart should become **OUTLINE** (removed from wishlist)
3. Click heart again
4. ✅ Heart should become **RED** and **FILLED** (added back)

## 🎯 Expected Results

### ✅ All Working:
- No white screens
- Heart icons update instantly
- Wishlist page shows all saved cars
- Can add/remove from multiple places
- Navigation works smoothly
- No console errors

### ❌ If Something Fails:

**White Screen on Wishlist:**
- Check browser console (F12)
- Look for error messages
- Verify you're logged in

**Heart Icon Doesn't Update:**
- Check network tab for API errors
- Verify backend is running
- Check authentication token

**API Errors:**
- Verify MongoDB is running
- Check backend console for errors
- Run `node test-wishlist.js` to test APIs

## 🔧 Quick Fixes

### Backend Not Starting:
```bash
# Check if MongoDB is running
# Windows: Check Services
# Mac/Linux: sudo systemctl status mongod

# Restart backend
cd backend
npm start
```

### Frontend Not Starting:
```bash
cd automart-frontend
npm install
npm run dev
```

### Clear Cache:
```bash
# Clear browser cache
# Or use Incognito/Private mode
```

## 📊 Test Checklist

- [ ] Backend running on port 5001
- [ ] Frontend running on port 5173
- [ ] Can login successfully
- [ ] Heart icon appears on car cards (when logged in)
- [ ] Heart icon toggles (outline ↔ filled)
- [ ] Wishlist page loads (no white screen)
- [ ] Can view saved cars in wishlist
- [ ] Can remove cars from wishlist
- [ ] Can add from car details page
- [ ] Can navigate from wishlist to car details
- [ ] Heart state persists across pages
- [ ] No console errors

## 🎉 Success Criteria

All checkboxes above should be checked ✅

If any fail, check `WISHLIST_DEBUG_GUIDE.md` for detailed troubleshooting.
