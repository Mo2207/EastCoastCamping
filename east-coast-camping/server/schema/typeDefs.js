
const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    favourites: [CampGround]
  }

  type CampGround {
    _id: ID!
    name: String!
    availability: Int
    available: Boolean!
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
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
    deleteUser(id: ID!): User
    createReview(userId: ID!, campId: ID!, rating: Float!, text: String!): Review!
  }
`

module.exports = typeDefs;