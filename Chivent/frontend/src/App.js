// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Catalog from './pages/Catalog';
import EventDetail from './pages/EventDetail';
import Cart from './pages/Cart';
import './App.css';

export default function App() {
  return (
    <Router>
      <header className="header">
        <h1 className="title">Chivent</h1>
        <nav className="nav">
          <Link to="/"         className="nav-link">Catalog</Link>
          <Link to="/cart"     className="nav-link">Cart</Link>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/"              element={<Catalog />} />
          <Route path="/events/:id"    element={<EventDetail />} />
          <Route path="/cart"          element={<Cart />} />
        </Routes>
      </main>
    </Router>
  );
}