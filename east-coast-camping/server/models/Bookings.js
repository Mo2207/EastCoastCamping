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
  },
  endDate: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  totalP: {
    type: Number,
    required: true
  },
  totalN: {
    type: Number,
    required: true
  },
  bookingID: {
    type: Number,
  }  

});

const Booking = model('Booking', bookingSchema);

module.exports = Booking;


