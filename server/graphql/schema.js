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
    createPost(fields: PostInput!): Post!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    excerpt: String!
    created_at: String!
    updated_at: String!
    author: User!
    status: PostStatus
  }

  type User {
    _id: ID!
    email: String!
    password: String
    name: String
    lastname: String
    token: String
  }

  enum PostStatus {
    PUBLIC
    DRAFT
  }

  input PostInput {
    title: String
    excerpt: String
    content: String
    status: PostStatus
  }

  input AuthInput {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
