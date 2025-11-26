import User from '../models/User.js';
import Car from '../models/Car.js';

// Toggle car in wishlist (add if not present, remove if present)
export const toggleWishlist = async (req, res) => {
  try {
    const { carId } = req.body;
    const userId = req.user.id;

    if (!carId) {
      return res.status(400).json({ message: 'Car ID is required' });
    }

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if car is already in wishlist
    const carIndex = user.wishlist.indexOf(carId);
    
    if (carIndex > -1) {
      // Remove from wishlist
      user.wishlist.splice(carIndex, 1);
      await user.save();
      return res.status(200).json({ 
        message: 'Car removed from wishlist',
        inWishlist: false,
        wishlist: user.wishlist
      });
    } else {
      // Add to wishlist
      user.wishlist.push(carId);
      await user.save();
      return res.status(200).json({ 
        message: 'Car added to wishlist',
        inWishlist: true,
        wishlist: user.wishlist
      });
    }
  } catch (error) {
    console.error('Toggle wishlist error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;

    const user = await User.findById(userId).populate({
      path: 'wishlist',
      select: 'brand model year price mileage fuelType transmission images location createdAt'
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      count: user.wishlist.length,
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check if car is in wishlist
export const checkWishlist = async (req, res) => {
  try {
    const { carId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const inWishlist = user.wishlist.includes(carId);
    
    res.status(200).json({ inWishlist });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
