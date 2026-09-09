import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const CreatePost = ({ onPostCreated }) => {
  const { token } = useAuth();

  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && !image.trim()) {
      setError("Write something or add an image");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/posts",
        {
          text,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostCreated(response.data.post);

      setText("");
      setImage("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">

      <h3>Create a Post</h3>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
        />

        <input
          type="url"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>

      </form>
    </div>
  );
};

export default CreatePost;