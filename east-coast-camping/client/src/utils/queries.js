import { gql } from '@apollo/client';


export const QUERY_ALLCAMPS = gql`
query AllCamps {
  allCamps {
    _id
    name
    availability
    available
    location
    image
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
    location
    name
    price
  }
}
`;

export const QUERY_CAMPBYARRAY = gql`
query GetArrayOfCamps($ids: [ID!]!) {
  getArrayOfCamps(ids: $ids) {
    _id
    availability
    available
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