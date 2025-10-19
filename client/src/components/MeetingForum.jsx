import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, Type, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { useTheme } from "next-themes"; // optional if using next-themes

export default function MeetingForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const { theme } = useTheme ? useTheme() : { theme: "dark" }; // fallback for non-next apps

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date) {
      setMessage({
        text: "⚠️ Please fill in both Title and Date before scheduling.",
        type: "error",
      });
      return;
    }

    const newMeeting = {
      title,
      date,
      participants: participants.split(",").map((p) => p.trim()),
      description,
    };

    onAdd(newMeeting);
    setTitle("");
    setDate("");
    setParticipants("");
    setDescription("");

    setMessage({
      text: "✅ Meeting scheduled successfully!",
      type: "success",
    });

    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative mb-8 max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl 
      ${theme === "dark"
        ? "bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/70 border border-gray-700/60"
        : "bg-gradient-to-br from-white/80 via-gray-50/70 to-white/60 border border-gray-200/70"} 
      shadow-2xl backdrop-blur-2xl hover:shadow-cyan-500/20 transition-all duration-700`}
    >
      {/* Glowing animated border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 opacity-10 blur-xl animate-pulse"></div>

      {/* Header */}
      <h2
        className={`relative text-2xl md:text-3xl font-bold text-center mb-6 text-transparent bg-clip-text 
        ${theme === "dark"
          ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_12px_#22d3eeaa]"
          : "bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-600"}`}
      >
        ✨ Schedule a New Meeting
      </h2>

      {/* Toast Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`flex items-center gap-2 mb-4 text-sm px-4 py-2 rounded-xl shadow-inner 
          ${message.type === "success"
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="text-green-400" size={18} />
          ) : (
            <AlertTriangle className="text-red-400" size={18} />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      {/* Inputs */}
      <div className="relative grid gap-5">
        {/* Title */}
        <div className="relative group">
          <Type className="absolute left-3 top-3 text-cyan-400 group-hover:text-blue-400 transition-colors" size={20} />
          <input
            className={`w-full pl-10 pr-3 py-3 rounded-xl ${
              theme === "dark"
                ? "bg-gray-900/70 border border-gray-700 text-gray-100 placeholder-gray-400"
                : "bg-white/70 border border-gray-300 text-gray-800 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:border-transparent transition-all duration-300`}
            type="text"
            placeholder="Meeting Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Date */}
        <div className="relative group">
          <CalendarDays className="absolute left-3 top-3 text-cyan-400 group-hover:text-blue-400 transition-colors" size={20} />
          <input
            className={`w-full pl-10 pr-3 py-3 rounded-xl ${
              theme === "dark"
                ? "bg-gray-900/70 border border-gray-700 text-gray-100"
                : "bg-white/70 border border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-transparent transition-all duration-300`}
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Participants */}
        <div className="relative group">
          <Users className="absolute left-3 top-3 text-cyan-400 group-hover:text-blue-400 transition-colors" size={20} />
          <input
            className={`w-full pl-10 pr-3 py-3 rounded-xl ${
              theme === "dark"
                ? "bg-gray-900/70 border border-gray-700 text-gray-100"
                : "bg-white/70 border border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-300`}
            type="text"
            placeholder="Participants (comma-separated)"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="relative group">
          <FileText className="absolute left-3 top-3 text-cyan-400 group-hover:text-blue-400 transition-colors" size={20} />
          <textarea
            placeholder="Meeting Description"
            className={`w-full pl-10 pr-3 py-3 rounded-xl ${
              theme === "dark"
                ? "bg-gray-900/70 border border-gray-700 text-gray-100"
                : "bg-white/70 border border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-transparent transition-all duration-300 resize-none`}
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px #22d3ee" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-2 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600
          text-white font-semibold py-3 rounded-xl
          shadow-lg hover:shadow-cyan-400/40 transition-all duration-500"
        >
          + Schedule Meeting
        </motion.button>
      </div>
    </motion.form>
  );
}
