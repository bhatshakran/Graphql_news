const { AuthenticationError } = require("apollo-server-express");
const User = require("../../models/User");
const authorize = require("../../middlewares/Authorize");
const Category = require("../../models/Category");
const Post = require("../../models/Post");
const sortingHelper = require("../../middlewares/sorting");

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
    isAuth: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req, true);
        if (!req._id) {
          throw new AuthenticationError("Bad token");
        }
        const user = await User.findById(req._id);

        return user;
      } catch (err) {
        throw err;
      }
    },
    getCategories: async (parent, args, context, info) => {
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
    getPost: async (parent, args, context, info) => {
      try {
        const post = await Post.findById(args.id);

        return post;
      } catch (err) {
        throw err;
      }
    },
    getPosts: async (parent, args, context, info) => {
      try {
        let queryByArgs = {};
        let sortArgs = sortingHelper(args.sort);

        if (args.queryBy) {
          queryByArgs[args.queryBy.key] = args.queryBy.value;
        }

        const posts = await Post.find(queryByArgs)
          .sort([[sortArgs.sortBy, sortArgs.order]])
          .skip(sortArgs.skip)
          .limit(sortArgs.limit);

        return posts;
      } catch (err) {
        throw err;
      }
    },
  },
};
