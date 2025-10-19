import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import MeetingForum from "./components/MeetingForum";
import MeetingList from "./components/MeetingList";
import CalendarView from "./components/CalendarView";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import { CalendarDays } from "lucide-react";

// ✅ Import the Login page
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [token, setToken] = useState(localStorage.getItem("token")); // 🟢 Add this for auth

  // Fetch meetings only if user is logged in
  useEffect(() => {
    if (token) fetchMeetings();
  }, [token]);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meetings", {
        headers: { Authorization: `Bearer ${token}` }, // 🟢 Send token to backend
      });
      setMeetings(res.data);
    } catch (err) {
      console.error("Error fetching meetings:", err);
    }
  };

  const addMeeting = async (newMeeting) => {
    try {
      const res = await axios.post("http://localhost:5000/api/meetings", newMeeting, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMeetings([...meetings, res.data.meeting]);
    } catch (err) {
      console.error("Error adding meeting:", err);
    }
  };

  const deleteMeeting = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/meetings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMeetings(meetings.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error deleting meeting:", err);
    }
  };

  // Filter meetings
  const filteredMeetings = meetings.filter((m) => {
    const now = new Date();
    const time = new Date(m.date);
    if (filter === "upcoming") return time > now;
    if (filter === "past") return time < now;
    return true;
  });

  // Notification setup
  useEffect(() => {
    if (Notification.permission !== "granted") Notification.requestPermission();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      meetings.forEach((m) => {
        const diff = new Date(m.date) - now;
        if (diff > 0 && diff < 3600000) {
          new Notification("Meeting Reminder", {
            body: `Meeting "${m.title}" starts soon!`,
            icon: "/meeting-icon.png",
          });
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [meetings]);

  return (
    <Routes>
      <Route>
        {/* 🔐 If not logged in → show login page */}
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Any other path redirects to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* 🧭 Protected main app */}
            <Route
              path="/"
              element={
                <div
                  className={`min-h-screen transition-colors duration-700 
                    bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 
                    dark:from-gray-950 dark:via-gray-900 dark:to-black 
                    text-gray-900 dark:text-gray-100 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 blur-3xl opacity-40 animate-pulse"></div>
                  <Navbar />

                  <motion.main
                    className="pt-28 pb-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <motion.div
                      className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-2xl border border-white/20 dark:border-gray-700/40 
                              rounded-3xl shadow-2xl p-8 transition-all duration-700 hover:shadow-blue-500/10"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 60 }}
                    >
                      <h2 className="text-3xl font-bold text-blue-700 dark:text-indigo-400 mb-5 tracking-wide">
                        Schedule a Meeting
                      </h2>
                      <div id="meeting-form">
                        <MeetingForum onAdd={addMeeting} />
                      </div>

                      {/* Filters */}
                      <div className="flex justify-center mt-8 space-x-3 flex-wrap gap-3">
                        {["all", "upcoming", "past"].map((f) => (
                          <motion.button
                            key={f}
                            whileHover={{ scale: 1.07 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2.5 rounded-full font-semibold transition-all shadow-md text-sm tracking-wide
                              ${
                                filter === f
                                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                                  : "bg-white/50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                              }`}
                            onClick={() => setFilter(f)}
                          >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                          </motion.button>
                        ))}
                      </div>

                      <div className="mt-8">
                        <MeetingList meetings={filteredMeetings} onDelete={deleteMeeting} />
                      </div>
                    </motion.div>

                    {/* Calendar */}
                    <motion.div
                      className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-2xl border border-white/20 dark:border-gray-700/40 
                              rounded-3xl shadow-2xl p-8 transition-all duration-700 hover:shadow-indigo-500/10"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 60 }}
                    >
                      <CalendarView meetings={filteredMeetings} />
                    </motion.div>
                  </motion.main>

                  <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-blue-500/10 via-purple-400/5 to-transparent blur-2xl opacity-40 pointer-events-none"></div>
                </div>
              }
            />
          </>
        )}
      </Route>
    </Routes>
  );
}
