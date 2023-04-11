
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
  availability: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    
  }
})

const CampGround = model('CampGround', campGroundSchema);

module.exports = CampGround;