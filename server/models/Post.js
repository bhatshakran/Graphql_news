const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      maxlength: 100,
    },
    excerpt: {
      required: true,
      type: String,
      maxlength: 1000,
    },
    content: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: "DRAFT",
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLIC"],
      default: "DRAFT",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Post", postSchema);
