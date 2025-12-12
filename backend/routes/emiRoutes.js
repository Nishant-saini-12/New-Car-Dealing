import express from 'express';

const router = express.Router();

// POST /api/emi - Calculate EMI
router.post('/emi', (req, res) => {
  try {
    const { carPrice, downPayment, annualRate, tenureMonths } = req.body;

    // Validation
    if (!carPrice || !downPayment || !annualRate || !tenureMonths) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: carPrice, downPayment, annualRate, tenureMonths'
      });
    }

    if (carPrice <= 0 || downPayment < 0 || annualRate <= 0 || tenureMonths <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid values: All amounts must be positive'
      });
    }

    if (downPayment >= carPrice) {
      return res.status(400).json({
        success: false,
        error: 'Down payment cannot be greater than or equal to car price'
      });
    }

    // Calculate EMI
    const principal = carPrice - downPayment;
    const monthlyRate = annualRate / 100 / 12;
    const months = parseInt(tenureMonths);

    // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    // Round to 2 decimal places
    const result = {
      principal: Math.round(principal * 100) / 100,
      emi: Math.round(emi * 100) / 100,
      months: months,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      downPayment: Math.round(downPayment * 100) / 100,
      carPrice: Math.round(carPrice * 100) / 100,
      annualRate: annualRate
    };

    console.log('📊 EMI Calculation:', result);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('❌ EMI calculation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate EMI',
      details: error.message
    });
  }
});

export default router;