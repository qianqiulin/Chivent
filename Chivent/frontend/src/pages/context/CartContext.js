import React, { createContext, useState, useEffect } from 'react';


export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(stored)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function add(item, qty = 1) {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === item.id)
      if (idx > -1) {
        // already in cart → bump
        const updated = [...prev]
        updated[idx] = {
          ...updated[idx],
          qty: updated[idx].qty + qty
        }
        return updated
      }
      // brand new
      return [...prev, { ...item, qty }]
    })
  }

  /**
   * Remove `qty` of the item with `id`.
   * If qty → 0 or below, drop it entirely.
   */
  function remove(id, qty = 1) {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === id)
      if (idx === -1) return prev // not in cart
      const item = prev[idx]
      const newQty = item.qty - qty
      if (newQty > 0) {
        const updated = [...prev]
        updated[idx] = { ...item, qty: newQty }
        return updated
      }
      // qty ≤ 0 → remove it
      return prev.filter(i => i.id !== id)
    })
  }
  function clear() {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}
