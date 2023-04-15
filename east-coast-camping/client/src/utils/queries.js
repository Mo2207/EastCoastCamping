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
query Query($location: String!) {
  campByLocation(location: $location) {
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

export const QUERY_CAMPBYARRAY = gql`
query GetArrayOfCamps($ids: [ID!]!) {
  getArrayOfCamps(ids: $ids) {
    image
    location
    name
    price
    _id
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