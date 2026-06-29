const express = require('express');
const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Business Cards', price: 15.99 },
    { id: 2, name: 'Flyers', price: 45.00 },
    { id: 3, name: 'Custom Mugs', price: 12.50 }
  ]);
});

module.exports = router;
