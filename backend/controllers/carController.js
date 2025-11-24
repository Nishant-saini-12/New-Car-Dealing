import Car from '../models/Car.js';

// @desc    Create new car listing
// @route   POST /api/cars
// @access  Private
export const createCar = async (req, res) => {
  try {
    console.log('🚗 POST /api/cars hit!');
    console.log('📦 Request body:', req.body);
    console.log('👤 User:', req.user?.name, req.user?.email);
    
    const { brand, model, year, price, mileage, fuel, location, description, imageUrl } = req.body;

    // Validate required fields
    if (!brand || !model || !year || !price || !mileage || !fuel || !location || !description) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create car with seller info from authenticated user
    console.log('✅ Validation passed, creating car...');
    const car = await Car.create({
      brand,
      model,
      year,
      price,
      mileage,
      fuel,
      location,
      description,
      image: imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600',
      seller: req.user._id,
      sellerName: req.user.name,
      sellerEmail: req.user.email,
      sellerPhone: req.user.phone
    });

    console.log('✅ Car created successfully:', car._id);
    res.status(201).json({
      success: true,
      message: 'Car listed successfully',
      car
    });
  } catch (error) {
    console.error('❌ Create car error:', error);
    console.error('Error details:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Error creating car listing',
      error: error.message
    });
  }
};

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({ status: 'available' })
      .sort({ createdAt: -1 })
      .populate('seller', 'name email phone');

    res.status(200).json({
      success: true,
      count: cars.length,
      cars
    });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cars',
      error: error.message
    });
  }
};

// @desc    Get single car by ID
// @route   GET /api/cars/:id
// @access  Public
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('seller', 'name email phone');

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      car
    });
  } catch (error) {
    console.error('Get car error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching car',
      error: error.message
    });
  }
};

// @desc    Get cars by user
// @route   GET /api/cars/user/me
// @access  Private
export const getMyCars = async (req, res) => {
  try {
    const cars = await Car.find({ seller: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cars.length,
      cars
    });
  } catch (error) {
    console.error('Get my cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching your cars',
      error: error.message
    });
  }
};

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private
export const updateCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Check if user is the seller
    if (car.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this car'
      });
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      car
    });
  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating car',
      error: error.message
    });
  }
};

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Check if user is the seller
    if (car.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this car'
      });
    }

    await car.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting car',
      error: error.message
    });
  }
};
