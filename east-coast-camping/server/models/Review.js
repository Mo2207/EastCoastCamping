
const { Schema, model } = require('mongoose');

const reviewSchema = new Schema ({
  username: {
    type: String,
    required: true
  },
  campname: {
    type: String,
    required: true
  },
  rating: {
    type: Float,
    required: true
  },
  review: {
    type: String,
    required: true,
    minlength: 5
  }
})

const Review = model('Review', reviewSchema);

module.exports = Review;