const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

// Hash user password before saving

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } else {
    next();
  }
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  this.token = token;
  return token;
};

// Match user entered password to hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
