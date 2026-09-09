const express = require("express");

const {
  createPost,
  getPosts,
  likePost,
  commentOnPost
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public feed
router.get("/", getPosts);

// Protected create post
router.post("/", authMiddleware, createPost);
router.post("/:id/like", authMiddleware, likePost)
router.post("/:id/comments", authMiddleware, commentOnPost)

module.exports = router;