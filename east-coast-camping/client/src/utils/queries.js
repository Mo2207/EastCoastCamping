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
  query Query($userByIdId: ID!) {
    userById(id: $userByIdId) {
      email
      firstName
      lastName
      _id
    }
  }

`


export const QUERY_CAMPGROUNDBYLOCATION = gql`
query CampByLocation($location: String!) {
  campByLocation(location: $location) {
    name
    location
    price
    available
  }
}
`;