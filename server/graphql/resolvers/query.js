const { AuthenticationError } = require("apollo-server-express");
const User = require("../../models/User");
const authorize = require("../../middlewares/Authorize");
const Category = require("../../models/Category");

module.exports = {
  Query: {
    getUser: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);
        const user = await User.findById(args.id);
        if (!user) {
          throw new AuthenticationError("User could not be found!");
        }

        if (req._id.toString() !== user._id.toString()) {
          throw new AuthenticationError("You dont own this user");
        }

        return user;
      } catch (err) {
        throw err;
      }
    },
    categories: async (parent, args, context, info) => {
      try {
        let query = {};
        if (args.catId) {
          query["_id"] = args.catId;
        }
        const categories = await Category.find(query);
        return categories;
      } catch (err) {
        throw err;
      }
    },
  },
};
