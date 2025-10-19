import mongoose from "mongoose";

const inviteLinkSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  scope: {
    type: String,
    enum: ["view", "book"], // "view" = only view availability, "book" = can propose meeting
    default: "view",
  },
  expiresAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("InviteLink", inviteLinkSchema);
