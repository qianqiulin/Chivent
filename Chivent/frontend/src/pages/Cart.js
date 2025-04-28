// src/pages/Cart.js
import React, { useState, useContext } from 'react';
import { CartContext } from '../pages/context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
  const { cart, remove, clear } = useContext(CartContext)
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (cart.length === 0) {
    return <p className="empty-message">Your cart is empty.</p>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Cart</h1>

      <ul className="cart-list">
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={(qty) => remove(item.id, qty)}
            onDelete={() => remove(item.id, item.qty)}
          />
        ))}
      </ul>
      <div className="cart-total">
        Total: ${total.toFixed(2)}
      </div>
      <button className="clear-btn" onClick={clear}>
        Clear Cart
      </button>
    </div>
  )
}

function CartItem({ item, onRemove, onDelete }) {
  const [rmQty, setRmQty] = useState(1);
  const handleChange = e => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setRmQty(val);
    }
  };

  const handleRemove = () => {
    const quantity = parseInt(rmQty, 10);

    // validation
    if (isNaN(quantity) || quantity < 1) {
      alert("⚠️ Please enter a quantity of at least 1.");
      return;
    }
    if (quantity > item.qty) {
      alert(`⚠️ You only have ${item.qty} of "${item.title}" in your cart.`);
      return;
    }

    onRemove(quantity);
    setRmQty("1");
    alert(`✅ Removed ${quantity} × "${item.title}" from your cart.`);
  };


  return (
    <li className="cart-item">
      <div className="cart-info">
        <strong>{item.title}</strong>
        <span>
          ${item.price.toFixed(2)} × {item.qty} = ${ (item.price * item.qty).toFixed(2) }
        </span>
      </div>

      <div className="cart-actions">
      <Link to={`/events/${item.id}`} className="view-btn">
          View Event
        </Link>
        <label className="action-label">
          Remove:
          <input
            className="action-input"
            type="text"          
            value={rmQty}
            onChange={handleChange}
            style={{ width: '3rem' }}
          />
        </label>

        <button
          className="remove-btn"
          onClick={handleRemove}
        >
          Remove{rmQty}
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}