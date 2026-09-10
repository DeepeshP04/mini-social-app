import { useState } from "react";

import {
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Send,
  Flag,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const PostCard = ({
  post,
  onPostUpdated,
}) => {
  const { user } = useAuth();

  const [comment, setComment] = useState("");

  const [showReportBox, setShowReportBox] =
    useState(false);

  const hasLiked = post.likes.some(
    (like) =>
      String(like.userId) ===
      String(user?.id)
  );

  const handleLike = async () => {
    try {
      const response = await api.post(
        `/posts/${post._id}/like`
      );

      onPostUpdated({
        ...post,
        likes: response.data.likes,
      });
    } catch (error) {
      console.error(
        "Like failed:",
        error
      );
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      const response = await api.post(
        `/posts/${post._id}/comments`,
        {
          text: comment,
        }
      );

      onPostUpdated({
        ...post,
        comments: response.data.comments,
      });

      setComment("");
    } catch (error) {
      console.error(
        "Comment failed:",
        error
      );
    }
  };

  const handleReport = (reason) => {
    console.log(
      "Reported post:",
      post._id,
      "Reason:",
      reason
    );

    setShowReportBox(false);

    alert(
      "Thanks for your report. We will review this post."
    );
  };

  const username =
    post.author?.username || "User";

  return (
    <>
      <article className="post-card">
        {/* HEADER */}

        <div className="post-header">
          <div className="post-avatar">
            {username
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="post-user-info">
            <div className="post-user-name">
              <strong>{username}</strong>

              <button
                className="more-button"
                onClick={() =>
                  setShowReportBox(
                    !showReportBox
                  )
                }
                title="More options"
              >
                <MoreHorizontal size={24} />
              </button>
            </div>

            <span className="post-username">
              @{username}
            </span>

            <span className="post-time">
              {new Date(
                post.createdAt
              ).toLocaleString()}
            </span>
          </div>
        </div>

        {/* POST CONTENT */}

        {post.text && (
          <div className="post-content">
            {post.text}
          </div>
        )}

        {post.image && (
          <div className="post-image-wrapper">
            <img
              src={post.image}
              alt="Post"
              className="post-image"
            />
          </div>
        )}

        {/* STATS */}

        <div className="post-stats">
          <span>
            {post.likes.length}{" "}
            {post.likes.length === 1
              ? "Like"
              : "Likes"}
          </span>

          <span>
            {post.comments.length}{" "}
            {post.comments.length === 1
              ? "Comment"
              : "Comments"}
          </span>
        </div>

        {/* ACTIONS */}

        <div className="post-actions">
          <button
            onClick={handleLike}
            className={
              hasLiked ? "liked" : ""
            }
          >
            <Heart
              size={24}
              fill={
                hasLiked
                  ? "currentColor"
                  : "none"
              }
            />

            <span>Like</span>
          </button>

          <button>
            <MessageSquare size={24} />
            <span>Comment</span>
          </button>

          <button>
            <Share2 size={24} />
            <span>Share</span>
          </button>
        </div>

        {/* COMMENTS */}

        {post.comments.length > 0 && (
          <div className="comments-section">
            <h3>
              Comments (
              {post.comments.length})
            </h3>

            {post.comments.map(
              (item) => (
                <div
                  className="comment"
                  key={item._id}
                >
                  <div className="comment-avatar">
                    {item.username
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="comment-body">
                    <div className="comment-user">
                      <strong>
                        {item.username}
                      </strong>

                      <span>
                        @{item.username}
                      </span>
                    </div>

                    <small>
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </small>

                    <p>
                      {item.text}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* COMMENT INPUT */}

        <form
          className="comment-form"
          onSubmit={handleComment}
        >
          <div className="comment-input">
            <span>☺</span>

            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
            />
          </div>

          <button type="submit">
            <Send
              size={23}
              fill="currentColor"
            />
          </button>
        </form>
      </article>

      {/* REPORT BOX */}

      {showReportBox && (
        <div
          className="report-overlay"
          onClick={() =>
            setShowReportBox(false)
          }
        >
          <div
            className="report-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="report-header">
              <div className="report-icon">
                <Flag size={21} />
              </div>

              <div>
                <h3>Report Post</h3>

                <p>
                  Why are you reporting this
                  post?
                </p>
              </div>
            </div>

            <div className="report-options">
              <button
                onClick={() =>
                  handleReport("Spam")
                }
              >
                Spam
              </button>

              <button
                onClick={() =>
                  handleReport(
                    "Not relevant post"
                  )
                }
              >
                Not relevant post
              </button>

              <button
                onClick={() =>
                  handleReport("Abuse")
                }
              >
                Abuse
              </button>

              <button
                onClick={() =>
                  handleReport(
                    "Adult content"
                  )
                }
              >
                Adult content
              </button>

              <button
                onClick={() =>
                  handleReport("Scam")
                }
              >
                Scam
              </button>
            </div>

            <button
              className="cancel-report"
              onClick={() =>
                setShowReportBox(false)
              }
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;