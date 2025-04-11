
const { User, CampGround, Review, Booking } = require('../models');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');
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
        // const arrayKey = ["_id","name","location","image","price"]
        // const allCamps = await CampGround.find(
        //   { _id: { $in: user.saved } 
        // });

        // var allCampsObj =Object.values(Object.values(allCamps))
        // console.log(allCampsObj)
        // var result = Object.keys(allCampsObj[0]).map((key)=>[key, allCampsObj[0][key]]);
        // console.log(result)
        // user.campdata = result.toString();
        // console.log(JSON.stringify(allCampsObj))
        // user.campdata = JSON.stringify(allCampsObj);
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
      // return await CampGround.find();
      const camps = await CampGround.find();
    
      return camps;
    },

    // get array of camps
    getArrayOfCamps: async (parent, {ids}) => {
      // converts string ids to object ids
      const objectIds = ids.map(id => mongoose.Types.ObjectId(id));

      //find all camps based on the object ids
      const allCamps = await CampGround.find({ _id: { $in: objectIds } });

      return allCamps;
    },

    // combination of userById and getArrayOfCamps
    getCampsAndBookingByUserId: async (parent, {userId}, context) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found!`);
      }

      const savedCamps = 
      await context.getArrayOfCamps(user.saved, context)

      let userBookings =
      await context.bookingByUserId(userId, context)
    

      return { user, savedCamps, userBookings };
    },

    // ---------- REVIEW QUERIES ----------
    // get all reviews
    allReviews: async (parent, args) => {
      return await Review.find().populate('user').populate('camp');
    },

    userReviews: async (parent, args) => {
      const reviews = await Review.find({user:args.id});
      if (!reviews) {
        throw new Error(`user with id: ${args.id} not found!`);
      } else {
        return reviews;
      }
    },

    campReviews: async (parent, {campId}) => {
      // find all reviews associated with campId
      const reviews = await Review.find({
        camp: campId,
      })
      // populate user and camp for return data
      .populate('user')
      .populate('camp')
      .exec()
      
      return reviews;
    },

    // ---------- BOOKING QUERIES ----------
    // get all Bookings
    allBookings: async (parent, args) => {
      const bookings = await Booking.find();

      // populate booking and return
      const populateBooking = await Booking.find(bookings._id)
      .populate('user')
      .populate('camp')
      .exec()

      return populateBooking;
    },

    bookingByUserId: async (parent, {userId}) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found!`);
      }

      // populate userBookings and return
      const userBookings = await Booking.find({ user: userId })
      .populate('user')
      .populate('camp')
      .exec()

      return userBookings;
    },
  },
  CampGround: {
    reviews: async (camp) =>{
      const reviews = await Review.find({camp: camp._id });
      return reviews;
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
      // const token = signToken(newUser);
      await newUser.save();
      return newUser;
      
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
        throw new Error(`user with email: ${email} not found!`);
      }
      // bcrypt password comparing upon login
      const validatePassword = await bcrypt.compare(password, user.password);
      // console.log(validatePassword)
      if (!validatePassword) {
        throw new Error(`Invalid Email or Password provided.`);
      }
      // const token = signToken(user)
      // return
      return user;
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

      // console.log(updateUser)
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
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`Invalid userId: ${userId}.`);
      }
      const camp = await CampGround.findById(campId);
      if (!camp) {
        throw new Error(`Invalid campground id: ${campId}`);
      }
      console.log( userId, campId, rating, text)
      // write the newReview
      const newReview = new Review({
        user: userId,
        camp: campId,
        rating,
        text
      })
      console.log(newReview)
      // save the newReview to database
      await newReview.save()
      
      // find the newReview now that it is saved and populate it with user & camp data
      const populateReview = await Review.findById(newReview._id)
        .populate('user')
        .populate('camp')
        .exec();
        
      // console.log(`POPULATEREVIEW: ${populateReview}`);
      return populateReview;
    },

    // Booking Mutations
    createBooking: async (parent, data) => {
      
      console.log(data)
      // console.log(data.userId)


      // // validation to check if userId and campId exist
      const validUser = await User.findById(data.userId);
      if (!validUser) {
        throw new Error(`Invalid userId: ${data.userId}.`);
      }
      // console.log(validUser)
      const validCamp = await CampGround.findById(data.campId);
      if (!validCamp) {
        throw new Error(`Invalid campground id: ${data.campId}`);
      }
      // console.log(validCamp)
      // // write the Booking
      // console.log(totalP,totalN, bookingID)
      const newBooking = new Booking({
        user: data.userId,
        camp: data.campId,
        startDate: data.startDate,
        endDate: data.endDate,
        price: data.price,
        totalP: data.totalP,
        totalN: data.totalN,
        bookingID: data.bookingID
      })
      // // save the booking
      // console.log (newBooking)
      await newBooking.save();
      return newBooking;
      // // find the newBooking now that it is saved and populate it with user & camp data
      // const populateBooking = await Booking.findById(newBooking._id)
      //   .populate('user')
      //   .populate('camp')
      //   .exec();

      // return populateBooking;
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