import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import Meeting from "../models/Meeting.js";

const router = express.Router();

/**
 * 🧩 Create a new meeting (Protected)
 * Each meeting is tied to the logged-in user (req.user.ownerId)
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, date, participants, description } = req.body;
    const { ownerId } = req.user; // Extracted from JWT middleware

    // Basic validation
    if (!title || !date) {
      return res.status(400).json({ error: "Title and Date are required" });
    }

    const meeting = new Meeting({
      title,
      date,
      participants,
      description,
      owner: ownerId,
    });

    await meeting.save();

    res.status(201).json({
      message: "Meeting created successfully",
      meeting,
    });
  } catch (err) {
    console.error("Error creating meeting:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 📅 Get all meetings (Protected)
 * Returns only meetings created by the logged-in user
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const { ownerId } = req.user;

    const meetings = await Meeting.find({ owner: ownerId }).sort({ date: 1 });
    res.status(200).json(meetings);
  } catch (err) {
    console.error("Error fetching meetings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 🔍 Get a single meeting by ID (Protected)
 */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { ownerId } = req.user;
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      owner: ownerId,
    });

    if (!meeting)
      return res.status(404).json({ error: "Meeting not found or unauthorized" });

    res.status(200).json(meeting);
  } catch (err) {
    console.error("Error fetching meeting:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * ✏️ Update a meeting (Protected)
 */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { ownerId } = req.user;

    const updatedMeeting = await Meeting.findOneAndUpdate(
      { _id: req.params.id, owner: ownerId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMeeting)
      return res.status(404).json({ error: "Meeting not found or unauthorized" });

    res.status(200).json({
      message: "Meeting updated successfully",
      meeting: updatedMeeting,
    });
  } catch (err) {
    console.error("Error updating meeting:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * ❌ Delete a meeting (Protected)
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { ownerId } = req.user;

    const deletedMeeting = await Meeting.findOneAndDelete({
      _id: req.params.id,
      owner: ownerId,
    });

    if (!deletedMeeting)
      return res.status(404).json({ error: "Meeting not found or unauthorized" });

    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (err) {
    console.error("Error deleting meeting:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
