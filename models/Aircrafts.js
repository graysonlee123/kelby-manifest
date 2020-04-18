const mongoose = require('mongoose');

const AircraftSchema = new mongoose.Schema({
  gross: {
    weight: { type: Number },
  },
  usefulLoad: {
    weight: { type: Number },
  },
  empty: {
    weight: { type: Number },
    arm: { type: Number },
    moment: { type: Number },
  },
  frontSeat: {
    weight: { type: Number },
    arm: { type: Number },
    moment: { type: Number },
  },
  middleSeat: {
    weight: { type: Number },
    arm: { type: Number },
    moment: { type: Number },
  },
  rearSeat: {
    weight: { type: Number },
    arm: { type: Number },
    moment: { type: Number },
  },
  noseBaggage: {
    weight: { type: Number },
    arm: { type: Number },
    moment: { type: Number },
  },
  mainBaggage: {
    weight: { type: Number },
    arm: { type: Number },
    moment: { type: Number },
  },
  rearBaggage: {
    weight: { type: Number },
    arm: { type: Number },
    moment: { type: Number },
  },
});

module.exports = Aircraft = mongoose.model('aircraft', AircraftSchema);
