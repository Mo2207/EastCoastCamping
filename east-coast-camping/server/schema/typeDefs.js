
const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }

  type CampGround {
    _id: ID!
    name: String!
  }

  type Review {
    _id: ID!
    user: User!
    camp: CampGround!
    rating: Float!
    text: String!
  }

  type Query {
    userById(id: ID!): User
    allUsers: [User]
    campById(id: ID!): CampGround
    allCamps: [CampGround]
    allReviews: [Review]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    deleteUser(id: ID!): User
    createReview(userId: ID!, campId: ID!, rating: Float!, text: String!): Review!
  }
`

module.exports = typeDefs;