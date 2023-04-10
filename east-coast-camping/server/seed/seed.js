
const db = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

db.once('open', async () => {
  // clears the existing data if any
  await User.deleteMany({});

  // inserts userData
  const users = await User.insertMany(userData);

  console.log('userData seeded successfully!');
  process.exit(0);
})