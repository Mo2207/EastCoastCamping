import { gql } from '@apollo/client';

// createUser Query
export const CREATE_USER = gql`
  mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      email
      password
      firstName
      lastName
      _id
    }
  }
`;

// createReview Query
export const CREATE_REVIEW = gql`
mutation CreateReview($userId: ID!, $campId: ID!, $rating: Float!, $text: String!) {
  createReview(userId: $userId, campId: $campId, rating: $rating, text: $text) {
    _id
    camp {
      _id
      image
      location
      name
    }
    rating
    text
    user {
      _id
      email
      firstName
      lastName
    }
  }
}
`;

export const USER_LOGIN = gql `
mutation Mutation($email: String!, $password: String!) {
  userLogin(email: $email, password: $password) {
    _id
    campdata
    email
    firstName
    lastName
    saved
  }
}
`;

export const EDIT_ME = gql `
  mutation Mutation($userId: ID!, $firstName: String, $lastName: String, $email: String) {
    editUser(userId: $userId, firstName: $firstName, lastName: $lastName, email: $email) {
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_ME = gql `
mutation Mutation($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    _id
  }
}
`

export const SAVE_CAMP = gql `
mutation Mutation($userId: ID!, $campId: ID!) {
  saveCamp(userId: $userId, campId: $campId) {
    saved
  }
}
`
export const DELETE_CAMP = gql `
mutation DeleteSavedCamp($userId: ID!, $campId: ID!) {
  deleteSavedCamp(userId: $userId, campId: $campId) {
    _id
  }
}
`
export const BOOK_CAMP = gql`
mutation Mutation($userId: ID!, $campId: ID!, $startDate: Date!, $endDate: Date!, $price: Int) {
  createBooking(userId: $userId, campId: $campId, startDate: $startDate, endDate: $endDate, price: $price) {
    bookingID
  }
}

`