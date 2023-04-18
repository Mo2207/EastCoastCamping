
const { Schema, model } = require('mongoose');
const { Review } = require('./index');
const campGroundSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  favourited: {
    type: Number,
  },
  availability: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
  },
  price: {
    type: Number,
    required: true,
  },
  features: {
    type: String,
    required: false,
  },
  campImages: {
    type: Array
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
    required: true,
  }
})

const CampGround = model('CampGround', campGroundSchema);

module.exports = CampGround;