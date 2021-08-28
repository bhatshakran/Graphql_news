const Post = require("../../models/Post");
const Category = require("../../models/Category");
const sortingHelper = require("../../middlewares/sorting");

module.exports = {
  User: {
    posts: async (parent, { sort }, context, info) => {
      try {
        let sortArgs = sortingHelper(sort);
        const posts = await Post.find({ author: parent._id })
          .sort([[sortArgs.sortBy, sortArgs.order]])
          .skip(sortArgs.skip)
          .limit(sortArgs.limit);
        return posts;
      } catch (err) {
        throw err;
      }
    },
    categories: async (parent, args, context, info) => {
      try {
        const categories = await Category.find({ author: parent._id });

        return categories;
      } catch (err) {
        throw err;
      }
    },
  },
};
