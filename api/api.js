const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
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
router.post(
  '/',
  [
    auth,
    [
      body('usefulLoad').custom((value) => {
        if (!value.weight)
          return Promise.reject('No weight provided for usefulLoad');

        if (isNaN(!value.weight))
          return Promise.reject('usefulLoad.weight must be a number!');

        return true;
      }),
      body('gross').custom((value) => {
        if (!value.weight)
          return Promise.reject('No weight provided for gross');

        if (isNaN(!value.weight))
          return Promise.reject('gross.weight must be a number!');

        return true;
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const body = {
      usefulLoad: {
        weight: req.body.usefulLoad.weight,
      },
      gross: {
        weight: req.body.gross.weight,
      },
    };

    try {
      const dbAircraft = new Aircraft(body);
      const response = await dbAircraft.save();

      res.json({ response });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server error`);
    }
  }
);

module.exports = router;
