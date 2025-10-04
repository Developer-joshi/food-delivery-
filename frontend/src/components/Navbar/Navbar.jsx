import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const { token } = useContext(StoreContext);
  const location = useLocation();

  return (
    <div className="navbar container">
      <img className="logo" src="/logo.png" alt="logo" />

      <ul className="navbar-menu">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/menu" ? "active" : ""}>
          <Link to="/menu">Menu</Link>
        </li>
        <li className={location.pathname === "/cart" ? "active" : ""}>
          <Link to="/cart">Cart</Link>
        </li>
        {token && (
          <li className={location.pathname === "/chat" ? "active" : ""}>
            <Link to="/chat">Chat</Link>
          </li>
        )}
      </ul>

      <div className="navbar-right">
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Login</button>
        ) : (
          <div className="navbar-profile">
            <img src="/profile_icon.png" alt="Profile" width="30" />
            <div className="navbar-profile-dropdown">
              <li>
                <img src="/profile_icon.png" alt="Profile" />
                <Link to="/profile">My Profile</Link>
              </li>
              <hr />
              <li
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                <img src="/logout_icon.png" alt="Logout" />
                Logout
              </li>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
