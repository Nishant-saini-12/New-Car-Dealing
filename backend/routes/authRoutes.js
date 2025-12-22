import express from 'express';
import { signup, login, getProfile, updateProfile, uploadAvatar } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/me', protect, getProfile); // Alias for profile
router.post('/upload-avatar', protect, upload.single('avatar'), uploadAvatar);

export default router;

