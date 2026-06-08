// Example product data endpoints
const express = require('express');
const router = express.Router();

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = [
      { id: 1, name: 'Product 1', price: 29.99 },
      { id: 2, name: 'Product 2', price: 49.99 }
    ];
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ id, name: 'Product Name', price: 29.99 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
