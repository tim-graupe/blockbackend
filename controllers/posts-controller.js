const Post = require("../models/blog-post.schema");
const Comment = require("../models/comment.schema");
exports.newPost = async function (req, res, next) {
  try {
    let newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });
    await newPost.save();
  } catch (err) {
    res.status(500).json({ error: "Error found :o", err });
  }
};

exports.getPosts = async function (req, res, next) {
  let posts = await Post.find()
    .populate({
      path: "user",
      select: " -password",
    })
    .exec();
  return res.status(200).json({ postList: posts, user: req.user });
};

exports.getUserPosts = async function (req, res, next) {
  try {
    console.log(req.user._id);
    let posts = await Post.find({ user: req.user._id });
    return res.status(200).json({ postList: posts, user: req.user });
  } catch (err) {
    res.status(500).json({ error: "Error found", err });
  }
};

exports.getOnePost = async function (req, res, next) {
  try {
    let post = await Post.findById(req.params.id);
    return res.status(200).send(post);
  } catch (err) {
    console.log("error ==>", err);
  }
};

exports.addComment = async function (req, res, next) {
  try {
    let post = await Post.findById(req.params.id);
    const newComment = new Comment({
      content: req.body.content,
      user: req.user._id,
      time: new Date(),
    });

    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json({ success: true, comment: newComment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

exports.getComments = async function (req, res, next) {
  try {
    let post = await Post.findById(req.params.id)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username",
        },
      })
      .exec();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async function (req, res, next) {
  try {
    let post = await Post.deleteOne({ _id: req.params.id });
    await post.save();
    return res.status(200).json({ msg: "Post successfully deleted" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
