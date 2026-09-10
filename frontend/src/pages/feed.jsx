import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import api from "../services/api";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] =
    useState("all");

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");

      setPosts(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch posts:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [
      newPost,
      ...prev,
    ]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === updatedPost._id
          ? updatedPost
          : post
      )
    );
  };

  /*
    FILTER + SEARCH
  */

  const getFilteredPosts = () => {
    let result = [...posts];

    /*
      SEARCH
    */

    const searchText =
      search.trim().toLowerCase();

    if (searchText) {
      result = result.filter((post) => {
        const username =
          post.author?.username
            ?.toLowerCase() || "";

        const text =
          post.text?.toLowerCase() || "";

        return (
          username.includes(searchText) ||
          text.includes(searchText)
        );
      });
    }

    /*
      SORT
    */

    if (activeFilter === "mostLiked") {
      result.sort(
        (a, b) =>
          b.likes.length -
          a.likes.length
      );
    }

    if (
      activeFilter === "mostCommented"
    ) {
      result.sort(
        (a, b) =>
          b.comments.length -
          a.comments.length
      );
    }

    if (activeFilter === "recent") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    /*
      ALL POST
      newest first
    */

    if (activeFilter === "all") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    return result;
  };

  const filteredPosts =
    getFilteredPosts();

  return (
    <div className="social-page">
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <main className="feed-page">
        <div className="feed-content">

          {/* CREATE POST */}

          <CreatePost
            onPostCreated={handlePostCreated}
          />

          {/* FILTERS */}

          <div className="feed-filters">
            <button
              className={
                activeFilter === "all"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("all")
              }
            >
              All Post
            </button>

            <button
              className={
                activeFilter ===
                "mostLiked"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter(
                  "mostLiked"
                )
              }
            >
              Most Liked
            </button>

            <button
              className={
                activeFilter ===
                "mostCommented"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter(
                  "mostCommented"
                )
              }
            >
              Most Commented
            </button>

            <button
              className={
                activeFilter === "recent"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter("recent")
              }
            >
              Recent
            </button>
          </div>

          {/* SEARCH RESULT INFO */}

          {search.trim() && (
            <div className="search-result-info">
              <span>
                Search results for "
                <strong>{search}</strong>"
              </span>

              <button
                onClick={() =>
                  setSearch("")
                }
              >
                Clear
              </button>
            </div>
          )}

          {/* POSTS */}

          {loading ? (
            <div className="empty-state">
              <p>Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-state">
              <h3>
                {search.trim()
                  ? "No posts found"
                  : "No posts yet"}
              </h3>

              <p>
                {search.trim()
                  ? "Try a different search."
                  : "Be the first person to share something!"}
              </p>
            </div>
          ) : (
            <div className="posts-container">
              {filteredPosts.map(
                (post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onPostUpdated={
                      handlePostUpdated
                    }
                  />
                )
              )}
            </div>
          )}
        </div>
      </main>

      <button
        className="floating-create-button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <Plus size={30} />
      </button>
    </div>
  );
};

export default Feed;