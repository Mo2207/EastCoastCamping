
const db = require('../config/connection');
const { User, CampGround, Review, Booking} = require('../models');

const userData = require('./userData.json');
const campData = require('./campData.json');
const reviewData = require('./reviewData.json');

db.once('open', async () => {
  // clears the existing data if any
  await User.collection.drop();
  await CampGround.collection.drop();
  await Review.collection.drop();
  await Booking.collection.drop();
 

  // inserts data
  const users = await User.insertMany(userData);
  const campGrounds = await CampGround.insertMany(campData);
  const reviews = await Review.insertMany(reviewData);

  console.log('userData seeded successfully!');
  console.log('campData seeded successfully!');
  console.log('reviewData seeded successfully!');
  process.exit(0);
})