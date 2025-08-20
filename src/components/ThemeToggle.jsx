import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300 bg-secondary/80 shadow-lg",
        "focus:outline-none"
      )}
      aria-label="Toggle theme"
    >
      <span className="relative block w-7 h-7">
        <AnimatePresence initial={false} mode="wait">
          {isDarkMode ? (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, y: 15 }}
              animate={{ rotate: 0, opacity: 1, y: 0 }}
              exit={{ rotate: -90, opacity: 0, y: -15 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="h-7 w-7 text-yellow-300 drop-shadow" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, y: -15 }}
              animate={{ rotate: 0, opacity: 1, y: 0 }}
              exit={{ rotate: 90, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="h-7 w-7 text-blue-900 drop-shadow" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
};
