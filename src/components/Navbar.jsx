import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar({ setTheme }) {
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
    <nav>
      <button onClick={(e) => setTheme(e)}>ToggleTheme</button>
      <ul>
        {linksToDisplay.map(([name, destination]) => (
          <li key={name}>
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
            />
          </form>
        </li>
      </ul>
    </nav>
  );
}
