const User = require("../../models/User");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    signUp: async (parent, args, context, info) => {
      try {
        const user = await User.create({
          email: args.fields.email,
          password: args.fields.password,
        });

        const token = user.getSignedJwtToken();

        if (!token) {
          throw new AuthenticationError("Couldnt get token, try again");
        } else {
          const result = await user.save();

          return { ...result._doc };
        }
      } catch (err) {
        if (err.code === 11000) {
          throw new AuthenticationError("Duplicate Entry, user already exits!");
        }
        throw err;
      }
    },
  },
};
