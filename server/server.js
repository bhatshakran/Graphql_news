const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const app = express();
const server = new ApolloServer({});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
