const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Aircraft = require('../models/Aircrafts');

// * @route   GET /api/
// ? @desc    Test route
// ! @access  Public
router.get('/', (req, res) => {
  res.json('yep');
});

// * @route   POST /api/
// ? @desc    Add an aircraft
// ! @access  Private
router.post('/', auth, (req, res) => {
  res.json('good');
});

module.exports = router;
