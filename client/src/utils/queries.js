import { gql } from '@apollo/client';

export const GET_USERNAME = gql`
  query GET_USERNAME {
    user {
      _id
      username
    }
  }
`;
