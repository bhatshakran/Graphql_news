const Post = require("../../models/Post");

module.exports = {
  Category: {
    posts: async (parent, args, context, info) => {
      try {
        const posts = await Post.find({ category: parent._id });

        return posts;
      } catch (err) {
        throw err;
      }
    },
  },
};
