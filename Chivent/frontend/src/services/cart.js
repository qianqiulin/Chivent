import api from './api';

export const fetchCart = () =>
  api.get('cart/').then(r => r.data);

export const addToCart = item =>
  api.post('cart/', item).then(r => r.data);

export const removeFromCart = id =>
  api.patch('cart/', { id }).then(r => r.data);

export const clearCart = () =>
  api.delete('cart/');
