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

// * @route   POST /api/aircraft
// ? @desc    Add an aircraft
// ! @access  Private
router.post(
  '/aircraft',
  [
    auth,
    [
      body('gross').custom((value) => {
        if (!value) return Promise.reject('gross is required!');

        if (!value.weight)
          return Promise.reject('No weight provided for gross');

        if (isNaN(!value.weight))
          return Promise.reject('gross.weight must be a number!');

        return true;
      }),
      body('usefulLoad').custom((value) => {
        if (!value) return Promise.reject('usefulLoad is required!');

        if (!value.weight)
          return Promise.reject('No weight provided for usefulLoad');

        if (isNaN(!value.weight))
          return Promise.reject('usefulLoad.weight must be a number!');

        return true;
      }),
      body('empty').custom((value) => {
        if (!value) return Promise.reject('empty is required!');

        if (!value.weight) return Promise.reject('No weight provided!');
        if (!value.arm) return Promise.reject('No arm provided!');
        if (!value.moment) return Promise.reject('No moment provided!');

        if (isNaN(value.weight) || isNaN(value.arm) || isNaN(value.moment))
          return Promise.reject('Must be numbers!');

        return true;
      }),
      body('frontSeat').custom((value) => {
        if (!value) return Promise.reject('frontSeat is required!');

        if (!value.weight) return Promise.reject('No weight provided!');
        if (!value.arm) return Promise.reject('No arm provided!');
        if (!value.moment) return Promise.reject('No moment provided!');

        if (isNaN(value.weight) || isNaN(value.arm) || isNaN(value.moment))
          return Promise.reject('Must be numbers!');

        return true;
      }),
      body('middleSeat').custom((value) => {
        if (!value) return Promise.reject('middleSeat is required!');

        if (!value.weight) return Promise.reject('No weight provided!');
        if (!value.arm) return Promise.reject('No arm provided!');
        if (!value.moment) return Promise.reject('No moment provided!');

        if (isNaN(value.weight) || isNaN(value.arm) || isNaN(value.moment))
          return Promise.reject('Must be numbers!');

        return true;
      }),
      body('rearSeat').custom((value) => {
        if (!value) return Promise.reject('rearSeat is required!');

        if (!value.weight) return Promise.reject('No weight provided!');
        if (!value.arm) return Promise.reject('No arm provided!');
        if (!value.moment) return Promise.reject('No moment provided!');

        if (isNaN(value.weight) || isNaN(value.arm) || isNaN(value.moment))
          return Promise.reject('Must be numbers!');

        return true;
      }),
      body('noseBaggage').custom((value) => {
        if (!value) return Promise.reject('noseBaggage is required!');

        if (!value.weight) return Promise.reject('No weight provided!');
        if (!value.arm) return Promise.reject('No arm provided!');
        if (!value.moment) return Promise.reject('No moment provided!');

        if (isNaN(value.weight) || isNaN(value.arm) || isNaN(value.moment))
          return Promise.reject('Must be numbers!');

        return true;
      }),
      body('mainBaggage').custom((value) => {
        if (!value) return Promise.reject('mainBaggage is required!');

        if (!value.weight) return Promise.reject('No weight provided!');
        if (!value.arm) return Promise.reject('No arm provided!');
        if (!value.moment) return Promise.reject('No moment provided!');

        if (isNaN(value.weight) || isNaN(value.arm) || isNaN(value.moment))
          return Promise.reject('Must be numbers!');

        return true;
      }),
      body('rearBaggage').custom((value) => {
        if (!value) return Promise.reject('rearBaggage is required!');

        if (!value.weight) return Promise.reject('No weight provided!');
        if (!value.arm) return Promise.reject('No arm provided!');
        if (!value.moment) return Promise.reject('No moment provided!');

        if (isNaN(value.weight) || isNaN(value.arm) || isNaN(value.moment))
          return Promise.reject('Must be numbers!');

        return true;
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      gross,
      usefulLoad,
      empty,
      frontSeat,
      middleSeat,
      rearSeat,
      noseBaggage,
      mainBaggage,
      rearBaggage,
    } = req.body;

    const body = {
      usefulLoad: {
        weight: usefulLoad.weight,
      },
      gross: {
        weight: gross.weight,
      },
      empty: {
        weight: empty.weight,
        arm: empty.arm,
        moment: empty.moment,
      },
      frontSeat: {
        weight: frontSeat.weight,
        arm: frontSeat.arm,
        moment: frontSeat.moment,
      },
      middleSeat: {
        weight: middleSeat.weight,
        arm: middleSeat.arm,
        moment: middleSeat.moment,
      },
      rearSeat: {
        weight: rearSeat.weight,
        arm: rearSeat.arm,
        moment: rearSeat.moment,
      },
      noseBaggage: {
        weight: noseBaggage.weight,
        arm: noseBaggage.arm,
        moment: noseBaggage.moment,
      },
      mainBaggage: {
        weight: mainBaggage.weight,
        arm: mainBaggage.arm,
        moment: mainBaggage.moment,
      },
      rearBaggage: {
        weight: rearBaggage.weight,
        arm: rearBaggage.arm,
        moment: rearBaggage.moment,
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
