import { gql } from '@apollo/client';

export const QUERY_TECH = gql`
  query tech {
    tech {
      _id
      name
    }
  }
`;

export const QUERY_MATCHUPS = gql`
  query matchups($_id: String) {
    matchups(_id: $_id) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
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