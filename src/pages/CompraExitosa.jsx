// src/pages/CompraExitosa.jsx
// Muestra la "boleta" (recibo) con productos, comprador y total.
// Incluye botón "Imprimir" y enlace para volver al inicio.
import React from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CompraExitosa() {
  const navigate = useNavigate();

  // Recuperar boleta desde localStorage (se guardó en Checkout)
  const [order, setOrder] = React.useState(null);
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('last_order');
      setOrder(raw ? JSON.parse(raw) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  if (!order) {
    return (
      <Container className="py-5">
        <h3>No hay información de compra</h3>
        <p>Vuelve al carrito e intenta nuevamente.</p>
        <Button variant="outline-secondary" onClick={() => navigate('/')}>Volver al inicio</Button>
      </Container>
    );
  }

  const fmt = (n) => `$${(n || 0).toLocaleString('es-CL')}`;
  const fecha = new Date(order.fechaISO);
  const fechaStr = fecha.toLocaleString('es-CL', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <Container className="py-4">
      <h2 className="page-title">Compra exitosa</h2>

      <Card className="arcane p-3">
        {/* Encabezado de la boleta */}
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h4 className="mb-1">ArcaneGad</h4>
            <div style={{ opacity: .8 }}>Boleta electrónica</div>
          </div>
          <div className="text-end">
            <div><strong>Folio:</strong> {order.folio}</div>
            <div><strong>Fecha:</strong> {fechaStr}</div>
          </div>
        </div>

        <hr />

        {/* Datos del comprador */}
        <div className="mb-3">
          <h6>Datos del comprador</h6>
          <div><strong>Nombre:</strong> {order.comprador?.nombre}</div>
          <div><strong>Teléfono:</strong> {order.comprador?.telefono}</div>
          <div>
            <strong>Dirección:</strong>{' '}
            {order.comprador?.direccion?.direccion}, {order.comprador?.direccion?.ciudad}, {order.comprador?.direccion?.pais}
          </div>
        </div>

        {/* Ítems de la compra */}
        <Table responsive size="sm" className="mb-2">
          <thead>
            <tr>
              <th>Producto</th>
              <th style={{width:100}}>Talla</th>
              <th style={{width:90}} className="text-end">Cant.</th>
              <th style={{width:120}} className="text-end">Precio</th>
              <th style={{width:140}} className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it, i) => (
              <tr key={i}>
                <td>{it.nombre}</td>
                <td>{it.talla}</td>
                <td className="text-end">{it.qty}</td>
                <td className="text-end">{fmt(it.precio)}</td>
                <td className="text-end">{fmt(it.subtotal)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="text-end fw-semibold">Total</td>
              <td className="text-end fw-bold">{fmt(order.total)}</td>
            </tr>
          </tbody>
        </Table>

        {/* Acciones */}
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={() => navigate('/')}>Volver al inicio</Button>
          <Button className="ms-auto" variant="success" onClick={() => window.print()}>Imprimir boleta</Button>
        </div>
      </Card>
    </Container>
  );
}
