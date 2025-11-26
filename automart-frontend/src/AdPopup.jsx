import { X, Car, TrendingUp, Shield } from 'lucide-react';

export default function AdPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 rounded-3xl w-[90%] sm:w-[420px] md:w-[460px] shadow-2xl overflow-hidden animate-scale-in relative transition-all duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Decorative Lights */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16 blur-2xl"></div>

        {/* Content */}
        <div className="relative z-10 p-8 text-black flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-white bg-opacity-20 p-2 rounded-xl">
                <Car className="w-8 h-8 text-black text-blue-600" />
              </div>
              <span className="text-2xl font-semibold tracking-wide">CarDealing</span>
            </div>
            <h2 className="text-4xl font-bold mb-3 leading-tight drop-shadow-md">
              Find Your Dream Car Today!
            </h2>
            <p className="text-blue-50 text-base mb-6 leading-relaxed">
              Browse thousands of verified used cars at unbeatable prices
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 bg-black bg-opacity-15 p-3 rounded-xl backdrop-blur-sm hover:bg-opacity-25 transition">
              <div className="bg-white p-2 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white mb-0.5">Verified Sellers</h3>
                <p className="text-blue-50 text-sm">All sellers are verified for your safety</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-black bg-opacity-15 p-3 rounded-xl backdrop-blur-sm hover:bg-opacity-25 transition">
              <div className="bg-white p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white mb-0.5">Best Deals</h3>
                <p className="text-blue-50 text-sm">Get the best prices on quality cars</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-black bg-opacity-15 p-3 rounded-xl backdrop-blur-sm hover:bg-opacity-25 transition">
              <div className="bg-white p-2 rounded-lg">
                <Car className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white mb-0.5">Wide Selection</h3>
                <p className="text-blue-50 text-sm">Choose from hundreds of verified cars</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <button
              onClick={onClose}
              className="w-full bg-white text-blue-600 font-bold py-4 rounded-2xl transition-all transform hover:scale-105 shadow-xl text-lg hover:bg-blue-50"
            >
              Explore Now →
            </button>
            <p className="text-center text-blue-100 mt-3 text-sm">
              Start browsing our collection today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
