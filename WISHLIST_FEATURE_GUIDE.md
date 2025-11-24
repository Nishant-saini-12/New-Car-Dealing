# Wishlist (Save for Later) Feature Guide

## Overview
The Wishlist feature allows authenticated users to save cars they're interested in for later viewing. Users can add/remove cars from their wishlist and view all saved cars in a dedicated page.

## Backend Implementation

### 1. User Model Update
**File:** `backend/models/User.js`

Added wishlist field to store car references:
```javascript
wishlist: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Car'
}]
```

### 2. Wishlist Controller
**File:** `backend/controllers/wishlistController.js`

Three main functions:
- `toggleWishlist`: Add/remove car from wishlist
- `getWishlist`: Get user's wishlist with populated car details
- `checkWishlist`: Check if a specific car is in wishlist

### 3. Wishlist Routes
**File:** `backend/routes/wishlistRoutes.js`

Protected routes (require authentication):
- `POST /api/wishlist/toggle` - Toggle car in wishlist
- `GET /api/wishlist` - Get current user's wishlist
- `GET /api/wishlist/user/:id` - Get specific user's wishlist
- `GET /api/wishlist/check/:carId` - Check if car is in wishlist

### 4. Server Configuration
**File:** `backend/server.js`

Added wishlist routes:
```javascript
app.use('/api/wishlist', wishlistRoutes);
```

## Frontend Implementation

### 1. API Service
**File:** `automart-frontend/src/services/api.js`

Added `wishlistAPI` with three methods:
- `toggleWishlist(carId)` - Add/remove from wishlist
- `getWishlist(userId)` - Fetch wishlist
- `checkWishlist(carId)` - Check wishlist status

### 2. Wishlist Page
**File:** `automart-frontend/src/pages/Wishlist.jsx`

Features:
- Displays all saved cars in a grid layout
- Shows car details (price, year, mileage, fuel type, transmission, location)
- Remove from wishlist button (trash icon)
- View details button for each car
- Empty state with link to browse cars
- Dark mode support

### 3. Navigation Updates
**File:** `automart-frontend/src/components/Navbar.jsx`

Added:
- Heart icon button in desktop nav (for authenticated users)
- "My Wishlist" button in mobile menu
- Routes to wishlist page

### 4. App Routing
**File:** `automart-frontend/src/App.jsx`

Added:
- Import for Wishlist component
- Route handling for 'wishlist' page

### 5. CarsPage Integration
**File:** `automart-frontend/src/components/CarsPage.jsx`

Added:
- Heart icon on each car card (top-left corner)
- Toggle wishlist functionality
- Visual feedback (filled red heart for saved cars)
- Fetches user's wishlist on mount
- Only shows heart icon for authenticated users

### 6. CarDetails Integration
**File:** `automart-frontend/src/pages/CarDetails.jsx`

Added:
- Heart button on main car image
- Checks if car is in wishlist on load
- Toggle wishlist functionality
- Only shows for authenticated users

## User Flow

### Adding to Wishlist
1. User must be logged in
2. Click heart icon on any car card or details page
3. Heart fills with red color to indicate saved
4. Car is added to user's wishlist in database

### Removing from Wishlist
1. Click filled heart icon on car card/details page, OR
2. Click trash icon on wishlist page
3. Heart becomes outline (unfilled)
4. Car is removed from wishlist

### Viewing Wishlist
1. Click heart icon in navbar (desktop) or "My Wishlist" in mobile menu
2. See all saved cars in grid layout
3. Click "View Details" to see full car information
4. Click trash icon to remove from wishlist

## Authentication Requirements
- All wishlist features require user authentication
- Non-authenticated users see no heart icons
- Attempting to use wishlist features without auth shows alert

## API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/wishlist/toggle` | Add/remove car from wishlist | Yes |
| GET | `/api/wishlist` | Get current user's wishlist | Yes |
| GET | `/api/wishlist/user/:id` | Get specific user's wishlist | Yes |
| GET | `/api/wishlist/check/:carId` | Check if car is in wishlist | Yes |

## Testing the Feature

1. **Start the backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend:**
   ```bash
   cd automart-frontend
   npm run dev
   ```

3. **Test flow:**
   - Login with your account
   - Browse cars and click heart icons to save
   - Click heart icon in navbar to view wishlist
   - Remove cars from wishlist
   - Verify heart icons update correctly

## Features
✅ Toggle cars in/out of wishlist
✅ Dedicated wishlist page
✅ Heart icon on car cards
✅ Heart icon on car details page
✅ Visual feedback (filled/unfilled heart)
✅ Authentication required
✅ Dark mode support
✅ Mobile responsive
✅ Empty state handling
✅ Real-time updates

## Notes
- Wishlist is stored in MongoDB and persists across sessions
- Each user has their own wishlist
- Wishlist items are populated with full car details when fetched
- Heart icons only appear for authenticated users
- Clicking heart on car card doesn't navigate to details page
