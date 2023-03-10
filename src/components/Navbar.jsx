import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar({ setTheme, theme }) {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  let activeClassName = "text-accent";

  const navItems = [
    // link name, destination, condition on which to display
    ["myRecipes", `/${user && user.user ? user.user.username : ""}`, user],
    ["About", "/about", true],
    ["Signup", "/signup", !user],
    ["Login", "/login", !user],
  ];

  const linksToDisplay = navItems.filter((item) => item[2]);

  const handleLogout = () => {
    logout();
  };

  const handleSearchQuery = (e) => {
    e.preventDefault();
    if (query.length > 0) navigate(`/search?query=${query}`);
  };

  return (
    <nav className="flex gap-4 text-primary items-center">
      <button
        onClick={(e) => setTheme(e)}
        aria-label="Toggle light and dark mode"
      >
        <svg
          width="30px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          {theme === "dark" ? (
            <path
              className="sun"
              fillRule="evenodd"
              d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z"
            />
          ) : (
            <path
              className="moon"
              fillRule="evenodd"
              d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z"
            />
          )}
        </svg>
      </button>
      <ul className="flex items-center gap-4">
        {linksToDisplay.map(([name, destination]) => (
          <li key={name} className="bg-primary">
            <NavLink
              to={destination}
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
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
              className="bg-tertiary text-secondary p-1 px-2 rounded"
            />
          </form>
        </li>
      </ul>
    </nav>
  );
}
