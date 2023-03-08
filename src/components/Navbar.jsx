import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  let activeClassName = "underline";

  const handleLogout = () => {
    logout();
  };

  const handleSearchQuery = (e) => {
    e.preventDefault();
    if (query.length > 0) navigate(`/search?query=${query}`);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to={`/`}
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Home
          </NavLink>
        </li>
        {user && user.user && (
          <li>
            <NavLink
              to={`/${user.user.username}`}
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              myRecipes
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            About
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login">
                {({ isActive }) => (
                  <span className={isActive ? activeClassName : undefined}>
                    Login
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                {({ isActive }) => (
                  <span className={isActive ? activeClassName : undefined}>
                    Signup
                  </span>
                )}
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
        <li>
          <form onSubmit={handleSearchQuery}>
            <input
              aria-label="Search"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Search"
            />
          </form>
        </li>
      </ul>
    </nav>
  );
}
