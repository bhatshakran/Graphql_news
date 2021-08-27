const User = require("../../models/User");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    authUser: async (parent, args, context, info) => {
      try {
        const user = await User.findOne({ email: args.fields.email });
        // Check if the user exists in the database
        if (!user) {
          throw new AuthenticationError("User does not exist!");
        }

        // Compare password
        const passwordCheck = await user.matchPassword(args.fields.password);

        // Throw error if password doesn't match
        if (!passwordCheck) {
          throw new AuthenticationError("Wrong Password!");
        }

        const token = await user.getSignedJwtToken();
        if (!token) {
          throw new AuthenticationError("Couldnt get the token, try again!");
        }

        return {
          _id: user._id,
          email: user.email,
          token: token,
        };
      } catch (err) {
        throw err;
      }
    },
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
    updateUserProfile: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);
      } catch (err) {
        throw err;
      }
    },
  },
};
