const User = require("../../models/User");

module.exports = {
  Mutation: {
    signUp: async (parent, args, context, info) => {
      try {
        const user = await User.create({
          email: args.fields.email,
          password: args.fields.password,
        });

        const result = await user.save();

        return { ...result._doc };
      } catch (err) {
        throw err;
      }
    },
  },
};
