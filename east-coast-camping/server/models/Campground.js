
const { Schema, model } = require('mongoose');

const campGroundSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  favourited: {
    type: Number,
  },
  reviews: {
    type: Array,
    required: false
  }
})

const CampGround = model('CampGround', campGroundSchema);

module.exports = CampGround;