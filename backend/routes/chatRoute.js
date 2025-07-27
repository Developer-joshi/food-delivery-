import express from "express";
import {
  sendMessage,
  getMessagesWithUser,
  getChatSessions,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/message", sendMessage);


router.get("/messages/:userId", getMessagesWithUser);


router.get("/sessions", getChatSessions);

export default router;
