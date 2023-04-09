
const { User } = require('../models');

const resolvers = {

  Query: 
  {
    user: async (parent, args) => {
      return await User.find((user) => {
        user.id == args.id
      });
    },
    users: async (parent, args) => {
      return await User.find();
    }
    
  },

  Mutation: {
    createUser: async () => {

    }
  }
}