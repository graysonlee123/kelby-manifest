const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Aircraft = require('../models/Aircrafts');

// * @route   POST /api/aircraft
// ? @desc    Create an aircraft
// ! @access  Private
router.post(
  '/',
  [
    auth,
    [
      // General Info
      check("generalInfo.tailNum", "Tail Number is required").not().isEmpty(),
      check("generalInfo.model", "Model is required").not().isEmpty(),
      check("generalInfo.maxGasFuel", "Maximum Gas Fuel is required").not().isEmpty(),
      check("generalInfo.wingSurfaceArea", "Wing Surface Area is required").not().isEmpty(),
      check("generalInfo.thrust", "Thrust is required").not().isEmpty(),
      check("generalInfo.takeOffSpeed", "Take off speed is required").not().isEmpty(),
      check("generalInfo.coeficientOfLift", "Coeficient Of Lift is required").not().isEmpty(),
      
      // Weight and Balance
      check("weightAndBalance.maxFuel", "Max Fuel is required").not().isEmpty(),
      check("weightAndBalance.grossWeight", "Gross Weight is required").not().isEmpty(),
      check("weightAndBalance.usefulLoad", "Useful Load is required").not().isEmpty(),
      check("weightAndBalance.emptyWeight", "Empty Weight is required").not().isEmpty(),
      check("weightAndBalance.emptyWeightArm", "Empty Weight Arm is required").not().isEmpty(),
      check("weightAndBalance.frontSeatArm", "Front Seat Arm is required").not().isEmpty(),
      check("weightAndBalance.middleSeatArm", "Middle Seat Arm is required").not().isEmpty(),
      check("weightAndBalance.rearSeatArm", "Rear Seat Arm is required").not().isEmpty(),
      check("weightAndBalance.fuelArm", "Fuel Arm is required").not().isEmpty(),
      check("weightAndBalance.baggageAreaArm", "Baggage Area Arm is required").not().isEmpty(),
      check("weightAndBalance.rearBaggageArm", "Rear Baggage Arm is required").not().isEmpty(),
      check("weightAndBalance.noseBaggageAreaArm", "Nose Baggage Area Arm is required").not().isEmpty(),
      check("weightAndBalance.lowCGRAngle", "Low CGR Angle is required").not().isEmpty(),
      check("weightAndBalance.highCG", "High CG is required").not().isEmpty(),
      
      // Take Off and Landing Distances
      check("takeOffAndLandingDistances.takeOff.std.roll", "Roll is required").not().isEmpty(),
      check("takeOffAndLandingDistances.takeOff.std.clear", "Clear is required").not().isEmpty(),
      check("takeOffAndLandingDistances.takeOff.plus10.roll", "Roll is required").not().isEmpty(),
      check("takeOffAndLandingDistances.takeOff.plus10.clear", "Clear is required").not().isEmpty(),
      check("takeOffAndLandingDistances.takeOff.plus20.roll", "Roll is required").not().isEmpty(),
      check("takeOffAndLandingDistances.takeOff.plus20.clear", "Clear is required").not().isEmpty(),
      check("takeOffAndLandingDistances.takeOff.plus30.roll", "Roll is required").not().isEmpty(),
      check("takeOffAndLandingDistances.takeOff.plus30.clear", "Clear is required").not().isEmpty(),
      check("takeOffAndLandingDistances.takeOff.plus40.roll", "Roll is required").not().isEmpty(),
      check("takeOffAndLandingDistances.takeOff.plus40.clear", "Clear is required").not().isEmpty(),
      check("takeOffAndLandingDistances.landing.std.roll", "Roll is required").not().isEmpty(),
      check("takeOffAndLandingDistances.landing.std.clear", "Clear is required").not().isEmpty(),
      check("takeOffAndLandingDistances.landing.plus10.roll", "Roll is required").not().isEmpty(),
      check("takeOffAndLandingDistances.landing.plus10.clear", "Clear is required").not().isEmpty(),
      check("takeOffAndLandingDistances.landing.plus20.roll", "Roll is required").not().isEmpty(),
      check("takeOffAndLandingDistances.landing.plus20.clear", "Clear is required").not().isEmpty(),
      check("takeOffAndLandingDistances.landing.plus30.roll", "Roll is required").not().isEmpty(),
      check("takeOffAndLandingDistances.landing.plus30.clear", "Clear is required").not().isEmpty(),
      check("takeOffAndLandingDistances.landing.plus40.roll", "Roll is required").not().isEmpty(),
      check("takeOffAndLandingDistances.landing.plus40.clear", "Clear is required").not().isEmpty(),
      
      // CG Envelope
      check("cgEnvelope.knee.x", "X Value is required").not().isEmpty(),
      check("cgEnvelope.knee.y", "Y Value is required").not().isEmpty(),
      check("cgEnvelope.lowerLeftCorner.x", "X Value is required").not().isEmpty(),
      check("cgEnvelope.lowerLeftCorner.y", "Y Value is required").not().isEmpty(),
      check("cgEnvelope.upperLeftCorner.x", "X Value is required").not().isEmpty(),
      check("cgEnvelope.upperLeftCorner.y", "Y Value is required").not().isEmpty(),
      check("cgEnvelope.lowerRightCorner.x", "X Value is required").not().isEmpty(),
      check("cgEnvelope.lowerRightCorner.y", "Y Value is required").not().isEmpty(),
      check("cgEnvelope.upperRightCorner.x", "X Value is required").not().isEmpty(),
      check("cgEnvelope.upperRightCorner.y", "Y Value is required").not().isEmpty(),
      
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const dbAircraft = new Aircraft(req.body);
      const response = await dbAircraft.save();

      res.json({ response });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server error`);
    }
  }
);

// * @route   GET /api/aircraft
// ? @desc    Get all aircrafts
// ! @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const dbAircrafts = await Aircraft.find();

    res.json(dbAircrafts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(`Server error`);
  }
})

module.exports = router;
