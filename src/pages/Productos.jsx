// src/pages/Productos.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ropa } from '../data/ropa';

export default function Productos() {
  const navigate = useNavigate();

  // Filtros
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5_000_000);
  const [selectedTipo, setSelectedTipo] = useState('todos');

  // Lista mostrada
  const [filteredProducts, setFilteredProducts] = useState(ropa);

  // Aplicar filtros (precio + tipo)
  const handleFilterClick = () => {
    const minOk = Number.isFinite(minPrice) ? minPrice : 0;
    const maxOk = Number.isFinite(maxPrice) ? maxPrice : Infinity;
    const newFiltered = ropa.filter((p) => {
      const priceOk = p.precio >= minOk && p.precio <= maxOk;
      const tipoOk = selectedTipo === 'todos' || p.tipo === selectedTipo;
      return priceOk && tipoOk;
    });
    setFilteredProducts(newFiltered);
  };

  function goDetalle(id) {
    navigate(`/productos/${id}`);
  }

  return (
    <Container>
      <h2 className="page-title">Ropa</h2>

      <Form
        onSubmit={(e) => { e.preventDefault(); handleFilterClick(); }}
        className="mb-3 p-3"
        style={{
          background: 'rgba(255,255,255,.03)',
          border: '1px solid rgba(255,255,255,.12)',
          borderRadius: 12
        }}
      >
        <Row className="g-2 align-items-end">
          <Col xs={12} md="auto">
            <Form.Label>Precio mínimo</Form.Label>
            <Form.Control
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
              style={{ maxWidth: 180 }}
            />
          </Col>
          <Col xs={12} md="auto">
            <Form.Label>Precio máximo</Form.Label>
            <Form.Control
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
              style={{ maxWidth: 180 }}
            />
          </Col>
          <Col xs={12} md="auto">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
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
          </Col>
          <Col xs={12} md="auto" className="ms-md-auto">
            <Button type="submit" variant="primary">Filtrar</Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {filteredProducts.map((p) => (
          <Col md={4} key={p.id} className="mb-3">
            <Card className="h-100 arcane">
              <Card.Img variant="top" src={p.img} alt={p.nombre} />
              <Card.Body>
                <Card.Title>{p.nombre}</Card.Title>
                <Card.Text className="mb-1" style={{ opacity: 0.9 }}>{p.descripcion}</Card.Text>
                <Card.Text className="fw-semibold">
                  ${p.precio.toLocaleString('es-CL')}
                </Card.Text>
                <Button onClick={() => goDetalle(p.id)} variant="outline-light">
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
