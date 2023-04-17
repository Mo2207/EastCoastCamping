const { Schema, model } = require('mongoose');
const { User, CampGround } = require('./index');
const mongoose = require('mongoose');

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  camp: {
    type: Schema.Types.ObjectId,
    ref: 'CampGround',
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
});

const Booking = model('Booking', bookingSchema);

module.exports = Booking;


