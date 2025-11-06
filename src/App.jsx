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

// Lazy SOLO para evitar que un error en ProductoDetalle rompa el inicio
const ProductoDetalle = lazy(() => import('./pages/ProductoDetalle'));

export default function App() {
  useEffect(() => { document.title = 'ArcaneGad'; }, []);

  // carrito con persistencia
  const [carrito, setCarrito] = useState([]);
  useEffect(() => { try {
    const raw = localStorage.getItem('tg_cart'); if (raw) setCarrito(JSON.parse(raw));
  } catch {} }, []);
  useEffect(() => { localStorage.setItem('tg_cart', JSON.stringify(carrito)); }, [carrito]);

  const addToCart = (item) =>
    setCarrito(prev => {
      const i = prev.findIndex(x => x.id === item.id && x.talla === item.talla);
      if (i >= 0) { const copy = [...prev]; copy[i] = { ...copy[i], qty: (copy[i].qty||1)+(item.qty||1) }; return copy; }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  const removeFromCart = (index) => setCarrito(prev => prev.filter((_, i) => i !== index));
  const clearCart = () => setCarrito([]);

  return (
    <AuthProvider>
      <Router>
        <AppNavbar />
        <Suspense fallback={<div style={{padding:16}}>Cargando…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<ProductoDetalle onAdd={addToCart} />} />
            <Route path="/carrito" element={
              <ProtectedRoute>
                <Carrito items={carrito} onRemove={removeFromCart} onClear={clearCart} />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
