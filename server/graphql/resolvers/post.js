const Category = require("../../models/Category");

module.exports = {
  Post: {
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
