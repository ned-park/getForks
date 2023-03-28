import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

export default function Header({ setTheme, theme }) {
  return (
    <header className="bg-primary p-6 shadow-xl">
      <div className="flex justify-between items-center">
        <NavLink to="/">
          <h2 className="text-xl text-primary">getForks</h2>
        </NavLink>
        <Navbar setTheme={setTheme} theme={theme} />
      </div>
    </header>
  );
}
