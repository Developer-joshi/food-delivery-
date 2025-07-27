import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import socket from "../../socket";
import "./userChat.css";
import { StoreContext } from "../../Context/StoreContext";
import { jwtDecode } from "jwt-decode";



const adminId = "admin"; 

const UserChat = () => {
  const { token } = useContext(StoreContext);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [userId, setUserId] = useState("");

  // Decode token and register user to socket
  useEffect(() => {
    if (!token) return;

    try {
        const decoded = jwtDecode(token);

      console.log(decoded);
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
      console.error("Failed to decode token", err);
    }
  }, [token]);

  // Load previous chat messages
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`/api/chat/messages/${adminId}?currentUserId=${userId}`)
      .then((res) => {
        setMessages(res.data.messages || []);
      })
      .catch((err) => {
        console.error("❌ Failed to load messages", err);
        if (err.response) {
          console.log("📦 Response:", err.response.data);
          console.log("📦 Status:", err.response.status);
        } else if (err.request) {
          console.log("📡 No response received:", err.request);
        } else {
          console.log("⚠️ Error in request setup:", err.message);
        }
      });
  }, [userId]);

  // Send message to admin
  const handleSend = async () => {
    if (!newMsg.trim() || !userId) return;

    const msgObj = {
      senderId: userId,
      receiverId: adminId,
      message: newMsg,
    };

    try {
      await axios.post("/api/chat/message", msgObj);
      socket.emit("send_message", msgObj);
      setMessages((prev) => [...prev, msgObj]);
      setNewMsg("");
    } catch (err) {
      console.error("❌ Send failed", err);
      if (err.response) {
        console.log("📦 Response:", err.response.data);
        console.log("📦 Status:", err.response.status);
      } else if (err.request) {
        console.log("📡 No response received:", err.request);
      } else {
        console.log("⚠️ Error in request setup:", err.message);
      }
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
