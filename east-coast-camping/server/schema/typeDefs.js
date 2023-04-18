
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    saved: [String]
    campdata: [String]
  }

  type CampGround {
    _id: ID!
    name: String!
    location: String!
    image: String
    availability: Int
    available: Boolean!
    price: Int
    campImages: [String]

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

  type UserSavedCamps {
    user: User!
    savedCamps: [CampGround!]!
    bookings: [Booking!]
  }

  type PaymentResponse {
    clientSecret: String!
  }


  type Query {
    userById(id: ID!): User
    allUsers: [User]
    campById(id: ID!): CampGround
    getArrayOfCamps(ids: [ID!]!): [CampGround!]!
    getCampsAndBookingByUserId(userId: ID!): UserSavedCamps!
    allCamps: [CampGround]
    campByLocation(location: String!): [CampGround]
    allReviews: [Review]
    campReviews(campId: ID!): [Review]
    allBookings:[Booking]
    bookingByUserId(userId: ID!): [Booking!]
    userReviews(id: ID!):[Review]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
    userLogin(email: String!, password: String!): User!
    editUser(userId: ID!, firstName: String, lastName: String, email: String) : User
    deleteUser(id: ID!): User
    saveCamp(userId: ID!, campId: ID!): User
    deleteSavedCamp(userId: ID!, campId: ID!): User
    createReview(userId: ID!, campId: ID!, rating: Float!, text: String!): Review!
    createBooking(userId:ID!, campId: ID!, startDate: String!, endDate: String!): Booking!
    cancelBooking(id: ID!):Booking
    createPaymentIntent(amount: Int!): PaymentResponse!
  }
`

module.exports = typeDefs;