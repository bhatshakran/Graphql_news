const User = require("../../models/User");
const authorize = require("../../middlewares/Authorize");
const { AuthenticationError } = require("apollo-server-express");
const userOwnership = require("../../middlewares/userOwnership");

module.exports = {
  Mutation: {
    loginUser: async (parent, args, context, info) => {
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

        // Check ownership of the user
        if (!userOwnership(req, args.id)) {
          throw new AuthenticationError("You dont own this user");
        }

        if (args.name.length < 2) {
          throw new AuthenticationError(
            "Name cannot be empty or less than 2 characters!"
          );
        }

        if (args.lastname.length < 2) {
          throw new AuthenticationError(
            "Lastname cannot be empty or less than 3 characters!"
          );
        }

        // update the user
        const user = await User.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            lastname: args.lastname,
          },
          {
            new: true,
            runValidators: true,
          }
        );

        return user;
      } catch (err) {
        throw err;
      }
    },
    updateUserEmailPass: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);

        // Check ownership of the user
        if (!userOwnership(req, args.id)) {
          throw new AuthenticationError("You dont own this user");
        }

        // Validate fields
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(args.email).toLowerCase()) === false) {
          throw new AuthenticationError(
            "Email is not valid! Check your email."
          );
        }

        if (args.password.length < 5) {
          throw new AuthenticationError(
            "Password cannot be empty or less than 5 characters!"
          );
        }

        // Update user
        const user = await User.findById(args.id);

        user.email = args.email;
        user.password = args.password;

        const token = await user.getSignedJwtToken();
        if (!token) {
          throw new AuthenticationError("Couldnt get the token, try again!");
        }
        await user.save();

        return user;
      } catch (err) {
        throw err;
      }
    },
  },
};