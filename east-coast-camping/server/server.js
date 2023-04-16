const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { CampGround } = require('./models');
const mongoose = require('mongoose');

const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    getArrayOfCamps: async (ids, context) => {
      // converts string ids to object ids
      const objectIds = ids.map(id => mongoose.Types.ObjectId(id));

      //find all camps based on the object ids
      const allCamps = await CampGround.find({ _id: { $in: objectIds } });

      return allCamps;
    }
  })
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//May need to be updated
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


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
  startApolloServer(typeDefs, resolvers);