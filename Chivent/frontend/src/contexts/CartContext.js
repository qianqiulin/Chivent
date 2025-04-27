import React, { createContext, useState, useEffect } from 'react';
import { fetchCart, addToCart, removeFromCart, clearCart } from '../services/cart';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart().then(setCart).catch(console.error);
  }, []);

  const add = async item => {
    const updated = await addToCart(item);
    setCart(updated);
  };

  const remove = async id => {
    const updated = await removeFromCart(id);
    setCart(updated);
  };

  const clear = async () => {
    await clearCart();
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}
