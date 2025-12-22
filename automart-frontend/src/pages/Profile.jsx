import { useEffect, useState, useRef } from 'react';
import { User, Mail, Phone, Calendar, Edit2, Save, X, ArrowLeft, Shield, Heart, Eye, MessageSquare, Lock, LogOut, Car, TrendingUp, Award, CheckCircle, Sparkles, Gauge, Camera, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { wishlistAPI, carAPI, authAPI } from '../services/api';

export default function Profile({ onNavigate }) {
  const { user, loading, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [myCars, setMyCars] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      if (onNavigate) {
        onNavigate('login');
      }
      return;
    }

    // Initialize form data with user info
    if (user) {
      setFormData({
        name: user?.name || '',
        phone: user?.phone || ''
      });
      fetchUserData();
    }
  }, [user, loading]);

  const fetchUserData = async () => {
    try {
      setLoadingData(true);
      const [wishlistData, carsData] = await Promise.all([
        wishlistAPI.getWishlist().catch(() => ({ wishlist: [] })),
        carAPI.getMyCars().catch(() => ({ cars: [] }))
      ]);
      setWishlist(wishlistData.wishlist || []);
      setMyCars(carsData.cars || []);
    } catch (err) {
      console.error('Error fetching user data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const result = await updateProfile(formData);

    if (result.success) {
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setError(result.message);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user?.name || '',
        phone: user?.phone || ''
      });
    }
    setIsEditing(false);
    setError('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, PNG, or WebP)');
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload avatar
    try {
      setUploadingAvatar(true);
      setError('');
      setMessage('');

      const formData = new FormData();
      formData.append('avatar', file);

      const response = await authAPI.uploadAvatar(formData);

      if (response.success) {
        setMessage('Profile picture updated successfully!');
        // Update user context with new avatar
        if (response.user) {
          // Trigger a re-fetch of user data
          window.location.reload(); // Simple solution, or update context
        }
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error('Avatar upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload avatar');
      setAvatarPreview(null);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const getAvatarUrl = () => {
    if (avatarPreview) return avatarPreview;
    if (user?.avatar) return `http://localhost:5001${user.avatar}`;
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/20 border-t-blue-500 mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl animate-pulse"></div>
          </div>
          <p className="mt-6 text-gray-400 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto animate-fadeIn">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-all duration-300"
        >
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold">Back to Home</span>
        </button>

        {/* Hero Header Section */}
        <div className="relative mb-8 overflow-hidden rounded-3xl">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          
          <div className="relative px-8 py-16 sm:px-12 sm:py-20">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Avatar with Glow Ring */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 animate-pulse transition duration-1000"></div>
                <div className="relative bg-gray-900 p-1.5 rounded-full">
                  <div 
                    className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center shadow-2xl overflow-hidden cursor-pointer relative"
                    onClick={handleAvatarClick}
                  >
                    {getAvatarUrl() ? (
                      <img 
                        src={getAvatarUrl()} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                      {uploadingAvatar ? (
                        <>
                          <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-white mb-2"></div>
                          <span className="text-white text-xs font-semibold">Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-8 h-8 text-white mb-2" />
                          <span className="text-white text-xs font-semibold">Change Photo</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploadingAvatar}
                />
                
                {/* Verified Badge */}
                <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 shadow-lg border-4 border-gray-900">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {user?.name || 'User'}
                  </h1>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Verified {user?.role || 'User'}
                    </span>
                  </div>
                </div>
                <p className="text-blue-100 text-lg mb-4">Member since {formatDate(user?.createdAt)}</p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-white font-bold">{wishlist?.length || 0}</span>
                      <span className="text-blue-200 text-sm">Saved</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-bold">{myCars?.length || 0}</span>
                      <span className="text-blue-200 text-sm">Listed</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-white font-bold">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="group relative px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">Edit Profile</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {message && (
          <div className="mb-6 p-4 bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl animate-slideDown">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-400 font-semibold">{message}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-2xl animate-slideDown">
            <div className="flex items-center gap-3">
              <X className="w-5 h-5 text-red-400" />
              <p className="text-red-400 font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Details */}
            {isEditing ? (
              // Edit Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-blue-400" />
                    Edit Profile Information
                  </h3>

                  {/* Name Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>

                  {/* Email (Read-only) */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-xl cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Email cannot be changed
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-xl font-semibold transition-all"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              // View Mode - Glassmorphism Cards
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  Profile Information
                </h3>

                {/* Name Card */}
                <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">Full Name</p>
                      <p className="text-lg font-bold text-white">{user?.name || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg group-hover:shadow-green-500/50 transition-shadow">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">Email Address</p>
                      <p className="text-lg font-bold text-white break-all">{user?.email || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">Phone Number</p>
                      <p className="text-lg font-bold text-white">{user?.phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Join Date Card */}
                <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl shadow-lg group-hover:shadow-orange-500/50 transition-shadow">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">Member Since</p>
                      <p className="text-lg font-bold text-white">
                        {formatDate(user?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            {/* Account Security Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Account Security
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group">
                  <Lock className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors font-medium">Change Password</span>
                </button>
                <button 
                  onClick={() => {
                    logout();
                    onNavigate('home');
                  }}
                  className="w-full flex items-center gap-3 p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition-all group"
                >
                  <LogOut className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium">Logout</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Your Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Saved Cars</span>
                  <span className="text-2xl font-bold text-white">{wishlist?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Listed Cars</span>
                  <span className="text-2xl font-bold text-white">{myCars?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Account Status</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-bold">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Saved Cars Section */}
        {wishlist && wishlist.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Heart className="w-7 h-7 text-red-400 fill-red-400" />
                My Saved Cars
              </h2>
              <button 
                onClick={() => onNavigate && onNavigate('wishlist')}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.slice(0, 3).map((car) => car && (
                <div
                  key={car._id}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  onClick={() => onNavigate && onNavigate('car-details', car?._id)}
                >
                  <div className="relative h-48 bg-gray-800 overflow-hidden">
                    <img
                      src={car?.images?.[0] || car?.image || '/placeholder-car.jpg'}
                      alt={`${car?.brand || 'Car'} ${car?.model || ''}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {car?.brand || 'Unknown'} {car?.model || ''}
                    </h3>
                    <p className="text-2xl font-black text-blue-400 mb-3">
                      ${car?.price?.toLocaleString() || '0'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {car?.year || 'N/A'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Gauge className="w-4 h-4" />
                        {car?.mileage?.toLocaleString() || '0'} km
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Listed Cars Section */}
        {myCars && myCars.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Car className="w-7 h-7 text-blue-400" />
                My Listed Cars
              </h2>
              <button 
                onClick={() => onNavigate && onNavigate('sell-car')}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Manage Listings →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCars.slice(0, 3).map((car) => car && (
                <div
                  key={car._id}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  onClick={() => onNavigate && onNavigate('car-details', car?._id)}
                >
                  <div className="relative h-48 bg-gray-800 overflow-hidden">
                    <img
                      src={car?.images?.[0] || car?.image || '/placeholder-car.jpg'}
                      alt={`${car?.brand || 'Car'} ${car?.model || ''}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full">
                      <span className="text-xs font-bold text-white">Active</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {car?.brand || 'Unknown'} {car?.model || ''}
                    </h3>
                    <p className="text-2xl font-black text-blue-400 mb-3">
                      ${car?.price?.toLocaleString() || '0'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {car?.views || 0} views
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {car?.enquiries || 0} enquiries
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!wishlist || wishlist.length === 0) && (!myCars || myCars.length === 0) && !loadingData && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Start Your Journey</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Browse our collection of premium cars and save your favorites, or list your own car for sale.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onNavigate && onNavigate('cars')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                Browse Cars
              </button>
              <button
                onClick={() => onNavigate && onNavigate('sell-car')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold transition-all"
              >
                Sell Your Car
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
