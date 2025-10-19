import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

export default function EmptyHero() {
  const scrollToMeetingForm = () => {
    const section = document.getElementById("meeting-form");
    if (section) {
      // ✅ Reliable scroll behavior
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      // ✅ Smooth glow highlight
      section.classList.add("ring-4", "ring-blue-400", "ring-offset-2", "transition-all", "duration-700");
      setTimeout(() => {
        section.classList.remove("ring-4", "ring-blue-400", "ring-offset-2");
      }, 1200);
    } else {
      console.warn("❌ meeting-form element not found in DOM");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center min-h-[70vh] text-center overflow-hidden rounded-2xl mt-4"
    >
      {/* 🌌 Background gradient glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-black"></div>
      <div className="absolute inset-0 blur-3xl opacity-40 bg-gradient-to-tr from-blue-300 via-purple-400 to-pink-300 dark:from-blue-800 dark:via-purple-700 dark:to-pink-900"></div>

      {/* 🌀 Animated Lottie */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="flex flex-col items-center justify-center space-y-8"
      >
        <Player
          autoplay
          loop
          src="https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json"
          style={{ height: "240px", width: "240px" }}
        />

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text p-2"
        >
          No Meetings Yet
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="text-gray-600 dark:text-gray-300 text-lg max-w-xl leading-relaxed"
        >
          Create your first meeting and bring your team together —
          <span className="font-semibold text-indigo-500 dark:text-indigo-400">
            {" "}
            collaborate, plan, and achieve{" "}
          </span>
          with style and precision.
        </motion.p>

        {/* ✨ Floating button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8"
        >
          <motion.button
            onClick={scrollToMeetingForm}
            whileHover={{
              scale: 1.07,
              boxShadow: "0 0 25px rgba(147, 51, 234, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="
              px-8 py-4 
              bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
              text-white font-semibold text-lg
              rounded-2xl shadow-xl
              hover:shadow-purple-500/40
              transition-all duration-500 ease-in-out
              focus:outline-none focus:ring-4 focus:ring-purple-400/50
              flex items-center justify-center gap-2 mb-6
            "
          >
            + Schedule a Meeting
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ✨ Floating background circles */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-16 left-10 w-24 h-24 bg-blue-400/30 rounded-full blur-3xl"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-16 right-10 w-32 h-32 bg-purple-400/30 rounded-full blur-3xl"
      ></motion.div>
    </motion.section>
  );
}
