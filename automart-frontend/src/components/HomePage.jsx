import { Shield, Award, Clock, DollarSign, Car } from 'lucide-react';

export default function HomePage({ setCurrentPage }) {
  const cars = [
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2018, price: 15500, mileage: 45000, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600' },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2019, price: 17800, mileage: 32000, image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600' },
    { id: 3, brand: 'Ford', model: 'Focus', year: 2017, price: 12300, mileage: 58000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Find Your Perfect Car</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Browse thousands of quality used cars at reasonable prices
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Verified Sellers</h3>
              <p className="text-gray-600 dark:text-gray-400">All sellers are verified for your safety</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Quality Cars</h3>
              <p className="text-gray-600 dark:text-gray-400">Inspected and certified vehicles</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Best Prices</h3>
              <p className="text-gray-600 dark:text-gray-400">Competitive and fair pricing</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400">Always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Cars</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Check out our latest listings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cars.map(car => (
              <div key={car.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Year: {car.year} | {car.mileage.toLocaleString()} miles</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">${car.price.toLocaleString()}</span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('cars')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 text-lg"
            >
              View All Cars
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Sell Your Car?</h2>
          <p className="text-xl mb-8 text-blue-100">List your car in minutes and reach thousands of buyers</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 text-lg">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}
