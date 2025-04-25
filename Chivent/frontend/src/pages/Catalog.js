// src/pages/Catalog.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('events/')
      .then((res) => {
        // if you have pagination off, res.data is already an array:
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load events');
      });
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (events === null) return <p>Loading events…</p>;
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', padding: '1rem' }}>
      {events.map((e) => (
        <article
          key={e.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Link to={`/events/${e.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src={e.image_url}
              alt={e.title}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div style={{ padding: '0.5rem 1rem' }}>
              <h2 style={{ margin: '0.5rem 0' }}>{e.title}</h2>
              <p style={{ margin: '0.25rem 0', color: '#555' }}>
                {new Date(e.start_time).toLocaleString()} –{' '}
                {new Date(e.end_time).toLocaleString()}
              </p>
              <p style={{ margin: '0.25rem 0', fontWeight: 'bold' }}>${e.price}</p>
              <p style={{ margin: '0.25rem 0', color: '#777' }}>{e.location}</p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
