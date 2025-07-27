import messageModel from "../models/messages.js";
import chatSessionModel from "../models/chatSession.js";
import userModel from "../models/userModel.js";

// 1. Send a new message and update/create chat session
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // ✅ Save the message
    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
    });

    // ✅ Check if chat session exists
    let session = await chatSessionModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // ✅ Create or update chat session
    if (!session) {
      await chatSessionModel.create({
        participants: [senderId, receiverId],
        lastMessage: message,
        updatedAt: Date.now(),
      });
    } else {
      session.lastMessage = message;
      session.updatedAt = Date.now();
      await session.save();
    }

    res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    console.error("❌ sendMessage error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// 2. Get all messages between admin and selected user
export const getMessagesWithUser = async (req, res) => {
  try {
    const { userId } = req.params; // the other user (admin or client)
    const { currentUserId } = req.query; // logged-in user

    const messages = await messageModel
      .find({
        $or: [
          { senderId: userId, receiverId: currentUserId },
          { senderId: currentUserId, receiverId: userId },
        ],
      })
      .sort({ timestamp: 1 });

    res.json({ success: true, messages });
  } catch (err) {
    console.error("❌ getMessagesWithUser error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// 3. Admin inbox: Get all chat sessions (no populate if not using ObjectId)
export const getChatSessions = async (req, res) => {
  try {
    const { adminId } = req.query;

    const sessions = await chatSessionModel
      .find({ participants: adminId })
      .sort({ updatedAt: -1 });

    // Get details for the other user manually
    const formattedSessions = await Promise.all(
      sessions.map(async (session) => {
        const otherUserId = session.participants.find((id) => id !== adminId);
        const user = await userModel.findById(otherUserId).select("name email");

        return {
          _id: session._id,
          user, // chat partner details
          lastMessage: session.lastMessage,
          updatedAt: session.updatedAt,
        };
      })
    );

    res.json({ success: true, sessions: formattedSessions });
  } catch (err) {
    console.error("❌ getChatSessions error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
