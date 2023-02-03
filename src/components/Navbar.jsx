import { NavLink } from "react-router-dom"

export default function Navbar() {
  let activeClassName = "underline"

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="dashboard"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            myRecipes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="login">
            {({ isActive }) => (
              <span
                className={
                  isActive ? activeClassName : undefined
                }
              >
                Login
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
