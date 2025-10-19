import { useState } from "react";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("Creating account...");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Account created! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMessage(`❌ ${data.error || "Signup failed"}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("⚠️ Server error. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black"
    >
      <motion.form
        onSubmit={handleSignup}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-6">
          Create Your Account
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300 font-semibold">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            placeholder="Enter your name"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300 font-semibold">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            placeholder="Enter your email"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 dark:text-gray-300 font-semibold">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            placeholder="Enter your password"
          />
        </label>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-400/50 transition"
        >
          Sign Up
        </motion.button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">{message}</p>
        )}
      </motion.form>
    </motion.div>
  );
}
