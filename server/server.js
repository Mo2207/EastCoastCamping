const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { CampGround, User, Booking } = require('./models');
const mongoose = require('mongoose');

const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    getArrayOfCamps: async (ids) => {
      const objectIds = ids.map(id => mongoose.Types.ObjectId(id));
      return CampGround.find({ _id: { $in: objectIds } });
    },
    bookingByUserId: async (userId) => {
      const user = await User.findById(userId);
      if (!user) throw new Error(`User with ID ${userId} not found!`);
      return Booking.find({ user: userId }).populate('user').populate('camp').exec();
    }
  }),
  introspection: true
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  // startApolloServer(typeDefs, resolvers);
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../client/build/index.html'));
  // });