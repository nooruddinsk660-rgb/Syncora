import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/themeContext.jsx";
export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.85 }}
      className="fixed top-5 right-5 p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg transition-colors duration-300"
      aria-label="Toggle Theme"
    >
      {darkMode ? (
        <Moon className="text-yellow-300" size={22} />
      ) : (
        <Sun className="text-orange-500" size={22} />
      )}
    </motion.button>
  );
}
