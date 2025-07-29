// src/socket.js
import { io } from "socket.io-client";

// Use backend URL from environment variables (Vite)
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Create socket connection
const socket = io(API_URL, {
  transports: ["websocket"], // helps avoid polling fallback
});

export default socket;
