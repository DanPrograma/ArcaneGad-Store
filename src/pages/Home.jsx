// src/pages/Home.jsx
import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ropa } from '../data/ropa';

export default function Home() {
  const navigate = useNavigate();

  // Toma 1 producto por tipo en orden: camisa, pantalón, vestido, falda
  const destacados = React.useMemo(() => {
    const pick = (tipo) => ropa.find(p => p.tipo === tipo) || null;
    return [pick('camisa'), pick('pantalon'), pick('vestido'), pick('falda')].filter(Boolean);
  }, []);

  const testimonios = React.useMemo(
    () => ['Excelente calidad', 'Llegó rapidísimo', 'Buen precio/calidad'],
    []
  );
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % testimonios.length), 3000);
    return () => clearInterval(id);
  }, [testimonios.length]);

  const irADetalle = (id) => {
    navigate(`/productos/${encodeURIComponent(String(id))}`);
  };

  return (
    <>
      {/* Banner portada (sin texto encima) */}
      <Container className="mt-3">
        <div
          className="banner-header"
          style={{ backgroundImage: "url('/arcane/hero.jpg')" }}
          aria-hidden="true"
        />
        {/* Título debajo del banner */}
        <h2 className="mt-3 text-center fw-bold">ArcaneGad — Tu tienda de Ropa</h2>
      </Container>

      {/* Novedades (1 por tipo) */}
      <Container className="mb-5">
        <h3 className="mb-3">Novedades</h3>
        <Row xs={1} sm={2} md={4}>
          {destacados.map(p => (
            <Col key={p.id} className="mb-4">
              <Card className="arcane h-100">
                <Card.Img variant="top" src={p.img} alt={p.nombre} />
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    <span>{p.nombre}</span>
                    {p.oferta && <Badge bg="secondary">Oferta</Badge>}
                  </Card.Title>
                  <Card.Text className="mb-2" style={{ opacity: 0.9 }}>
                    {p.descripcion}
                  </Card.Text>
                  <Card.Text className="fw-semibold">
                    ${p.precio.toLocaleString('es-CL')}
                  </Card.Text>
                  <div className="d-flex gap-2">
                    <Button variant="outline-light" onClick={() => irADetalle(p.id)}>
                      Ver más
                    </Button>
                    <Button variant="outline-success" onClick={() => navigate('/productos')}>
                      Ver catálogo
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Testimonios + Newsletter */}
      <Container className="pb-5">
        <Row className="g-3">
          <Col md={6}>
            <Card className="arcane p-3">
              <h5 className="mb-2">Lo que dicen</h5>
              <p className="mb-0">{testimonios[idx]}</p>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="arcane p-3">
              <h5 className="mb-2">Newsletter</h5>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('¡Gracias por suscribirte!');
                }}
              >
                <div className="d-flex gap-2">
                  <input type="email" required placeholder="tu@correo.cl" className="form-control" />
                  <Button type="submit" variant="outline-success">Suscribirme</Button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
