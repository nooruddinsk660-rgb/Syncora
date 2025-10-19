import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    participants: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
    },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
