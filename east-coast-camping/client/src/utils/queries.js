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

export const QUERY_SINGLEUSER = gql`
query AllCamps($userByIdId: ID!) {
  userById(id: $userByIdId) {
    firstName
    lastName
    email
    favourites {
      name
    }
  }
}
`;

export const QUERY_USER = `
{
  "data": {
    "user": [
      {
        "_id": "642ca7787b1f7217589b0a56",
        "name": "Tin of Cookies",
        "description": "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        "price": 2.99,
        "quantity": 500,
        "image": "cookie-tin.jpg",
        "category": {
          "_id": "642ca7777b1f7217589b0a4f"
        }
      }
    ]
  }
}
`