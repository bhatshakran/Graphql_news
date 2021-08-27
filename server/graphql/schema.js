const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getUser(id: ID!): User!
  }

  type Mutation {
    updateUserEmailPass(email: String!, password: String!, id: ID!): User!
    updateUserProfile(name: String!, lastname: String!, id: ID!): User!
    loginUser(fields: AuthInput!): User!
    signUp(fields: AuthInput): User!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    name: String
    lastname: String
    token: String
  }

  input AuthInput {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
