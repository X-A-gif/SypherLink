import { gql } from '@apollo/client';

export const GET_USERNAME = gql`
  query GET_USERNAME {
    username {  
      _id
      username
    }
  }
`;
export const GET_CHATS = gql`
  query GET_CHATS {
    chats {  
      _id
      chat
      sentBy
      roomID
    }
  }
`;

