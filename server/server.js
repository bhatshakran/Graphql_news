const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/connect");
const typeDefs = require("./graphql/schema");

const { Query } = require("./graphql/resolvers/query");
const { Mutation } = require("./graphql/resolvers/mutation");

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
  },
  context: ({ req }) => {
    req.headers.authorization =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjY0MThkNzdkNjRlZDZiYTg5MDA1ZiIsImlhdCI6MTYyOTg5NzEwMSwiZXhwIjoxNjMwNTAxOTAxfQ.37pJ87nOCdbUzl9be32eL5UUEPLwJIs-FN4_nIUbt_w";
    return { req };
  },
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
