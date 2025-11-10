// src/App.jsx
// App raíz: rutas, navbar, estado global del carrito con persistencia y checkout.
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas básicas
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';

// Detalle de producto en lazy (para no romper el arranque si falla)
const ProductoDetalle = lazy(() => import('./pages/ProductoDetalle'));

// Checkout y resultado
import Checkout from './pages/Checkout.jsx';
import CompraExitosa from './pages/CompraExitosa';
import CompraFallida from './pages/CompraFallida';

export default function App() {
  // Título
  useEffect(() => { document.title = 'ArcaneGad'; }, []);

  // Estado del carrito con persistencia en localStorage
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

  // Agregar (merge por id + talla)
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

  // Controles cantidad
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
        <AppNavbar />
        {/* Suspense: fallback mientras carga ProductoDetalle (lazy) */}
        <Suspense fallback={<div style={{ padding: 16 }}>Cargando…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<ProductoDetalle onAdd={addToCart} />} />

            {/* Carrito protegido: exige login */}
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

            {/* Checkout protegido: exige login */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  {/* Pasamos clearCart para vaciar al finalizar */}
                  <Checkout onSuccess={clearCart} />
                </ProtectedRoute>
              }
            />

            {/* Resultados del pago */}
            <Route path="/compra-exitosa" element={<CompraExitosa />} />
            <Route path="/compra-fallida" element={<CompraFallida />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Catch-all */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
