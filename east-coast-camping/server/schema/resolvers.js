
const { User } = require('../models');

// some starter data for testing 
const users = [
  { id: "1", name: "John" },
  { id: "2", name: "Jane" },
];

const resolvers = {

  Query: {
    user: async (parent, args) => {
      return users.find((user) => {
        user.id == args.id
      });
    }
  },

  Mutation: {
    createUser: async () => {

    }
  }
}