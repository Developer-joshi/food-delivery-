import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import socket from "../../socket";
import "./userChat.css";
import { StoreContext } from "../../context/StoreContext";
import { jwtDecode } from "jwt-decode";

const adminId = "admin";

const UserChat = () => {
  const { token, url } = useContext(StoreContext);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [userId, setUserId] = useState("");

  // Register user on socket
  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      socket.emit("register", decoded.id);

      const handleReceive = (data) => {
        if (data.senderId === adminId) {
          setMessages((prev) => [...prev, data]);
        }
      };

      socket.on("receive_message", handleReceive);
      return () => socket.off("receive_message", handleReceive);
    } catch (err) {
      console.error("Token decode failed", err);
    }
  }, [token]);

  // Load chat history
  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${url}/api/chat/messages/${adminId}?currentUserId=${userId}`)
      .then((res) => setMessages(res.data.messages || []))
      .catch((err) => console.error("Failed to load messages", err));
  }, [userId, url]);

  const handleSend = async () => {
    if (!newMsg.trim() || !userId) return;

    const msgObj = { senderId: userId, receiverId: adminId, message: newMsg };
    try {
      await axios.post(`${url}/api/chat/message`, msgObj);
      socket.emit("send_message", msgObj);
      setMessages((prev) => [...prev, msgObj]);
      setNewMsg("");
    } catch (err) {
      console.error("Send failed", err);
    }
  };

  return (
    <div className="user-chat-container">
      <div className="chat-header">Chat with Admin</div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${
              msg.senderId === userId ? "sent" : "received"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default UserChat;
