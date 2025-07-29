// src/socket.js (frontend)
import { io } from "socket.io-client";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const socket = io(API_URL); // Backend URL
export default socket;
