import { useState, useEffect } from 'react';
import { Search, Plus, MapPin, Gauge, Calendar, Fuel, ArrowUpDown, Car, Heart } from 'lucide-react';
import SellCarModal from './SellCarModal';
import { carAPI, wishlistAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CarsPage({ onCarClick }) {
  const { isAuthenticated } = useAuth();
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showSellModal, setShowSellModal] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);

  const brands = ['Maruti', 'Hyundai', 'Honda', 'Tata', 'Toyota', 'Ford'];
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad'];

  // Fetch cars from API on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await carAPI.getAllCars();
        setAllCars(response.cars || []);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setAllCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Fetch wishlist if user is authenticated
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated) {
        try {
          const data = await wishlistAPI.getWishlist();
          setWishlistIds(data.wishlist.map(car => car._id));
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      }
    };

    fetchWishlist();
  }, [isAuthenticated]);

  const handleToggleWishlist = async (e, carId) => {
    e.stopPropagation(); // Prevent card click
    
    if (!isAuthenticated) {
      alert('Please login to add cars to wishlist');
      return;
    }

    try {
      const response = await wishlistAPI.toggleWishlist(carId);
      if (response.inWishlist) {
        setWishlistIds([...wishlistIds, carId]);
      } else {
        setWishlistIds(wishlistIds.filter(id => id !== carId));
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredCars = allCars.filter(car => {
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
    const priceMatch = car.price >= priceRange[0] && car.price <= priceRange[1];
    const yearMatch = selectedYear === 'all' ||
      (selectedYear === 'under3' && new Date().getFullYear() - car.year <= 3) ||
      (selectedYear === 'under5' && new Date().getFullYear() - car.year <= 5) ||
      (selectedYear === 'under10' && new Date().getFullYear() - car.year <= 10);
    const locationMatch = selectedLocation === 'all' || car.location === selectedLocation;
    const searchMatch = searchQuery === '' || 
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    return brandMatch && priceMatch && yearMatch && locationMatch && searchMatch;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === 'newest') return b.year - a.year;
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    return 0;
  });

  // Show loading state
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Used Cars for Sale</h1>
            <button
              onClick={() => setShowSellModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md"
            >
              <Plus className="w-5 h-5" />
              Sell Your Car
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-white shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Filters</h2>
              
              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Brand</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Year Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Year</h3>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                >
                  <option value="all">All Years</option>
                  <option value="under3">Under 3 years</option>
                  <option value="under5">Under 5 years</option>
                  <option value="under10">Under 10 years</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Location</h3>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                >
                  <option value="all">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setPriceRange([0, 50000]);
                  setSelectedYear('all');
                  setSelectedLocation('all');
                  setSearchQuery('');
                }}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="flex-1">
            {/* Results Count and Sort */}
            <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="text-gray-700 dark:text-gray-300 font-semibold">
                {sortedCars.length} cars found
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                >
                  <option value="newest">Newest First</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCars.map(car => (
                <div 
                  key={car._id || car.id} 
                  onClick={() => onCarClick(car._id || car.id)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative">
                    <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-semibold dark:text-white">
                      {car.year}
                    </div>
                    {isAuthenticated && (
                      <button
                        onClick={(e) => handleToggleWishlist(e, car._id || car.id)}
                        className="absolute top-2 left-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            wishlistIds.includes(car._id || car.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      ${car.price.toLocaleString()}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {car.brand} {car.model}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span>{car.mileage.toLocaleString()} km</span>
                      <span>•</span>
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{car.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {sortedCars.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Car className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-xl text-gray-500 dark:text-gray-400">No cars found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showSellModal && <SellCarModal onClose={() => setShowSellModal(false)} />}
    </div>
  );
}
