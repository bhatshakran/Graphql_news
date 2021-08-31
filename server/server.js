const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/connect");
const typeDefs = require("./graphql/schema");

const { Query } = require("./graphql/resolvers/query");
const { Mutation } = require("./graphql/resolvers/mutation");
const { User } = require("./graphql/resolvers/user");
const { Post } = require("./graphql/resolvers/post");
const { Category } = require("./graphql/resolvers/category");

// Load env vars
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

// Connect to database
connectDB();

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Category,
  },
  context: ({ req }) => {
    return { req };
  },
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
