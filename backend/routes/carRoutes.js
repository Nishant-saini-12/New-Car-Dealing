import express from 'express';
import {
  createCar,
  getAllCars,
  getCarById,
  getMyCars,
  updateCar,
  deleteCar
} from '../controllers/carController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (must come before /:id to avoid conflicts)
router.post('/', protect, createCar);
router.get('/user/me', protect, getMyCars);
router.put('/:id', protect, updateCar);
router.delete('/:id', protect, deleteCar);

// Public routes
router.get('/', getAllCars);
router.get('/:id', getCarById);

export default router;
