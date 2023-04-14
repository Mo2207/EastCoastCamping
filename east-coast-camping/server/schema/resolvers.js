
const { User, CampGround, Review, Booking } = require('../models');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/auth');
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

    userReviews: async (parent, args) => {
      const reviews = await Review.find({user:args.id});
      if (!user) {
        throw new Error(`user with id: ${args.id} not found!`);
      } else {
        return reviews;
      }
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
      console.log(newUser);
      const token = signToken(newIser);
      await newUser.save();
      return { token, newUser };
      
    },
    // edit user by id 
    editUser: async (parent, {userId, firstName, lastName, email}) => {
      // check to make sure arguments are given
      if (!userId) throw new Error(`userId required!`);

      // check to make sure user with the given id exists
      const user = User.findById(userId);
      if (!user) {
        throw new Error(`user with id: ${userId} not found!`);
      }

      // this only updates the parameters that the user hands in, keeps the rest the same
      const userEdits = {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email
      }

      const updateUser = await User.findByIdAndUpdate(
        // edit this user
        userId,
        // make these edits
        userEdits,
        {new: true}
      );

      return updateUser;
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
      const token = signToken(user)
      return { token, user};
    },
    // add camp to saved
    saveCamp: async (parent, { userId, campId }) => {
      // check to make sure arguments are given
      if (!userId) throw new Error(`userId required!`);
      if (!campId) throw new Error(`campId required!`);

      // checks to make sure camp with given id exists
      const camp = await CampGround.findById(campId);
      if (!camp) {
        throw new Error(`camp with id: ${campId} not found!`);
      }

      // get the user by id
      const updateUser = await User.findByIdAndUpdate(
        // update this user
        userId,
        // $addToSet prevents duplicates getting saved
        {$addToSet: { saved: campId }},
        {new: true}
      ).populate('saved');

      console.log(updateUser)
      if (!updateUser) {
        throw new Error(`user with id: ${userId} not found!`);
      }
      return updateUser;
    },
    // delete camp from saved
    deleteSavedCamp: async (parent, { userId, campId }) => {
      // check to make sure arguments are given
      if (!userId) throw new Error(`userId required!`);
      if (!campId) throw new Error(`campId required!`);

      // checks to make sure user with given id exists
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`user with id: ${userId} not found!`);
      } 

      // delete the campId from users saved list
      if (user.saved.includes(campId)) {
        user.saved.pull(campId);
        await user.save();
        return user;
      } else {
        throw new Error(`campId not found in saved list!`);
      }
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