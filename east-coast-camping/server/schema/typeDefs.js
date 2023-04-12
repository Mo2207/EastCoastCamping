
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
    location: String!
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

  type Booking {
    _id:ID!
    user: User!
    camp: CampGround!
    startDate: String!
    endDate: String!
  }

  type Query {
    userById(id: ID!): User
    allUsers: [User]
    campById(id: ID!): CampGround
    allCamps: [CampGround]
    campByLocation(location: String!): [CampGround]
    allReviews: [Review]
    allBookings:[Booking]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
    deleteUser(id: ID!): User
    createReview(userId: ID!, campId: ID!, rating: Float!, text: String!): Review!
    createBooking(userId:ID!, campId: ID!, startDate: String!, endDate: String!): Booking!
    cancelBooking(id: ID!):Booking
  }
`

module.exports = typeDefs;