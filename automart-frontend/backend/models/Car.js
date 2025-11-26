import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Please provide car brand'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please provide car model'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please provide year'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: [0, 'Price must be positive']
  },
  mileage: {
    type: Number,
    required: [true, 'Please provide mileage'],
    min: [0, 'Mileage must be positive']
  },
  fuel: {
    type: String,
    required: [true, 'Please provide fuel type'],
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    trim: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sellerName: {
    type: String,
    required: true
  },
  sellerEmail: {
    type: String,
    required: true
  },
  sellerPhone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
carSchema.index({ brand: 1, model: 1 });
carSchema.index({ price: 1 });
carSchema.index({ year: -1 });
carSchema.index({ seller: 1 });

export default mongoose.model('Car', carSchema);
