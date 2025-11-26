import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setAuthToken, removeAuthToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage and fetch profile on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          // Parse saved user
          setUser(JSON.parse(savedUser));
          
          // Fetch fresh profile data
          const response = await authAPI.getProfile();
          setUser(response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        } catch (err) {
          console.error('Failed to fetch profile:', err);
          // Clear invalid token
          removeAuthToken();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Signup function
  const signup = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.signup(userData);
      
      // Save token and user
      setAuthToken(response.token);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setLoading(false);
      return { success: true, message: response.message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      setLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.login(credentials);
      
      // Save token and user
      setAuthToken(response.token);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setLoading(false);
      return { success: true, message: response.message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      setLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    removeAuthToken();
    setUser(null);
    setError(null);
  };

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.updateProfile(userData);
      
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return { success: true, message: response.message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Update failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
