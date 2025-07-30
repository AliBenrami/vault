"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      onClick={handleTheme}
      className="hover:scale-105 active:scale-95 transition-all duration-300"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeButton;
