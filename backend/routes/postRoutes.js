const express = require("express");

const {
  createPost,
  getPosts,
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public feed
router.get("/", getPosts);

// Protected create post
router.post("/", authMiddleware, createPost);

module.exports = router;