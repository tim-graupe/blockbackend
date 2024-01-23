var express = require("express");
var router = express.Router();
const new_post = require("../controllers/posts-controller");
const userController = require("../controllers/user-controller");

router.get("/", function (req, res, next) {
  res.send({ user: req.user, isAuth: req.isAuthenticated() });
});

router.post("/new_post", new_post.newPost);

router.get("/posts", new_post.getPosts);

router.get("/posts/:id/comments", new_post.getComments);

router.get("/posts/:id", new_post.getOnePost);

router.post("/posts/:id/new_comment", new_post.addComment);

router.get("/posts/:id/my_posts", new_post.getUserPosts);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.post("/register", userController.register);

router.delete("/delete/post/:id", new_post.deletePost);

module.exports = router;
