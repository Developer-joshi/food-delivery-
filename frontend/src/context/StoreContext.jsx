import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const API_URL = import.meta.env.VITE_BACKEND_URL;

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const currency = "₹";
  const deliveryCharge = 50;

  console.log("Using socket URL:", API_URL);
  console.log("Token being sent =>", token);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(
        `${API_URL}/api/cart/add`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ fixed
          },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (token) {
      await axios.post(
        `${API_URL}/api/cart/remove`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ fixed
          },
        }
      );
    }
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = food_list.find((p) => p._id === id);
      return item ? total + item.price * qty : total;
    }, 0);
  };

  const fetchFoodList = async () => {
    const res = await axios.get(`${API_URL}/api/food/list`);
    setFoodList(res.data.data);
  };

  const loadCartData = async (token) => {
    const res = await axios.post(
      `${API_URL}/api/cart/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ fixed
        },
      }
    );
    setCartItems(res.data.cartData || {});
  };

  const handleLoginSuccess = async (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    await loadCartData(token);
  };

  useEffect(() => {
    (async () => {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) await handleLoginSuccess(savedToken);
    })();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        url: API_URL,
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge,
        handleLoginSuccess,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
