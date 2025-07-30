import React, { useState,useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import LoginPopup from './components/LoginPopup/LoginPopup'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'
import Footer from './components/Footer/Footer'
import MyOrders from './pages/MyOrders/MyOrders'
import UserChat from './pages/Chat/userChat'
import ReviewPage from "./pages/Reviews/Reviews";
import { StoreContext } from './context/StoreContext'
const App = () => {
  const { token } = useContext(StoreContext);
    const [showLogin,setShowLogin] = useState(false);
  
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/reviews/:foodId" element={<ReviewPage />} />          
          {token && <Route path="/chat" element={<UserChat />} />}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App