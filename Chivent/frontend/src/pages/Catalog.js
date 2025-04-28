
// src/pages/Catalog.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Catalog.css';

export default function Catalog() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('events/')
      .then(res => setEvents(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load events');
      });
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (events === null) return <p>Loading events…</p>;
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div className="catalog-grid">
      {events.map(e => (
        <article key={e.id} className="event-card">
          <Link to={`/events/${e.id}`} className="event-link">
            <img
              src={e.image_url}
              alt={e.title}
              className="event-image"
              onError={i => (i.target.style.filter = 'none')}
            />
            <div className="event-info">
              <h2 className="event-title">{e.title}</h2>
              <p className="event-detail">
                {new Date(e.start_time).toLocaleString()} –{' '}
                {new Date(e.end_time).toLocaleString()}
              </p>
              <p className="event-detail" style={{ fontWeight: 'bold' }}>
                ${e.price}
              </p>
              <p className="event-detail">{e.location}</p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
