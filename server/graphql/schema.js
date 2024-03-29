const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getUser(id: ID!): User!
    isAuth: User!
    getCategories(catId: ID): [Category]!
    getPost(id: ID!): Post!
    getPosts(sort: SortInput, queryBy: QueryByString): [Post!]!
  }

  type Mutation {
    updateUserEmailPass(email: String!, password: String, id: ID!): User!
    updateUserProfile(name: String!, lastname: String!, id: ID!): User!
    loginUser(fields: AuthInput!): User!
    signUp(fields: AuthInput): User!
    createPost(fields: PostInput!): Post!
    updatePost(fields: PostInput!, postId: ID!): Post!
    deletePost(id: ID!): String!
    createCategory(name: String!): Category!
    updateCategory(catId: ID!, name: String!): Category!
    deleteCategory(catId: ID!): String!
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
    category: Category!
    related(sort: SortInput): [Post]!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    name: String
    lastname: String
    token: String
    posts(sort: SortInput): [Post!]!
    categories: [Category!]!
  }

  type Category {
    _id: ID!
    name: String!
    author: User!
    posts: [Post]
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
    category: ID
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input SortInput {
    sortBy: String
    order: String
    limit: Int
    skip: Int
  }

  input QueryByString {
    key: String
    value: String
  }
`;

module.exports = typeDefs;
