import { motion } from "framer-motion";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView({ meetings }) {
  const data = meetings.map((m) => ({
    x: new Date(m.date).getDate(),
    y: new Date(m.date).getMonth() + 1,
    name: m.title,
  }));

  const [value, setValue] = useState(new Date());

  // Group meetings by date
  const meetingsByDate = meetings.reduce((acc, meeting) => {
    const dateKey = new Date(meeting.date).toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(meeting);
    return acc;
  }, {});

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateKey = date.toDateString();
      if (meetingsByDate[dateKey]) {
        return (
          <div className="mt-1 flex justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="relative z-10">
      {/* 📅 Calendar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-10 p-6 rounded-3xl shadow-2xl backdrop-blur-xl
        bg-gradient-to-br from-white/70 via-white/60 to-white/50
        dark:from-gray-900/80 dark:via-gray-900/70 dark:to-gray-800/80
        border border-gray-200/60 dark:border-gray-700/60
        transition-all duration-700 hover:shadow-cyan-500/10 hover:scale-[1.01]"
      >
        <h2 className="text-2xl font-bold mb-5 text-blue-600 dark:text-cyan-400 tracking-wide border-b border-gray-300/50 dark:border-gray-700/50 pb-2">
          📅 Calendar View
        </h2>

        <div className="flex justify-center">
          <Calendar
            onChange={setValue}
            value={value}
            tileContent={tileContent}
            className="mx-auto rounded-2xl p-4 shadow-inner
            bg-white/70 dark:bg-gray-800/70
            text-gray-800 dark:text-gray-100
            transition-all duration-500"
          />
        </div>

        <div
          className="mt-6 p-5 rounded-2xl
          bg-gray-50/70 dark:bg-gray-900/60
          border border-gray-200/50 dark:border-gray-700/50
          backdrop-blur-md shadow-inner transition-colors duration-500"
        >
          <h3 className="font-semibold text-lg text-blue-600 dark:text-indigo-400 mb-3">
            Meetings on {value.toDateString()}:
          </h3>

          {meetingsByDate[value.toDateString()] ? (
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {meetingsByDate[value.toDateString()].map((m) => (
                <li key={m._id}>
                  <strong className="text-blue-700 dark:text-indigo-300">{m.title}</strong>{" "}
                  —{" "}
                  <span className="text-sm">
                    {new Date(m.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No meetings on this day.
            </p>
          )}
        </div>
      </motion.div>

      {/* 📊 Chart Section */}
      {meetings.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative p-6 sm:p-8 rounded-3xl shadow-2xl
          bg-gradient-to-br from-white/70 via-white/60 to-white/40
          dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/70
          border border-gray-200/50 dark:border-gray-700/70
          backdrop-blur-2xl overflow-hidden group
          transition-all duration-700 hover:shadow-cyan-500/20 hover:scale-[1.01]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-purple-600/10 
            blur-3xl opacity-0 group-hover:opacity-80 transition-all duration-700"></div>

          <h2 className="relative z-10 text-2xl sm:text-3xl font-extrabold tracking-wide mb-6 
            text-transparent bg-clip-text bg-gradient-to-r 
            from-blue-600 via-cyan-400 to-purple-500 
            dark:from-cyan-300 dark:via-blue-400 dark:to-purple-400 
            drop-shadow-lg">
            📈 Monthly Meeting View
          </h2>

          <div className="relative z-10 w-full h-[260px] sm:h-[300px] md:h-[360px] 
            rounded-2xl p-4 sm:p-6 
            bg-gradient-to-br from-gray-50/60 to-gray-100/40 
            dark:from-gray-800/70 dark:to-gray-900/60 
            border border-gray-300/30 dark:border-gray-700/50
            shadow-inner backdrop-blur-md
            transition-all duration-700 ease-in-out
            hover:shadow-cyan-500/10 hover:bg-gray-900/50"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="65%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9" />
                  </radialGradient>
                </defs>
                <XAxis type="number" dataKey="x" name="Day" domain={[1, 31]} tick={{ fill: "#a5b4fc" }} />
                <YAxis type="number" dataKey="y" name="Month" domain={[1, 12]} tick={{ fill: "#a5b4fc" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    color: "#f1f5f9",
                    borderRadius: "10px",
                    border: "1px solid #4b5563",
                    boxShadow: "0 0 20px rgba(56,189,248,0.3)",
                  }}
                />
                <Scatter
                  data={data}
                  fill="url(#glow)"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  shape={(props) => (
                    <circle
                      {...props}
                      r={6}
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(56,189,248,0.8))",
                      }}
                    />
                  )}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-3xl text-center border border-gray-700/60
          bg-gradient-to-br from-gray-900/80 to-gray-800/70
          shadow-lg backdrop-blur-2xl"
        >
          <h2 className="text-xl font-semibold text-gray-300 mb-2">
            🌙 No Meetings Yet
          </h2>
          <p className="text-gray-400">
            Once you schedule a meeting, a stunning visual graph of your month will appear here.
          </p>
        </motion.div>

      )}
    </div>
  );
}
