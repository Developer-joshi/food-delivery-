// // src/socket.js (frontend)
// import { io } from "socket.io-client";
// const API_URL = import.meta.env.VITE_BACKEND_URL;

// const socket = io(API_URL); // Backend URL
// export default socket;
// src/socket.js
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const socket = io(API_URL, {
  transports: ["websocket"], // ensures stable connection
});

export default socket;
export { API_URL }; // export so other files can use it for axios
