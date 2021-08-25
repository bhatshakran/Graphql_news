const { AuthenticationError } = require("apollo-server-express");
const User = require("../../models/User");
const authorize = require("../../middlewares/Authorize");

module.exports = {
  Query: {
    getUser: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);
        const user = await User.findById(args.id);
        if (!user) {
          throw new AuthenticationError("User could not be found!");
        }
        console.log(req._id);

        if (req._id.toString() !== user._id.toString()) {
          throw new AuthenticationError("You dont own this user");
        }

        return user;
      } catch (err) {
        throw err;
      }
    },
  },
};
