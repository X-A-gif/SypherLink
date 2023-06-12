import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
  `;
  export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const SAVE_CHAT = gql`
  mutation saveChat($chat: String!, $sentBy: String!, $roomID: String!) {
    saveChat(chat: $chat, sentBy: $sentBy, roomID: $roomID) {
      _id
      chat
      sentBy
      roomID
    }
  }
`;