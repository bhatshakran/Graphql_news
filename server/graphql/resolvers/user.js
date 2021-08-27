const Post = require("../../models/Post");
const Category = require("../../models/Category");

module.exports = {
  User: {
    // post: async (parent, args, context, info) => {},
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
