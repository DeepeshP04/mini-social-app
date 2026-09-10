import { useRef, useState } from "react";

import {
  Camera,
  Smile,
  AlignJustify,
  Send,
} from "lucide-react";

import api from "../services/api";

const emojis = [
  "😀",
  "😂",
  "😍",
  "🥰",
  "😊",
  "😎",
  "🤔",
  "😢",
  "😡",
  "🤣",
  "❤️",
  "🔥",
  "👍",
  "👏",
  "🎉",
  "✨",
  "💯",
  "🙏",
  "🚀",
  "⭐",
];

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

  const fileInputRef = useRef(null);

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji);

    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && !image) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("text", text);

      if (image) {
        formData.append("image", image);
      }

      const response = await api.post(
        "/posts",
        formData
      );

      onPostCreated(response.data.post);

      setText("");
      setImage(null);
      setShowEmojiPicker(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(
        "Failed to create post:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-card">
      <div className="create-post-header">
        <h2>Create Post</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="What's on your mind?"
          maxLength={1000}
        />

        {/* EMOJI PICKER */}

        {showEmojiPicker && (
          <div className="emoji-picker">
            {emojis.map((emoji) => (
              <button
                type="button"
                key={emoji}
                onClick={() =>
                  addEmoji(emoji)
                }
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* SELECTED IMAGE */}

        {image && (
          <div className="selected-image">
            <span>{image.name}</span>

            <button
              type="button"
              onClick={() => {
                setImage(null);

                if (fileInputRef.current) {
                  fileInputRef.current.value =
                    "";
                }
              }}
            >
              ×
            </button>
          </div>
        )}

        <div className="create-post-footer">
          <div className="post-tools">
            {/* IMAGE */}

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              title="Add image"
            >
              <Camera size={24} />
            </button>

            {/* EMOJI */}

            <button
              type="button"
              onClick={() =>
                setShowEmojiPicker(
                  (prev) => !prev
                )
              }
              title="Add emoji"
              className={
                showEmojiPicker
                  ? "emoji-active"
                  : ""
              }
            >
              <Smile size={24} />
            </button>

          </div>

          <button
            type="submit"
            className={`create-submit ${
              text.trim() || image
                ? "ready"
                : ""
            }`}
            disabled={
              loading ||
              (!text.trim() && !image)
            }
          >
            <Send
              size={22}
              fill="currentColor"
            />

            <span>
              {loading
                ? "Posting..."
                : "Post"}
            </span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />
      </form>
    </div>
  );
};

export default CreatePost;