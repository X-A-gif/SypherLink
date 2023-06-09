const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Chat {
    _id: ID
    chat: String
    sentBy: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    username: User
    chats: [Chat]
  }

  type Mutation {
    saveChat(chat: String!, sentBy: String!): Chat
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
