
const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type CampGround {
    _id: ID!
    name: String!
  }

  type Query {
    userById(id: ID!): User
    allUsers: [User]
    campById(id: ID!): CampGround
    allCamps: [CampGround]
  }

  type Mutation {
    createUser(name: String!): User
  }
`

module.exports = typeDefs;