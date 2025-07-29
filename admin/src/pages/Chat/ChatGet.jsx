import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../socket"; 

import "./ChatGet.css";
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const adminId = "admin";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    socket.emit("register", adminId);

    const handleReceive = (data) => {
      if (selectedUser && data.senderId === selectedUser._id) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handleReceive);
    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [selectedUser]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/all`)
      .then((res) => setUsers(res.data.users || []))
      .catch((err) => console.error("Failed to load users", err));
  }, []);

  const loadMessages = (user) => {
    setSelectedUser(user);
    axios
      .get(`${API_URL}/api/chat/messages/${user._id}?currentUserId=${adminId}`)
      .then((res) => setMessages(res.data.messages || []))
      .catch((err) => console.error("Failed to load messages", err));
  };

  const handleSend = async () => {
    if (!newMsg.trim() || !selectedUser) return;
    const msgObj = {
      senderId: adminId,
      receiverId: selectedUser._id,
      message: newMsg,
    };

    try {
      await axios.post(`${API_URL}/api/chat/message`, msgObj);
      socket.emit("send_message", msgObj);
      setMessages((prev) => [...prev, msgObj]);
      setNewMsg("");
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <h3>👥 Users</h3>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user, i) => (
            <div
              key={i}
              className={`chat-session ${
                selectedUser?._id === user._id ? "active" : ""
              }`}
              onClick={() => loadMessages(user)}
            >
              <p>
                <strong>{user.name}</strong>
              </p>
              <p className="last-msg">{user.email}</p>
            </div>
          ))
        )}
      </div>

      {/* Chat box */}
      <div className="chat-main">
        {selectedUser ? (
          <>
            <div className="chat-header">Chat with {selectedUser.name}</div>
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message ${
                    msg.senderId === adminId ? "sent" : "received"
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
          </>
        ) : (
          <div className="no-user-msg">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
