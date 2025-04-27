// src/pages/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function Cart() {
  const { cart, remove, clear } = useContext(CartContext);

  if (cart.length === 0)
    return <p>Your cart is empty.</p>;

  const total = cart.reduce((sum,item) => sum + item.price * (item.qty||1), 0);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Your Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id} style={{ marginBottom: '0.5rem' }}>
            {item.title} — ${item.price} × {item.qty||1}
            <button
              onClick={() => remove(item.id)}
              style={{ marginLeft: '1rem' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p><strong>Total: ${total}</strong></p>
      <button onClick={clear}>Clear Cart</button>
    </div>
  );
}

