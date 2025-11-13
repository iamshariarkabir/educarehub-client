import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
    document.querySelector("html").classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={theme === "dark"}
      />
      <FaSun className="swap-on w-5 h-5" />
      <FaMoon className="swap-off w-5 h-5" />
    </label>
  );
};

export default ThemeToggle;
