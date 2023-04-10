
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
    campground: Campground!
    rating: Float!
    review: String!
  }

  input ReviewInput {
    userId: ID!
    campgroundId: ID!
    rating: Float!
    review: String!
  }

  type Query {
    userById(id: ID!): User
    allUsers: [User]
    campById(id: ID!): CampGround
    allCamps: [CampGround]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    deleteUser(id: ID!): User
    createReview(review: ReviewInput!): Review!
  }
`

module.exports = typeDefs;