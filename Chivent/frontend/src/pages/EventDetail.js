// src/pages/EventDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`events/${id}/`).then(res => setEvent(res.data));
  }, [id]);

  if (!event) return <p>Loading…</p>;
  return (
    <div>
      <h1>{event.title}</h1>
      <img src={event.image_url} alt={event.title} />
      <p>{event.description}</p>
      <p>When: {new Date(event.start_time).toLocaleString()}</p>
      <p>Where: {event.location}</p>
      <p>Price: ${event.price}</p>
      {/* add “Add to Cart” button here later */}
    </div>
  );
}
