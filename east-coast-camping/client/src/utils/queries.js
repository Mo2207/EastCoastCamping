import { gql } from '@apollo/client';


export const QUERY_ALLCAMPS = gql`
query AllCamps {
  allCamps {
    _id
    name
    availability
    available
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
    }
  }

`


export const QUERY_CAMPGROUNDBYLOCATION = gql`
query AllCamps($location: String!) {
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

export const QUERY_CAMPBYID = gql`
query CampById($campById: ID!) {
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