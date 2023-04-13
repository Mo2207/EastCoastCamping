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