
const { User } = require('../models');

const resolvers = {

  Query: 
  {
    userById: async (parent, args) => {
      return await User.find((user) => {
        user.id == args.id
      });
    },
    allUsers: async (parent, args) => {
      return await User.find();
    }
    
  },

  Mutation: {
    createUser: async () => {

    }
  }
}