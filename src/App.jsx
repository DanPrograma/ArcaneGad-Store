// src/App.jsx
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';

const ProductoDetalle = lazy(() => import('./pages/ProductoDetalle'));

// Muestra errores en pantalla (evita pantalla en blanco)
class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error){ return { error }; }
  componentDidCatch(error, info){ console.error('App error:', error, info); }
  render(){
    if (this.state.error) {
      return (
        <div style={{ padding: 16 }}>
          <h2>Se produjo un error</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  useEffect(() => { document.title = 'ArcaneGad'; }, []);

  // Estado y persistencia del carrito
  const [carrito, setCarrito] = useState([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem('tg_cart');
      if (raw) setCarrito(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem('tg_cart', JSON.stringify(carrito));
  }, [carrito]);

  // Merge por (id + talla)
  const addToCart = (item) =>
    setCarrito(prev => {
      const i = prev.findIndex(x => x.id === item.id && x.talla === item.talla);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: (copy[i].qty || 1) + (item.qty || 1) };
        return copy;
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });

  const incrementItem = (index) =>
    setCarrito(prev => {
      const copy = [...prev];
      if (!copy[index]) return prev;
      copy[index] = { ...copy[index], qty: (copy[index].qty || 1) + 1 };
      return copy;
    });

  const decrementItem = (index) =>
    setCarrito(prev => {
      const copy = [...prev];
      if (!copy[index]) return prev;
      const nextQty = (copy[index].qty || 1) - 1;
      if (nextQty <= 0) copy.splice(index, 1);
      else copy[index] = { ...copy[index], qty: nextQty };
      return copy;
    });

  const removeFromCart = (index) =>
    setCarrito(prev => prev.filter((_, i) => i !== index));

  const clearCart = () => setCarrito([]);

  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <AppNavbar />
          <Suspense fallback={<div style={{ padding: 16 }}>Cargando…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<ProductoDetalle onAdd={addToCart} />} />
              <Route
                path="/carrito"
                element={
                  <ProtectedRoute>
                    <Carrito
                      items={carrito}
                      onIncrement={incrementItem}
                      onDecrement={decrementItem}
                      onRemove={removeFromCart}
                      onClear={clearCart}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}
