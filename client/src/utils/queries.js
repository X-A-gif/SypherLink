import { gql } from '@apollo/client';

export const GET_USERNAME = gql`
  query GET_USERNAME {
    username {  
      _id
      username
    }
  }
`;
