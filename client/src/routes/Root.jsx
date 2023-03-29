import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Root() {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const darkPreferred = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const hasTheme = localStorage.getItem("theme");
    if ((hasTheme && hasTheme === "dark") || (!hasTheme && darkPreferred)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("");
    }
  }, []);

  const handleThemeChange = (e) => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <div className="min-h-screen bg-primary text-primary">
      <Header setTheme={handleThemeChange} theme={theme} />
      <Outlet />
    </div>
  );
}
