const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  creator: {
    type: String,
    required: [true, "Creator is required"],
  },
  tags: [String],
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
