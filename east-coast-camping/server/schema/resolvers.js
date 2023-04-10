
const { User } = require('../models');

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
    }
    
  },

  // Mutation: {
  //   createUser: async () => {

  //   }
  // }
}

module.exports = resolvers;