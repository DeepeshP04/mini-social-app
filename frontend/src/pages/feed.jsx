import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  return (
    <>
      <Navbar />

      <main className="feed-page">
        <div className="feed-content">
          <CreatePost onPostCreated={handlePostCreated} />

          <div className="feed-title">
            <h1>Social Feed</h1>
            <p>See what everyone is sharing</p>
          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <h3>No posts yet</h3>
              <p>Be the first person to share something!</p>
            </div>
          ) : (
            <div className="posts-container">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onPostUpdated={handlePostUpdated}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Feed;