import { gql } from '@apollo/client';


export const QUERY_ALLCAMPS = gql`
query Query {
  allCamps {
    _id
    available
    availability
    campImages
    features
    image
    location
    name
    price
    reviews {
      _id
      rating
      text
    }
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
query CampByLocation($location: String!) {
  campByLocation(location: $location) {
    _id
    availability
    available
    campImages
    features
    image
    location
    name
    price
    reviews {
      rating
      text
    }
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
    camp {
      image
      features
      location
      name
      price
    }
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
export const GET_USER_BOOKING_SAVED = gql`
query Query($userId: ID!) {
  getCampsAndBookingByUserId(userId: $userId) {
    savedCamps {
      image
      name
      location
      _id
      price
      features
    }
    user {
      email
      firstName
      lastName
    }
    userBookings {
      camp {
        image
        location
        name
        price
      }
      endDate
      startDate
    }
  }
}
`

export const GET_USER_BOOKING = gql`
query Query($userId: ID!) {
  bookingByUserId(userId: $userId) {
    bookingID
    startDate
    endDate
    totalN
    price
    totalP
    camp {
      image
      location
      name
      price
    }
    user {
      email
      firstName
      lastName
    }
  }
}
`