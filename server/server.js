import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import inviteRoutes from "./routes/inviteRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Core Middlewares
app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Smart Meeting Scheduler API is running...");
});

// ✅ Main API Routes
app.use("/api/auth", authRoutes);        // Authentication (register/login)
app.use("/api/meetings", meetingRoutes); // Meetings (protected)
app.use("/api/invite", inviteRoutes);    // Meeting invite links (protected)

// ✅ Global error handler (optional)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
