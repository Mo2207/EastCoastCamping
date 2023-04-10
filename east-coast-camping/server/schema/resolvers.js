
const { User, CampGround } = require('../models');

const resolvers = {

  // QUERIES
  Query: 
  {
    // ---------- USER QUERIES ----------
    // get user by id
    userById: async (parent, args) => {
      return await User.findById(args.id);
    },
    // get all users
    allUsers: async (parent, args) => {
      return await User.find();
    },

    // ---------- CAMPGROUND QUERIES ----------
    // get camp by id
    campById: async (parent, args) => {
      return await CampGround.findById(args.id);
    },
    // get all camps
    allCamps: async (parent, args) => {
      return await CampGround.find();
    },
    
  },

  // MUTATIONS
  Mutation: {
    // ---------- USER MUTATIONS ----------
    // create new user
    createUser: async (parent, args) => {
      const { name, email, password } = args;
      
      const newUser = new User(args);
      return await newUser.save();
    },
    // delete user by id
    deleteUser: async (parent, args) => {
      const deletedUser = await User.findByIdAndDelete(args.id);
      return {_id: deletedUser._id}
    }
  }
}

module.exports = resolvers;