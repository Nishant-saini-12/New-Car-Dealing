import { useState } from 'react';
import { X, Calculator, DollarSign, Calendar, Percent, TrendingUp } from 'lucide-react';

export default function EMICalculatorModal({ onClose, carPrice = 0 }) {
  const [formData, setFormData] = useState({
    carPrice: carPrice,
    downPayment: Math.round(carPrice * 0.2), // Default 20% down payment
    annualRate: 9.0, // Default 9% interest rate
    tenureMonths: 60, // Default 5 years
    tenureType: 'months' // 'months' or 'years'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleTenureTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      tenureType: type,
      tenureMonths: type === 'years' ? Math.round(prev.tenureMonths / 12) : prev.tenureMonths * 12
    }));
  };

  const calculateEMI = async () => {
    // Validation
    if (!formData.carPrice || formData.carPrice <= 0) {
      setError('Please enter a valid car price');
      return;
    }
    if (formData.downPayment < 0) {
      setError('Down payment cannot be negative');
      return;
    }
    if (formData.downPayment >= formData.carPrice) {
      setError('Down payment cannot be greater than or equal to car price');
      return;
    }
    if (!formData.annualRate || formData.annualRate <= 0) {
      setError('Please enter a valid interest rate');
      return;
    }
    if (!formData.tenureMonths || formData.tenureMonths <= 0) {
      setError('Please enter a valid tenure');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/emi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carPrice: parseFloat(formData.carPrice),
          downPayment: parseFloat(formData.downPayment),
          annualRate: parseFloat(formData.annualRate),
          tenureMonths: parseInt(formData.tenureMonths)
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Failed to calculate EMI');
      }
    } catch (err) {
      console.error('EMI calculation error:', err);
      setError('Failed to calculate EMI. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const resetCalculator = () => {
    setResult(null);
    setError('');
    setFormData({
      carPrice: carPrice,
      downPayment: Math.round(carPrice * 0.2),
      annualRate: 9.0,
      tenureMonths: 60,
      tenureType: 'months'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">EMI Calculator</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Calculate your monthly loan payment</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Loan Details</h3>
              
              {/* Car Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Car Price ($) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={formData.carPrice}
                  onChange={(e) => handleInputChange('carPrice', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 25000"
                />
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Down Payment ($) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={formData.downPayment}
                  onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 5000"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Recommended: {Math.round(formData.carPrice * 0.2).toLocaleString()} (20% of car price)
                </p>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Percent className="w-4 h-4 inline mr-1" />
                  Annual Interest Rate (%) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="0.1"
                  value={formData.annualRate}
                  onChange={(e) => handleInputChange('annualRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 9.0"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Typical range: 7% - 15% for car loans
                </p>
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Loan Tenure *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={formData.tenureType === 'years' ? Math.round(formData.tenureMonths / 12) : formData.tenureMonths}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      handleInputChange('tenureMonths', formData.tenureType === 'years' ? value * 12 : value);
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 5"
                  />
                  <select
                    value={formData.tenureType}
                    onChange={(e) => handleTenureTypeChange(e.target.value)}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Total: {formData.tenureMonths} months ({Math.round(formData.tenureMonths / 12 * 10) / 10} years)
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Calculate Button */}
              <div className="flex gap-3">
                <button
                  onClick={calculateEMI}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:transform-none shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5" />
                      Calculate EMI
                    </>
                  )}
                </button>
                {result && (
                  <button
                    onClick={resetCalculator}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">EMI Breakdown</h3>
              
              {result ? (
                <div className="space-y-4">
                  {/* Monthly EMI - Highlighted */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">Monthly EMI</p>
                      <p className="text-4xl font-black text-blue-600 dark:text-blue-400">${result.emi.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">for {result.months} months</p>
                    </div>
                  </div>

                  {/* Other Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Principal Amount</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">${result.principal.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Down Payment</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">${result.downPayment.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest</p>
                      <p className="text-xl font-bold text-orange-600 dark:text-orange-400">${result.totalInterest.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Payable</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">${result.totalPayment.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <h4 className="font-semibold text-green-800 dark:text-green-400 mb-3">EMI Summary</h4>
                    <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                      <p>• Your monthly EMI is <strong>${result.emi.toLocaleString()}</strong> for <strong>{result.months} months</strong></p>
                      <p>• Total Interest: <strong>${result.totalInterest.toLocaleString()}</strong></p>
                      <p>• Total Amount Payable: <strong>${result.totalPayment.toLocaleString()}</strong></p>
                      <p>• Interest Rate: <strong>{result.annualRate}% per annum</strong></p>
                    </div>
                  </div>

                  {/* Payment Breakdown Chart (Visual) */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Principal</span>
                        <span className="font-semibold">{Math.round((result.principal / result.totalPayment) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(result.principal / result.totalPayment) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Interest</span>
                        <span className="font-semibold">{Math.round((result.totalInterest / result.totalPayment) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">Enter loan details and click "Calculate EMI" to see your monthly payment breakdown</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}