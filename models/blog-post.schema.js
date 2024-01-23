const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  score: { type: Number },
  time: { type: Date, default: Date.now },
  file: { type: String },
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
