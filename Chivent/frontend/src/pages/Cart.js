// src/pages/Cart.js
import React, { useState, useContext } from 'react'
import { CartContext } from '../pages/context/CartContext'

export default function Cart() {
  const { cart, remove, clear } = useContext(CartContext)

  if (cart.length === 0) return <p>Your cart is empty.</p>

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Your Cart</h1>
      <ul>
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={(qtyToRemove) => remove(item.id, qtyToRemove)}
          />
        ))}
      </ul>
      <button onClick={clear} style={{ marginTop: '1rem' }}>
        Clear Cart
      </button>
    </div>
  )
}

function CartItem({ item, onRemove }) {
  const [rmQty, setRmQty] = useState(1)

  return (
    <li style={{ marginBottom: '1rem' }}>
      <strong>{item.title}</strong> — ${item.price} × {item.qty}

      <label style={{ marginLeft: '1rem' }}>
        Remove quantity:{' '}
        <input
          type="number"
          min="1"
          max={item.qty}
          value={rmQty}
          onChange={e =>
            setRmQty(Math.min(item.qty, Math.max(1, parseInt(e.target.value) || 1)))
          }
          style={{ width: '3rem' }}
        />
      </label>

      <button
        onClick={() => onRemove(rmQty)}
        style={{ marginLeft: '0.5rem' }}
      >
        Remove {rmQty}
      </button>
    </li>
  )
}
