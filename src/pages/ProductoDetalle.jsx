// src/pages/ProductoDetalle.jsx
import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ropa } from '../data/ropa';

export default function ProductoDetalle({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // normalizamos por si viene codificado o con tipos distintos
  const safeId = decodeURIComponent(String(id));
  const prod = ropa.find(p => String(p.id) === safeId);

  const [talla, setTalla] = React.useState('');
  const tallas = ['S', 'M', 'L', 'XL', 'XXL'];

  if (!prod) {
    return (
      <Container className="py-5">
        <h3>Producto no encontrado</h3>
        <Button variant="outline-secondary" className="mt-2" onClick={() => navigate('/productos')}>
          Volver a Ropa
        </Button>
      </Container>
    );
  }

  const handleAdd = () => {
    if (!talla) return;
    if (!user) {
      navigate('/register', { replace: true, state: { from: '/carrito' } });
      return;
    }
    onAdd?.({ ...prod, talla, qty: 1 });
    navigate('/carrito');
  };

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={6}>
          <Card className="arcane">
            <Card.Img src={prod.img} alt={prod.nombre} />
          </Card>
        </Col>
        <Col md={6}>
          <h2 className="mb-1">{prod.nombre}</h2>
          {prod.oferta && <Badge bg="secondary" className="mb-2">Oferta</Badge>}
          <p className="mb-2" style={{ opacity: .9 }}>{prod.descripcion}</p>
          <p className="fw-bold fs-5 mb-3">${prod.precio.toLocaleString('es-CL')}</p>

          <div className="mb-3">
            <div className="mb-2 fw-semibold">Talla</div>
            <div className="d-flex flex-wrap gap-2">
              {tallas.map(t => (
                <Button
                  key={t}
                  variant={talla === t ? 'primary' : 'outline-light'}
                  onClick={() => setTalla(t)}
                  style={{ minWidth: 60 }}
                >
                  {t}
                </Button>
              ))}
            </div>
            {!talla && <div className="mt-2 text-warning" style={{ opacity: .8 }}>Selecciona una talla para continuar.</div>}
          </div>

          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>Volver</Button>
            <Button variant="success" disabled={!talla} onClick={handleAdd}>
              Agregar al carrito
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

