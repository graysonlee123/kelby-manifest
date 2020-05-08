const mongoose = require("mongoose");

const AircraftSchema = new mongoose.Schema({
  // General Info
  generalInfo: {
    tailNum: Number,
    model: String,
    maxGasFuel: Number,
    wingSurfaceArea: Number,
    thrust: Number,
    takeOffSpeed: Number,
    coeficientOfLift: Number,
  },
  // Weight and Balance
  weightAndBalance: {
    maxFuel: Number,
    grossWeight: Number,
    usefulLoad: Number,
    emptyWeight: Number,
    emptyWeightArm: Number,
    frontSeatArm: Number,
    middleSeatArm: Number,
    rearSeatArm: Number,
    fuelArm: Number,
    baggageAreaArm: Number,
    rearBaggageArm: Number,
    noseBaggageAreaArm: Number,
    lowCGRAngle: Number,
    highCG: Number,
  },
  // Take Off and Landing Distances
  takeOffAndLandingDistances: {
    takeOff: {
      std: {
        roll: Number,
        clear: Number,
      },
      plus10: {
        roll: Number,
        clear: Number,
      },
      plus20: {
        roll: Number,
        clear: Number,
      },
      plus30: {
        roll: Number,
        clear: Number,
      },
      plus40: {
        roll: Number,
        clear: Number,
      },
    },
    landing: {
      std: {
        roll: Number,
        clear: Number,
      },
      plus10: {
        roll: Number,
        clear: Number,
      },
      plus20: {
        roll: Number,
        clear: Number,
      },
      plus30: {
        roll: Number,
        clear: Number,
      },
      plus40: {
        roll: Number,
        clear: Number,
      },
    },
  },
  // CG Envelope
  cgEnvelope: {
    knee: {
      x: Number,
      y: Number,
    },
    lowerLeft: {
      x: Number,
      y: Number,
    },
    upperLeftCorner: {
      x: Number,
      y: Number,
    },
    lowerRight: {
      x: Number,
      y: Number,
    },
    upperRightCorner: {
      x: Number,
      y: Number,
    },
  },
});

module.exports = Aircraft = mongoose.model("aircraft", AircraftSchema);
