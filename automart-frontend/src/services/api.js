import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },

  uploadAvatar: async (formData) => {
    const response = await api.post('/user/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

// Car API calls
export const carAPI = {
  getAllCars: async () => {
    const response = await api.get('/cars');
    return response.data;
  },

  getCarById: async (id) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },

  createCar: async (carData) => {
    const response = await api.post('/cars', carData);
    return response.data;
  },

  getMyCars: async () => {
    const response = await api.get('/cars/user/me');
    return response.data;
  },

  updateCar: async (id, carData) => {
    const response = await api.put(`/cars/${id}`, carData);
    return response.data;
  },

  deleteCar: async (id) => {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  }
};

// Wishlist API calls
export const wishlistAPI = {
  toggleWishlist: async (carId) => {
    const response = await api.post('/wishlist/toggle', { carId });
    return response.data;
  },

  getWishlist: async (userId) => {
    const url = userId ? `/wishlist/user/${userId}` : '/wishlist';
    const response = await api.get(url);
    return response.data;
  },

  checkWishlist: async (carId) => {
    const response = await api.get(`/wishlist/check/${carId}`);
    return response.data;
  }
};

// Helper functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export default api;
