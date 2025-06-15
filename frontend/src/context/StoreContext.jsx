import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    const [cartItems,setCartItems] = useState({});
    const [token,setToken] = useState("");
    const currency = "₹";
    const deliveryCharge = 50;

    const addToCart = (itemId) => {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } 
      //not already in cart then 
      else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
    };

    const removeFromCart = (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
              if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }  
            } catch (error) {
                
            }
            
        }
        return totalAmount;
    }

    useEffect(()=>{
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
      }
    },[])

    const contextValue = {
        url,
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        currency,
        deliveryCharge,
        token,
        setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider