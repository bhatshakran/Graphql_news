const userOwnership = (req, valueToCompare) => {
    console.log(req._id, "1");
  if (req._id.toString() !== valueToCompare.toString()) {
    return false;
  }
  return true;
};

module.exports = userOwnership;
