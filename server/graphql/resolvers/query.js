const { AuthenticationError } = require("apollo-server-express");
const User = require("../../models/User");

module.exports = {
  Query: {
    getUser: async (parent, args, context, info) => {
      try {
        const user = await User.findById(args.id);

        if (!user) {
          throw new AuthenticationError("User could not be found!");
        }

        return user;
      } catch (err) {
        throw err;
      }
    },
  },
};
