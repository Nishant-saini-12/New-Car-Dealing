import express from 'express';
import { toggleWishlist, getWishlist, checkWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Toggle car in wishlist
router.post('/toggle', toggleWishlist);

// Get user's wishlist
router.get('/user/:id', getWishlist);
router.get('/', getWishlist); // Get current user's wishlist

// Check if car is in wishlist
router.get('/check/:carId', checkWishlist);

export default router;
