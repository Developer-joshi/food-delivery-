import { io } from "socket.io-client";

// Use the same backend URL as StoreContext
const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log("Using socket URL:", API_URL);
const socket = io(API_URL.replace(/^http/, "ws"), {
  transports: ["websocket"],
});


export default socket;
