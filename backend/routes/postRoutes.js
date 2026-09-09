const express = require("express");

const {
  createPost,
  getPosts,
  likePost,
  commentOnPost,
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getPosts);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createPost
);

router.post(
  "/:id/like",
  authMiddleware,
  likePost
);

router.post(
  "/:id/comments",
  authMiddleware,
  commentOnPost
);

module.exports = router;