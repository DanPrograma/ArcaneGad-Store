// src/pages/Checkout.jsx
// Pide Dirección, Ciudad, País y Teléfono. Genera "boleta" y limpia carrito.
// FIX: usamos `loaded` para no redirigir antes de cargar el carrito desde localStorage.
import React from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Checkout({ onSuccess }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // --- Carrito: fuente de verdad localStorage ---
  const [items, setItems] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false); // <- clave para evitar el “rebote” al carrito

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('tg_cart');
      const arr = raw ? JSON.parse(raw) : [];
      setItems(Array.isArray(arr) ? arr : []);
    } catch {
      setItems([]);
    } finally {
      setLoaded(true); // <- marcamos que ya intentamos cargar
    }
  }, []);

  // Si (y solo si) ya cargamos y no hay ítems, volvemos al carrito
  React.useEffect(() => {
    if (loaded && items.length === 0) {
      navigate('/carrito', { replace: true });
    }
  }, [loaded, items, navigate]);

  const fmt = (n) => `$${(n || 0).toLocaleString('es-CL')}`;
  const total = items.reduce((acc, it) => acc + (it.precio || 0) * (it.qty || 1), 0);

  // --- Formulario ---
  const [direccion, setDireccion] = React.useState('');
  const [ciudad, setCiudad] = React.useState('');
  const [pais, setPais] = React.useState('Chile');
  const [telefono, setTelefono] = React.useState('');

  const [touched, setTouched] = React.useState(false);
  const isEmpty = (s) => !s || !String(s).trim();
  const phoneOk = /^\+?\d{7,15}$/.test(String(telefono).trim());
  const formOk = !isEmpty(direccion) && !isEmpty(ciudad) && !isEmpty(pais) && phoneOk;

  function genFolio() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    return `AG-${y}${m}${day}-${rand}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!formOk) return;

    const order = {
      folio: genFolio(),
      fechaISO: new Date().toISOString(),
      comprador: {
        nombre: user?.nombre || 'Cliente',
        telefono: String(telefono).trim(),
        direccion: { direccion: direccion.trim(), ciudad: ciudad.trim(), pais: pais.trim() }
      },
      items: items.map(it => ({
        id: it.id,
        nombre: it.nombre,
        talla: it.talla || 'Única',
        qty: it.qty || 1,
        precio: it.precio || 0,
        subtotal: (it.precio || 0) * (it.qty || 1)
      })),
      total
    };

    localStorage.setItem('last_order', JSON.stringify(order));
    onSuccess?.(); // vacía carrito en App.jsx (clearCart)
    navigate('/compra-exitosa', { replace: true });
  }

  // Mientras cargamos, mostramos el esqueleto del checkout (sin rebotar)
  if (!loaded) {
    return (
      <Container className="py-4">
        <h2 className="page-title">Checkout</h2>
        <Card className="arcane p-3">Cargando…</Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="page-title">Checkout</h2>

      <Row className="g-3">
        <Col md={7}>
          <Card className="arcane p-3">
            <h5 className="mb-3">Datos de envío</h5>
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control value={user?.nombre || ''} readOnly placeholder="Nombre del cliente" />
                <Form.Text className="text-muted">Tomado de tu sesión.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  isInvalid={touched && isEmpty(direccion)}
                  placeholder="Calle 123, depto 45"
                  required
                />
                <Form.Control.Feedback type="invalid">Ingresa una dirección.</Form.Control.Feedback>
              </Form.Group>

              <Row className="g-2">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      isInvalid={touched && isEmpty(ciudad)}
                      placeholder="Viña del Mar"
                      required
                    />
                    <Form.Control.Feedback type="invalid">Ingresa una ciudad.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>País</Form.Label>
                    <Form.Control
                      value={pais}
                      onChange={(e) => setPais(e.target.value)}
                      isInvalid={touched && isEmpty(pais)}
                      placeholder="Chile"
                      required
                    />
                    <Form.Control.Feedback type="invalid">Ingresa un país.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  isInvalid={touched && !phoneOk}
                  placeholder="+56912345678"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un teléfono válido (7 a 15 dígitos, puedes incluir +).
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="outline-secondary" onClick={() => navigate('/carrito')}>
                  Volver al carrito
                </Button>
                <Button className="ms-auto" type="submit" variant="success">
                  Confirmar y pagar
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="arcane p-3">
            <h5 className="mb-3">Resumen</h5>
            <Table size="sm" responsive>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i}>
                    <td>
                      <div className="d-flex flex-column">
                        <span>{it.nombre} <small className="text-muted">({it.talla || 'Única'})</small></span>
                        <small className="text-muted">x{it.qty || 1} · {fmt(it.precio)}</small>
                      </div>
                    </td>
                    <td className="text-end">{fmt((it.precio || 0) * (it.qty || 1))}</td>
                  </tr>
                ))}
                <tr>
                  <td className="text-end fw-semibold">Total</td>
                  <td className="text-end fw-bold">{fmt(total)}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
