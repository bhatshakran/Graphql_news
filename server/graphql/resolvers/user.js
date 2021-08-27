const Post = require("../../models/Post");
const Category = require("../../models/Category");

module.exports = {
  User: {
    posts: async (parent, args, context, info) => {
      try {
        const posts = await Post.find({ author: parent._id });
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
