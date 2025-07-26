import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ✅ Add this function
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        wishlist,
        setWishlist,
        addToCart, // ✅ Provide the function to context
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
