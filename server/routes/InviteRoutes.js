import express from "express";
import crypto from "crypto";
import InviteLink from "../models/InviteLink.js";
import Meeting from "../models/Meeting.js";

const router = express.Router();

// Create a new shareable link
router.post("/create", async (req, res) => {
  try {
    const { ownerId, scope, ttlHours } = req.body;

    const token = crypto.randomBytes(16).toString("hex");
    const expiresAt = ttlHours
      ? new Date(Date.now() + ttlHours * 3600 * 1000)
      : null;

    const link = await InviteLink.create({
      ownerId,
      token,
      expiresAt,
      scope,
    });

    res.json({
      success: true,
      message: "Invite link created successfully",
      url: `${process.env.APP_URL || "http://localhost:5000"}/invite/${token}`,
    });
  } catch (err) {
    console.error("Error creating invite link:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Access meetings using the link
router.get("/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const link = await InviteLink.findOne({ token });

    if (!link) return res.status(404).json({ error: "Invalid link" });
    if (link.expiresAt && link.expiresAt < new Date())
      return res.status(410).json({ error: "Link expired" });

    // Fetch the owner's public meetings
    const meetings = await Meeting.find({ ownerId: link.ownerId }).select(
      "title date participants"
    );

    res.json({
      ownerId: link.ownerId,
      scope: link.scope,
      meetings,
    });
  } catch (err) {
    console.error("Error fetching invite link:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
