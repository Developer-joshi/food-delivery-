import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Chat from "./pages/Chat/ChatGet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Use the backend URL from your .env file (works in dev & production)
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const App = () => {
  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={API_URL} />} />
          <Route path="/list" element={<List url={API_URL} />} />
          <Route path="/orders" element={<Orders url={API_URL} />} />
          <Route path="/chat" element={<Chat url={API_URL} />} />{" "}
          {/* Chat route */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
