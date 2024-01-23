const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: { type: String },
  score: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);
