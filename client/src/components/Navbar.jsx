"use client";
import { motion } from "framer-motion";
import { CalendarDays, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    // Check if JWT token exists in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50
      bg-gradient-to-br from-white/70 via-white/30 to-transparent
      dark:from-gray-900/70 dark:via-gray-800/40 dark:to-transparent
      backdrop-blur-2xl border-b border-gray-200/40 dark:border-gray-700/50
      shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
    >
      {/* Neon Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl opacity-50 animate-pulse" />

      <div className="relative max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Left Section */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-md opacity-60 animate-pulse"></div>
            <CalendarDays className="relative text-blue-700 dark:text-cyan-300 w-8 h-8 drop-shadow-md" />
          </div>

          <h1
            className="relative text-transparent bg-clip-text
            bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500
            dark:from-cyan-400 dark:via-indigo-400 dark:to-fuchsia-400
            text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Smart Meeting Scheduler
          </h1>

          <Sparkles className="text-yellow-400 w-5 h-5 animate-pulse" />
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mr-5">
            <ThemeToggle />
          </div>

          {/* If logged in → show ProfileMenu, else → Login/Signup */}
          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Sign Up
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Subtle Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-[1px]" />
    </motion.header>
  );
}
