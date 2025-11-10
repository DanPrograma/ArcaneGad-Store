// src/pages/Carrito.jsx
// Carrito con panel translúcido + controles de cantidad. Botón Pagar → /checkout.
import React from 'react';
import { Container, Table, Button, ButtonGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.css'; // estilos del carrito (translúcido, contraste)

export default function Carrito({ items = [], onIncrement, onDecrement, onRemove, onClear }) {
  const navigate = useNavigate();
  const fmt = (n) => `$${(n || 0).toLocaleString('es-CL')}`;
  const total = items.reduce((acc, it) => acc + (it.precio || 0) * (it.qty || 1), 0);

  // Vacío
  if (!items.length) {
    return (
      <Container className="py-4">
        <h2 className="page-title">Carrito</h2>
        <div className="cart-panel">
          <p className="mb-3" style={{ opacity: 0.9 }}>Tu carrito está vacío.</p>
          <Button variant="outline-success" onClick={() => navigate('/productos')}>Ir a comprar</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="page-title">Carrito</h2>

      <div className="cart-panel mb-3">
        <Table hover responsive className="table cart-table mb-0 align-middle">
          <thead className="cart-head">
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th>Producto</th>
              <th style={{ width: 110 }}>Talla</th>
              <th style={{ width: 140 }}>Precio</th>
              <th style={{ width: 200 }}>Cantidad</th>
              <th style={{ width: 160 }}>Subtotal</th>
              <th style={{ width: 120 }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={`${it.id}-${it.talla || 'única'}`} className="cart-row">
                <td>{idx + 1}</td>
                <td>
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">{it.nombre}</span>
                    <small style={{ opacity: .8 }}>{it.descripcion}</small>
                  </div>
                </td>
                <td><Badge bg="secondary">{it.talla || 'Única'}</Badge></td>
                <td>{fmt(it.precio)}</td>
                <td>
                  <ButtonGroup size="sm" aria-label="cantidad">
                    <Button variant="outline-light" className="btn-qty" onClick={() => onDecrement?.(idx)}>−</Button>
                    <Button variant="outline-light" className="btn-qty-display" disabled>{it.qty || 1}</Button>
                    <Button variant="outline-light" className="btn-qty" onClick={() => onIncrement?.(idx)}>+</Button>
                  </ButtonGroup>
                </td>
                <td>{fmt((it.precio || 0) * (it.qty || 1))}</td>
                <td>
                  <Button size="sm" variant="outline-danger" onClick={() => onRemove?.(idx)}>Eliminar</Button>
                </td>
              </tr>
            ))}
            <tr className="cart-row">
              <td colSpan={5} className="text-end fw-semibold">Total</td>
              <td className="fw-bold">{fmt(total)}</td>
              <td />
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="d-flex gap-2">
        <Button variant="outline-secondary" onClick={() => navigate('/productos')}>Seguir comprando</Button>
        <Button variant="outline-danger" onClick={() => onClear?.()}>Vaciar carrito</Button>
        {/* Ir al checkout */}
        <Button className="ms-auto" variant="success" onClick={() => navigate('/checkout')}>Pagar</Button>
      </div>
    </Container>
  );
}
