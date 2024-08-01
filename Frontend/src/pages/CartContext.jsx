// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (cake) => {
    setCart((prevCart) => [...prevCart, cake]);
  };

  const removeFromCart = (cake) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cake.id));
  };

  const totalPrice = cart.reduce((total, cake) => total + parseInt(cake.price), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
