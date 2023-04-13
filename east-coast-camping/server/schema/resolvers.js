
const { User, CampGround, Review } = require('../models');
const bcrypt = require('bcrypt');

const resolvers = {

  // QUERIES
  Query:
  {

    // ---------- USER QUERIES ----------
    // get user by id
    userById: async (parent, args) => {
      const user = await User.findById(args.id);
      if (!user) {
        throw new Error(`user with id: ${args.id} not found!`);
      } else {
        return user;
      }
    },
    // get all users
    allUsers: async (parent, args) => {
      return await User.find();
    },

    // ---------- CAMPGROUND QUERIES ----------
    // get camp by id
    campById: async (parent, args) => {
      const camp = await CampGround.findById(args.id);
      if (!camp) {
        throw new Error(`camp with id: ${args.id} not found!`);
      } else {
        return camp;
      }
    },
    //get camp by location
    campByLocation: async (_, { location }) => {
      const camps = await CampGround.find({ location });
     // .populate({path:'location', model:'CampGround'});
      
      return camps
    },
    
    // get all camps
    allCamps: async (parent, args) => {
      return await CampGround.find();
    },

    // ---------- REVIEW QUERIES ----------
    // get all reviews
    allReviews: async (parent, args) => {
      return await Review.find().populate('user').populate('camp');
    },

    // ------- BOOKING QUERIES _______
    // get all Bookings

    allBookings: async (parent, args) => {
      return await Booking.find();
    },
  },



  // MUTATIONS
  Mutation: {

    // ---------- USER MUTATIONS ----------
    // create new user
    createUser: async (parent, args) => {
      const { firstName, lastName, email, password } = args;

      // bcyrpt password hashing
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // reset the args password to the new hashed password
      args.password = hashedPassword;

      const newUser = new User(args);
      return await newUser.save();
    },
    // delete user by id
    deleteUser: async (parent, args) => {
      const deletedUser = await User.findByIdAndDelete(args.id);
      if (!deletedUser) {
        throw new Error(`user with id: ${args.id} not found!`);
      } else {
        return deletedUser;
      }
    },
    // user login
    userLogin: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      // checks to make sure user with given email exists
      if (!user) {
        throw new Error(`user with email: ${args.email} not found!`);
      }

      // bcrypt password comparing upon login
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword) {
        throw new Error(`Invalid Email or Password provided.`);
      }
      return user;
    },

    // ---------- REVIEW MUTATIONS ----------
    createReview: async (parent, { userId, campId, rating, text }) => {

      // validation to check if userId and campId exist
      const validUser = await User.findById(userId);
      if (!validUser) {
        throw new Error(`Invalid userId: ${userId}.`);
      }
      const validCamp = await CampGround.findById(campId);
      if (!validCamp) {
        throw new Error(`Invalid campground id: ${campId}`);
      }

      // write the review and save
      const newReview = new Review({
        user: userId,
        camp: campId,
        rating,
        text
      })
      console.log(newReview);
      return await newReview.save();
    },

    // Booking Mutations
    createBooking: async (parent, { userId, campId, startDate, endDate }) => {

      // validation to check if userId and campId exist
      const validUser = await User.findById(userId);
      if (!validUser) {
        throw new Error(`Invalid userId: ${userId}.`);
      }
      const validCamp = await CampGround.findById(campId);
      if (!validCamp) {
        throw new Error(`Invalid campground id: ${campId}`);
      }

      // write the Booking and save
      const newBooking = new Booking({
        user: userId,
        camp: campId,
        startDate,
        endDate
      })
      console.log(newBooking);
      return await newBooking.save();
    },
    cancelBooking: async (parent, args) => {
      const cancelledBooking = await Booking.findByIdAndDelete(args.id);
      if (!cancelledBooking) {
        throw new Error(`Booking with id: ${args.id} not found!`);
      } else {
        return cancelledBooking;
      }
    }
  }
}
module.exports = resolvers;