import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">CarDealing</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted marketplace for quality used cars at reasonable prices.
            </p>
            <div className="flex gap-4">
              <div className="bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="bg-blue-400 p-2 rounded-full cursor-pointer hover:bg-blue-500">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="bg-pink-600 p-2 rounded-full cursor-pointer hover:bg-pink-700">
                <Instagram className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-white">Home</button></li>
              <li><button onClick={() => setCurrentPage('cars')} className="text-gray-400 hover:text-white">Browse Cars</button></li>
              <li><button onClick={() => setCurrentPage('services')} className="text-gray-400 hover:text-white">Services</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-white">About Us</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">Buy a Car</li>
              <li className="hover:text-white cursor-pointer">Sell Your Car</li>
              <li className="hover:text-white cursor-pointer">Car Inspection</li>
              <li className="hover:text-white cursor-pointer">Financing</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@cardealing.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Car Street, Auto City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CarDealing. All rights reserved. Made with ❤️ for car enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
}
