
const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true,
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
  favourites: {
    type: Array,
    required: false
  },
})

const User = model('User', userSchema);

module.exports = User;