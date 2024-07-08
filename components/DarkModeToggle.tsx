"use client";

import DarkMode from "@/public/dark-mode.svg";
import LightMode from "@/public/light-mode.svg";
import { useState } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? <LightMode /> : <DarkMode className="invert" />}
    </button>
  );
};

export default DarkModeToggle;
