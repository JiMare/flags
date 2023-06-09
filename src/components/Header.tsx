import React, { useState, useEffect } from "react";
import { useThemeContext } from "../provider/MuiThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness5Icon from "@mui/icons-material/Brightness5";

export const Header: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const context = useThemeContext();

  useEffect(() => {
    if (theme && theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const onChangeTheme = () => {
    if (!theme || theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
    context?.onChange();
  };

  return (
    <div className="h-[80px] bg-white dark:bg-grey shadow-md flex justify-between px-[16px] items-center md:px-[80px]">
      <h1 className="font-extrabold text-[14px] md:text-[24px]">
        Where in the world?
      </h1>
      <button
        className="text-[12px] font-semibold md:text-[16px] flex items-center gap-[8px]"
        onClick={onChangeTheme}
      >
        {theme === "dark" ? <DarkModeIcon /> : <Brightness5Icon />}
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};
