import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const PostCard = ({ post, onPostUpdated }) => {
  const { token, user } = useAuth();
  const [comment, setComment] = useState("");

  const hasLiked = post.likes.some(
    (like) => String(like.userId) === String(user?.id)
  );

  const handleLike = async () => {
    try {
      const response = await api.post(
        `/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostUpdated({
        ...post,
        likes: response.data.likes,
      });
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      const response = await api.post(
        `/posts/${post._id}/comments`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostUpdated({
        ...post,
        comments: response.data.comments,
      });

      setComment("");
    } catch (error) {
      console.error("Comment failed:", error);
    }
  };

  return (
    <article className="post-card">
      <div className="post-header">
        <div className="avatar">
          {post.author.username
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <strong>@{post.author.username}</strong>

          <small>
            {new Date(post.createdAt).toLocaleString()}
          </small>
        </div>
      </div>

      {post.text && (
        <p className="post-text">{post.text}</p>
      )}

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="post-image"
        />
      )}

      <div className="post-stats">
        <span>
          {post.likes.length}{" "}
          {post.likes.length === 1 ? "Like" : "Likes"}
        </span>

        <span>
          {post.comments.length}{" "}
          {post.comments.length === 1
            ? "Comment"
            : "Comments"}
        </span>
      </div>

      <div className="post-actions">
        <button
          className={hasLiked ? "liked" : ""}
          onClick={handleLike}
        >
          {hasLiked ? "❤️ Liked" : "♡ Like"}
        </button>
      </div>

      <div className="comments-section">
        {post.comments.map((item) => (
          <div className="comment" key={item._id}>
            <strong>@{item.username}</strong>
            <span>{item.text}</span>
          </div>
        ))}

        <form
          className="comment-form"
          onSubmit={handleComment}
        >
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </article>
  );
};

export default PostCard;