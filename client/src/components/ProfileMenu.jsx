"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogOut,
  Settings,
  ChevronDown,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const menuRef = useRef();
  const navigate = useNavigate();

  // Load user name from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUserName(parsed.name || "User");
      } catch {
        setUserName("User");
      }
    }
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative select-none" ref={menuRef}>
      {/* Profile Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.97 }}
        className="group relative flex items-center gap-3 px-5 py-2.5 rounded-full
          bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10
          dark:from-blue-800/20 dark:via-cyan-700/20 dark:to-purple-900/20
          border border-white/20 dark:border-gray-700/60 shadow-lg
          hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] backdrop-blur-xl
          transition-all duration-500"
      >
        {/* Animated Gradient Avatar */}
        <div className="relative w-9 h-9">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 blur-[2px]"
          />
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-inner">
            <User className="text-blue-600 dark:text-cyan-300" size={18} />
          </div>
        </div>

        {/* Username */}
        <span className="font-semibold text-sm text-gray-800 dark:text-gray-100 tracking-wide">
          {userName}
        </span>

        {/* Chevron Icon */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-blue-500 dark:text-cyan-300" size={16} />
        </motion.div>

        {/* Pulsing Halo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 blur-xl opacity-30 pointer-events-none"
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-60 rounded-2xl shadow-2xl overflow-hidden 
              bg-gradient-to-br from-white/90 via-gray-50/70 to-gray-100/40 
              dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/60
              border border-gray-200/50 dark:border-gray-700/60 backdrop-blur-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200/40 dark:border-gray-700/50 relative">
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-70" />
              <div className="relative w-11 h-11">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 blur-[2px]"
                />
                <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-inner">
                  <ShieldCheck
                    className="text-blue-600 dark:text-cyan-400"
                    size={19}
                  />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                  {userName}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Logged In
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {/* <motion.button
                whileHover={{ x: 6 }}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm 
                  text-gray-700 dark:text-gray-200 rounded-lg 
                  hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
              >
                <Settings
                  className="text-blue-600 dark:text-cyan-400"
                  size={18}
                />
                <span>Settings</span>
              </motion.button> */}

              <motion.button
                 whileHover={{ x: 6, scale: 1.05 }}
                 whileTap={{ scale: 0.97 }}
                 onClick={handleLogout}
                 className="
                   flex items-center justify-center sm:justify-start gap-2
                   w-full sm:w-auto
                   px-4 sm:px-5 py-2.5 sm:py-3
                   text-sm sm:text-base font-medium
                   text-red-600 dark:text-red-400
                   rounded-xl border border-transparent
                   hover:border-red-400/40
                   hover:bg-red-50 dark:hover:bg-gray-800
                   transition-all duration-300 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-700
                 "
              >              
                <LogOut
                  className="text-red-500 dark:text-red-400 shrink-0"
                  size={18}
                />
                <span className="truncate">Logout</span>
              </motion.button>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-1 py-2 border-t border-gray-200/30 dark:border-gray-700/40 text-xs text-gray-500 dark:text-gray-400">
              <Sparkles size={12} className="text-yellow-400 animate-pulse" />
              <span>Smart Scheduler</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
