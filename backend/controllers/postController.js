const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    // At least text or image is required
    if (!text?.trim() && !image) {
      return res.status(400).json({
        message: "Post must contain text or an image",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const post = await Post.create({
      author: {
        userId: user._id,
        username: user.username,
      },

      text: text?.trim() || "",

      image: image || "",

      likes: [],

      comments: [],
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check whether user already liked the post
    const alreadyLiked = post.likes.some(
      (like) => like.userId.toString() === req.user.userId
    );

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(
        (like) => like.userId.toString() !== req.user.userId
      );
    } else {
      // Like
      post.likes.push({
        userId: user._id,
        username: user.username,
      });
    }

    await post.save();

    res.status(200).json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    post.comments.push({
      userId: user._id,
      username: user.username,
      text: text.trim(),
    });

    await post.save();

    res.status(201).json({
      message: "Comment added",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  likePost,
  commentOnPost
};