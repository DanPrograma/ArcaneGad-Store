// src/pages/Productos.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCatalog } from '../utils/catalog';

export default function Productos() {
  const navigate = useNavigate();
  const base = getCatalog();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5_000_000);
  const [selectedTipo, setSelectedTipo] = useState('todos');
  const [filteredProducts, setFilteredProducts] = useState(base);

  const handleFilterClick = () => {
    const minOk = Number.isFinite(minPrice) ? minPrice : 0;
    const maxOk = Number.isFinite(maxPrice) ? maxPrice : Infinity;
    const newFiltered = getCatalog().filter((p) => {
      const priceOk = p.precio >= minOk && p.precio <= maxOk;
      const tipoOk = selectedTipo === 'todos' || p.tipo === selectedTipo;
      return priceOk && tipoOk;
    });
    setFilteredProducts(newFiltered);
  };

  const goDetalle = (id) => navigate(`/productos/${id}`);

  return (
    <Container>
      <h2 className="page-title">Ropa</h2>

      <Form
        onSubmit={(e) => { e.preventDefault(); handleFilterClick(); }}
        className="mb-3 p-3"
        style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12 }}
      >
        <Row className="g-2 align-items-end">
          <Col xs={12} md="auto">
            <Form.Group controlId="filtro-min" className="mb-0">
              <Form.Label htmlFor="filtro-min">Precio mínimo</Form.Label>
              <Form.Control
                id="filtro-min"
                aria-label="Precio mínimo"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                style={{ maxWidth: 180 }}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md="auto">
            <Form.Group controlId="filtro-max" className="mb-0">
              <Form.Label htmlFor="filtro-max">Precio máximo</Form.Label>
              <Form.Control
                id="filtro-max"
                aria-label="Precio máximo"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
                style={{ maxWidth: 180 }}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md="auto">
            <Form.Group controlId="filtro-tipo" className="mb-0">
              <Form.Label htmlFor="filtro-tipo">Tipo</Form.Label>
              <Form.Select
                id="filtro-tipo"
                aria-label="Tipo"
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
                style={{ maxWidth: 200 }}
              >
                <option value="todos">Todos</option>
                <option value="camisa">Camisa</option>
                <option value="pantalon">Pantalón</option>
                <option value="vestido">Vestido</option>
                <option value="falda">Falda</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md="auto" className="ms-md-auto">
            <Button type="submit" variant="primary">Filtrar</Button>
          </Col>
        </Row>
      </Form>

      {/* Grid etiquetado para que el test limite su búsqueda aquí */}
      <Row data-testid="grid-productos">
        {filteredProducts.map((p) => (
          <Col md={4} key={p.id} className="mb-3">
            <Card className="h-100 arcane">
              <Card.Img variant="top" src={p.img} alt={p.nombre} />
              <Card.Body>
                <Card.Title>{p.nombre}</Card.Title>
                <Card.Text className="mb-1" style={{ opacity: 0.9 }}>{p.descripcion}</Card.Text>
                <Card.Text className="fw-semibold">${p.precio.toLocaleString('es-CL')}</Card.Text>
                <Button onClick={() => goDetalle(p.id)} variant="outline-light">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
