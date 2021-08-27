const sortingHelper = (sort) => {
  let sortArgs = { sortBy: "_id", order: "asc", limit: "10", skip: "0" };

  for (key in sort) {
    if (sort[key]) {
      sortArgs[key] = sort[key];
    }
  }
  return sortArgs;
};

module.exports = sortingHelper;
