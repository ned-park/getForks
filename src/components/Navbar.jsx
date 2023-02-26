import { NavLink } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"


export default function Navbar() {
  const {user} = useAuthContext()
  const {logout} = useLogout()
  let activeClassName = "underline"

  const handleClick = () => {
    logout()
  }

  return (
    <nav>
      <ul>
        {user && user.user && (<li>
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
            <li>
              <NavLink to="/signup">
                {({ isActive }) => (
                  <span
                    className={
                      isActive ? activeClassName : undefined
                    }
                  >
                    Signup
                  </span>
                )}
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <li>
            <button onClick={handleClick}>Logout</button>
          </li>
        )}
      </ul>
      
    </nav>
  )
}
