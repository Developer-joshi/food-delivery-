import { io } from "socket.io-client";

// Use the same backend URL as StoreContext
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const socket = io(API_URL, {
  transports: ["websocket"],
});

export default socket;
