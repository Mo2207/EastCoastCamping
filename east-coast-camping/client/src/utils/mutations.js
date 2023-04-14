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
  mutation Mutation($userId: ID!, $campId: ID!, $rating: Float!, $text: String!) {
    createReview(userId: $userId, campId: $campId, rating: $rating, text: $text) {
      user {
        _id
      }
      camp {
        _id
      }
      rating
      text
    }
  }
`;

export const USER_LOGIN = gql `
  mutation Mutation($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      _id
      email
      firstName
      lastName
    }
  }
`
