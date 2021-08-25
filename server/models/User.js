const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  name: {
    type: String,
    minLength: 2,
  },
  lastname: {
    type: String,
    minLenngth: 2,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
