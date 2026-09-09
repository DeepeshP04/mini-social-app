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

module.exports = {
  createPost,
  getPosts,
};