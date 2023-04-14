
const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
  firstName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  saved: {
    type: Array,
    required: false
  },
})

const User = model('User', userSchema);

module.exports = User;