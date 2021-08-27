const Category = require("../../models/Category");
const User = require("../../models/User");

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
  },
};
