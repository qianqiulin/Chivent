// src/pages/EventDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../pages/context//CartContext';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [qty, setQty]     = useState(1)
  const { add } = useContext(CartContext);

  useEffect(() => {
    api.get(`events/${id}/`).then(res => setEvent(res.data));
  }, [id]);

  if (!event) return <p>Loading…</p>;
  return (
    <div style={{ padding: '1rem' }}>
      <h1>{event.title}</h1>
      <img src={event.image_url} alt={event.title} style={{ maxWidth: '100%' }}/>
      <p>{event.description}</p>
      <p>When: {new Date(event.start_time).toLocaleString()}</p>
      <p>Where: {event.location}</p>
      <p>Price: ${event.price}</p>
      <label>
        Quantity:{' '}
        <input
          type="number"
          min="1"
          value={qty}
          onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
          style={{ width: '3rem' }}
        />
      </label>
      <button
        onClick={() => add({
          id: event.id,
          title: event.title,
          price: event.price
        }, qty)}
        style={{
          display: 'block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Add {qty} to Cart
      </button>
    </div>
  );
}
