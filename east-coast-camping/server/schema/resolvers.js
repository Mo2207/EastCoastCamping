
const { User, CampGround } = require('../models');

const resolvers = {

  Query: 
  {
    // get user by id
    userById: async (parent, args) => {
      return await User.findOne({ _id: args.id });
    },
    // get all users
    allUsers: async (parent, args) => {
      return await User.find();
    },

    // get camp by id
    campById: async (parent, args) => {
      return await CampGround.findOne({ _id: args.id });
    },
    // get all camps
    allCamps: async (parent, args) => {
      return await CampGround.find();
    },
    
  },

  // Mutation: {
  //   createUser: async () => {

  //   }
  // }
}

module.exports = resolvers;