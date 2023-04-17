import { gql } from '@apollo/client';


export const QUERY_ALLCAMPS = gql`
query AllCamps {
  allCamps {
    _id
    name
    location
    price
    image
    available
    availability
  }
}
`;

export const QUERY_ME = gql`
  query Query($userId: ID!) {
    userById(id: $userId) {
      _id
      email
      firstName
      lastName
      saved
      campdata
    }
  }
`

export const QUERY_CAMPGROUNDBYLOCATION = gql`
query Query($location: String!) {
  campByLocation(location: $location) {
    _id
    name
    location
    price
    image
    available
    availability
  }
}

`;

export const QUERY_CAMPBYARRAY = gql`
query Query($ids: [ID!]!) {
  getArrayOfCamps(ids: $ids) {
    _id
    availability
    available
    image
    location
    name
    price
  }
}
`;

export const QUERY_CAMPBYID = gql`
query Query($campById: ID!) {
  campById(id: $campById) {
    _id
    availability
    available
    location
    name
    price
    campImages
  }
}
`;

export const GET_CAMP_REVIEWS = gql`
  query Query($campId: ID!) {
    campReviews(campId: $campId) {
      _id
      rating
      text
      user {
        firstName
        lastName
      }
    }
  }
`

export const GET_USER_SAVECAMP = gql`
query Query($userId: ID!) {
  getUserAndSavedCamps(userId: $userId) {
    savedCamps {
      _id
      name
      image
      location
      price
    }
    user {
      _id
      email
      saved
    }
  }
}
`
export const GET_USER_BOOKING = gql`
query Query($userId: ID!) {
  bookingByUserId(userId: $userId) {
    _id
    camp {
      image
      location
      name
      price
    }
    startDate
    endDate
  }
}
`