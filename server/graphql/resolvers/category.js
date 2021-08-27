const Post = require("../../models/Post");
const User = require("../../models/User");

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
    author: async (parent, args, context, info) => {
      try {
        const author = await User.findOne({ _id: parent.author });

        return author;
      } catch (err) {
        throw err;
      }
    },
  },
};
