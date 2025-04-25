// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Catalog from './pages/Catalog';
import EventDetail from './pages/EventDetail';
import Cart from './pages/Cart';

export default function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Catalog</Link>
        <Link to="/cart">Cart</Link>
      </header>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}