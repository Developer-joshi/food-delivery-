// src/socket.js

import { io } from "socket.io-client";

// Replace with your backend URL if hosted elsewhere
const socket = io("http://localhost:4000", {
  transports: ["websocket"], // optional but recommended for stability
});

export default socket;
