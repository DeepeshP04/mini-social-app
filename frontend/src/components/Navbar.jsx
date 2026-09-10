import { Search, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ search, setSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  useEffect(() => {
    document.body.classList.toggle(
      "dark-theme",
      darkMode
    );

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="top-navbar">
      <div className="navbar-top">
        <h1 className="brand">Social</h1>

        <div className="navbar-actions">
          {/* THEME */}

          <button
            className="icon-button"
            onClick={() =>
              setDarkMode((prev) => !prev)
            }
            title={
              darkMode
                ? "Light mode"
                : "Dark mode"
            }
          >
            {darkMode ? (
              <Moon size={25} />
            ) : (
              <Sun size={25} />
            )}
          </button>

          {/* PROFILE */}

          <div className="profile-wrapper">
            <button
              className="profile-avatar"
              onClick={() =>
                setShowProfileMenu(
                  (prev) => !prev
                )
              }
            >
              {user?.username
                ?.charAt(0)
                .toUpperCase()}
            </button>

            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-menu-user">
                  <strong>
                    @{user?.username}
                  </strong>

                  <span>
                    {user?.email}
                  </span>
                </div>

                <div className="profile-menu-divider" />

                <button
                  className="logout-menu-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="search-wrapper">
        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search users, posts..."
        />

        <button className="search-button">
          <Search size={24} />
        </button>

        <div className="search-avatar">
          {user?.username
            ?.charAt(0)
            .toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Navbar;