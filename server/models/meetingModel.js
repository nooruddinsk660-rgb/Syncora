import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  title: String,
  date: String,
  startTime: String,
  endTime: String,
  participants: [String],
  notes: String,
});

export default mongoose.model("Meeting", meetingSchema);
