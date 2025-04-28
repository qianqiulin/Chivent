// src/pages/EventDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams} from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../pages/context//CartContext';
import './EventDetail.css'

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [qty, setQty]     = useState(1)
  const { add } = useContext(CartContext);

  useEffect(() => {
    api.get(`events/${id}/`).then(res => setEvent(res.data));
  }, [id]);
  const handleAdd = () => {
    const quantity = parseInt(qty, 10);
    if (isNaN(quantity) || quantity < 1) {
      alert("⚠️ Please enter a quantity of at least 1.");
      return;
    }

    add(
      { id: event.id, title: event.title, price: parseFloat(event.price) },
      quantity
    );
    setQty("1");
    alert(`✅ Added ${quantity} × "${event.title}" to your cart!`);
  };
  if (!event) return <p>Loading…</p>;
  return (
    <div className="event-detail">
     <h1 className="ed-title">{event.title}</h1>

     {/* make image much larger */}
     <div className="ed-image-wrapper">
       <img
         className="ed-image"
         src={event.image_url}
         alt={event.title}
       />
     </div>

     {/* description with its own font */}
     <p className="ed-description">{event.description}</p>

     {/* time & location with icons */}
     <p className="ed-meta">
    <i className="fa-solid fa-calendar"></i>
    <span>
      {new Date(event.start_time).toLocaleString()}
      {' – '}
      {new Date(event.end_time).toLocaleString()}
    </span>
  </p>
     <p className="ed-meta">
       <i className="fa-solid fa-location-dot"></i>
       <span>{event.location}</span>
     </p>

     <p className="ed-price">${parseFloat(event.price).toFixed(2)}</p>

     <div className="ed-actions">
       <label>
         Qty:{' '}
         <input
           type="text"
           value={qty}
           onChange={e => {
             const v = e.target.value;
             if (v === '' || /^[0-9\b]+$/.test(v)) setQty(v);
           }}
           onFocus={e => e.target.select()}
           className="ed-qty-input"
         />
       </label>
       <button className="add-button" onClick={handleAdd}>
         Add {(parseInt(qty, 10) || 1)} to Cart
       </button>
     </div>
   </div>
  );
}
