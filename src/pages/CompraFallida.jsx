// src/pages/CompraFallida.jsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CompraFallida() {
  const navigate = useNavigate();
  return (
    <Container className="py-5">
      <h2>Pago rechazado</h2>
      <p>Tu pago no pudo ser procesado. Intenta nuevamente o usa otro método.</p>
      <div className="d-flex gap-2">
        <Button variant="outline-secondary" onClick={() => navigate('/carrito')}>Volver al carrito</Button>
        <Button variant="success" onClick={() => navigate('/checkout')}>Intentar de nuevo</Button>
      </div>
    </Container>
  );
}
