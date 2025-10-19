import { motion } from "framer-motion";

export default function MeetingCard({ meeting, onDelete }) {
  const formattedDate = new Date(meeting.date).toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border shadow-md rounded-xl p-4 mb-4 flex justify-between items-start"
    >
      <div>
        <h2 className="text-xl font-semibold text-blue-700">{meeting.title}</h2>
        <p className="text-gray-600">{formattedDate}</p>
        {meeting.participants?.length > 0 && (
          <p className="text-gray-500 text-sm">
            👥 {meeting.participants.join(", ")}
          </p>
        )}
        {meeting.description && (
          <p className="text-gray-700 mt-2">{meeting.description}</p>
        )}
      </div>

      <button
        onClick={() => onDelete(meeting._id)}
        className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1 text-sm transition-all"
      >
        Delete
      </button>
    </motion.div>
  );
}

