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
      console.error(error);
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
      console.error(error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <strong>@{post.author.username}</strong>
      </div>

      {post.text && <p className="post-text">{post.text}</p>}

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="post-image"
        />
      )}

      <div className="post-actions">
        <button
          onClick={handleLike}
          className={hasLiked ? "liked" : ""}
        >
          {hasLiked ? "❤️ Liked" : "♡ Like"}
        </button>

        <span>
          {post.likes.length}{" "}
          {post.likes.length === 1 ? "like" : "likes"}
        </span>
      </div>

      <div className="comments">
        <h4>Comments</h4>

        {post.comments.map((item) => (
          <div className="comment" key={item._id}>
            <strong>@{item.username}</strong>
            <span>{item.text}</span>
          </div>
        ))}

        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;