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
    <nav className="flex gap-4 text-primary items-center">
      <button onClick={(e) => setTheme(e)}>ToggleTheme</button>
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
              className="bg-tertiary text-secondary p-1 rounded"
            />
          </form>
        </li>
      </ul>
    </nav>
  );
}
