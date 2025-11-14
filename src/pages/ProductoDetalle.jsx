// src/pages/ProductoDetalle.jsx
import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { getCatalog } from '../utils/catalog';
import { useAuth } from '../auth/AuthContext';

const TALLAS = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductoDetalle({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const producto = useMemo(() => getCatalog().find(p => p.id === id), [id]);

  const [talla, setTalla] = useState(null);

  if (!producto) {
    return (
      <Container className="py-4">
        <h2>Producto no encontrado</h2>
        <Button variant="outline-light" onClick={() => navigate('/productos')}>Volver</Button>
      </Container>
    );
  }

  const handleAdd = () => {
    if (!talla) return;
    if (!user) { navigate('/register'); return; }
    onAdd?.({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      img: producto.img,
      talla,
      qty: 1,
    });
    navigate('/carrito');
  };

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 arcane">
            <Card.Img src={producto.img} alt={producto.nombre} />
          </Card>
        </Col>

        <Col md={6}>
          <h2 className="mb-2">{producto.nombre}</h2>
          <p className="mb-2" style={{opacity:.9}}>{producto.descripcion}</p>
          <p className="mb-3"><Badge bg="secondary" className="me-2 text-uppercase">{producto.categoria}</Badge><Badge bg="dark" className="text-uppercase">{producto.tipo}</Badge></p>
          <h4 className="mb-4">${producto.precio.toLocaleString('es-CL')}</h4>

          <div className="mb-3">
            <div className="mb-2 fw-semibold">Talla</div>
            <div className="d-flex gap-2 flex-wrap" role="group" aria-label="selector de talla">
              {TALLAS.map(t => (
                <Button
                  key={t}
                  variant={talla === t ? 'light' : 'outline-light'}
                  onClick={() => setTalla(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleAdd}
            disabled={!talla}                 // <- DESHABILITADO sin talla
          >
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
