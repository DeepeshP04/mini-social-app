const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const postSchema = new mongoose.Schema(
  {
    author: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      username: {
        type: String,
        required: true,
      },
    },

    text: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    likes: [likeSchema],

    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);