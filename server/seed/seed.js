
require('dotenv').config();
const mongoose = require('mongoose');
// const db = require('../config/connection');
const { User, CampGround, Review, Booking} = require('../models');

const userData = require('./userData.json');
const campData = require('./campData.json');
const reviewData = require('./reviewData.json');

// db.once('open', async () => {
//   // clears the existing data if any
//   await User.collection.drop();
//   await CampGround.collection.drop();
//   await Review.collection.drop();
//   await Booking.collection.drop();
 
  // Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', async () => {
  try {
    // Clear collections
    await User.deleteMany();
    await CampGround.deleteMany();
    await Review.deleteMany();
    await Booking.deleteMany();

    // Insert data
    await User.insertMany(userData);
    await CampGround.insertMany(campData);
    await Review.insertMany(reviewData);

    console.log('✅ All data seeded successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    process.exit(0);
  }
});

  // // inserts data
  // const users = await User.insertMany(userData);
  // const campGrounds = await CampGround.insertMany(campData);
  // const reviews = await Review.insertMany(reviewData);

  // console.log('userData seeded successfully!');
  // console.log('campData seeded successfully!');
  // console.log('reviewData seeded successfully!');
  // process.exit(0);
// })