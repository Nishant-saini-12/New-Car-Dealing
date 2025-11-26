export default function AboutPage() {
  return (
    <div className="py-12 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About CarDealing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Your trusted partner in car buying and selling</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600" alt="About Us" className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Who We Are</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              CarDealing is a leading online marketplace for buying and selling quality used cars. We connect buyers with verified sellers, ensuring a safe and transparent transaction process.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              With thousands of listings and a commitment to customer satisfaction, we make car buying and selling simple, secure, and stress-free.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</p>
                <p className="text-gray-600 dark:text-gray-400">Cars Listed</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">1000+</p>
                <p className="text-gray-600 dark:text-gray-400">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
