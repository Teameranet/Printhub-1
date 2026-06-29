const express = require('express');
const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Admin User' }]);
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Sample User' });
});

module.exports = router;
