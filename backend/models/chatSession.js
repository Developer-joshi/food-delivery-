// models/ChatSession.js
import mongoose from "mongoose";

const chatSessionSchema = new mongoose.Schema({
  participants: [
    {
      type: String,
      ref: "user",
      required: true,
    },
  ],
  lastMessage: {
    type: String,
    default: "",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const chatSessionModel =
  mongoose.models.chatsession || mongoose.model("chatsession", chatSessionSchema);
export default chatSessionModel;
