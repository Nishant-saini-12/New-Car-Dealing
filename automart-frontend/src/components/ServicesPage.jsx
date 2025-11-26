import { Search, Plus, Award, Clock, FileCheck, CreditCard, TrendingUp, Wrench, Headphones, MapPin } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <Search className="w-12 h-12" />,
      title: 'Car Search & Browse',
      description: 'Browse through our extensive collection of quality used cars with advanced search filters.',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      icon: <Plus className="w-12 h-12" />,
      title: 'List Your Car',
      description: 'Easily list your car for sale with our simple and intuitive listing process.',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      icon: <FileCheck className="w-12 h-12" />,
      title: 'Vehicle Inspection',
      description: 'Professional vehicle inspection services to ensure quality and transparency.',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      icon: <CreditCard className="w-12 h-12" />,
      title: 'Financing Options',
      description: 'Flexible financing solutions to help you purchase your dream car.',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Price Valuation',
      description: 'Get accurate market value estimates for your vehicle with our AI-powered tool.',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600'
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: 'Maintenance Support',
      description: 'Access to trusted mechanics and service centers for vehicle maintenance.',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600'
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      title: '24/7 Customer Support',
      description: 'Round-the-clock customer support to assist you with any queries or concerns.',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-600'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Quality Guarantee',
      description: 'All vehicles are verified and come with our quality guarantee for peace of mind.',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: 'Test Drive Booking',
      description: 'Schedule test drives at your convenience with our easy booking system.',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="py-12 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need for buying and selling cars</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className={`${service.bgColor} dark:bg-opacity-20 ${service.textColor} dark:text-opacity-100 w-20 h-20 rounded-lg flex items-center justify-center mb-6`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white mt-16">
          <Clock className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Why Choose CarDealing?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            We provide end-to-end solutions for buying and selling used cars with transparency, quality, and customer satisfaction at the core of everything we do.
          </p>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-sm opacity-90">Cars Listed</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <p className="text-4xl font-bold mb-2">1000+</p>
              <p className="text-sm opacity-90">Happy Customers</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-sm opacity-90">Support Available</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-sm opacity-90">Verified Sellers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
