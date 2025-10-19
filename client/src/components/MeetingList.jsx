import { motion } from "framer-motion";
import EmptyHero from "./EmptyHero";

export default function MeetingList({ meetings, onDelete }) {

  if (!meetings.length) {
    return <EmptyHero />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-all duration-300 mt-4">
      {meetings.map((m, index) => (
        <motion.div
          key={m._id}
          className="p-5 bg-white/60 backdrop-blur-md rounded-2xl shadow-md border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-blue-700">{m.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(m.date).toLocaleString()}
              </p>
              <p className="mt-2 text-gray-600">{m.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                👥 {m.participants.join(", ")}
              </p>
            </div>
            <button
              onClick={() => onDelete(m._id)}
              className="text-red-500 hover:text-red-700 text-lg font-semibold transition-all"
            >
              ✕
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
