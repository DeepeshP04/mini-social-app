import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";

const Feed = () => {
  const { token } = useAuth();

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
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  return (
    <>
      <Navbar />

      <main className="feed-container">
        <h1>Social Feed</h1>

        {token && (
          <CreatePost onPostCreated={handlePostCreated} />
        )}

        <section className="posts-container">
          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p>No posts yet. Create the first post!</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onPostUpdated={handlePostUpdated}
              />
            ))
          )}
        </section>
      </main>
    </>
  );
};

export default Feed;