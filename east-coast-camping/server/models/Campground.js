
const { Schema, model } = require('mongoose');

const campGroundSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }
})

const CampGround = model('CampGround', campGroundSchema);

module.exports = CampGround;