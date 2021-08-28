const Category = require("../../models/Category");
const User = require("../../models/User");
const Post = require("../../models/Post");
const sortingHelper = require("../../middlewares/sorting");

module.exports = {
  Post: {
    author: async (parent, args, context, info) => {
      try {
        const author = await User.findOne({ _id: parent.author });

        return author;
      } catch (err) {
        throw err;
      }
    },
    category: async (parent, args, context, info) => {
      try {
        const category = await Category.findOne({ _id: parent.category });

        return category;
      } catch (err) {
        throw err;
      }
    },
    related: async (parent, { sort }, context, info) => {
      try {
        let sortArgs = sortingHelper(sort);

        const posts = await Post.find({ category: parent.category })
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
