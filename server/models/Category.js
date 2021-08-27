const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    required: true,
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    maxlenght: 250,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
