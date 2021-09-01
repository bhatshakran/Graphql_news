const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

const authorize = (req) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //Make sure token exists
  if (!token) {
    throw new AuthenticationError("Not authorized to access this route");
  }

  try {
    //    Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req._id = decoded.id;
    return req;
  } catch (error) {
    throw new AuthenticationError("Couldnt verify the user, try again!");
  }
};

module.exports = authorize;
