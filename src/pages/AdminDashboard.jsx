// src/pages/AdminDashboard.jsx
import userLabel from '../utils/userLabel';
import { useAuth } from '../auth/AuthContext';
import React from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge } from 'react-bootstrap';
import { getCatalog, addProduct, removeProduct, genProductId } from '../utils/catalog';

export default function AdminDashboard() {
  const [items, setItems] = React.useState(getCatalog());
  const [error, setError] = React.useState('');
  const [ok, setOk] = React.useState('');
  const tipos = ['camisa', 'pantalon', 'vestido', 'falda'];

  // Form estado
  const [form, setForm] = React.useState({
    id: genProductId('camisa'),
    nombre: '',
    descripcion: '',
    precio: 0,
    tipo: 'camisa',
    categoria: 'hombre',   // hombre/mujer
    img: '',
    oferta: false
  });

  function refresh() { setItems(getCatalog()); }

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : (name==='precio' ? Number(value) : value) }));
  }

  function onTipoChange(e) {
    const val = e.target.value;
    setForm(f => ({ ...f, tipo: val, id: genProductId(val) }));
  }

  async function onAdd(e) {
    e.preventDefault();
    setError(''); setOk('');
    try {
      if (!form.nombre || !form.descripcion || !form.img || !form.tipo || !form.categoria) {
        throw new Error('Completa todos los campos');
      }
      if (!Number.isFinite(form.precio) || form.precio <= 0) throw new Error('Precio inválido');
      await addProduct({ ...form });
      setOk('Producto agregado');
      refresh();
      // limpiar nombre/desc/img pero conservar tipo/categoria
      setForm(f => ({ ...f, id: genProductId(f.tipo), nombre: '', descripcion: '', precio: 0, img: '', oferta: false }));
    } catch (err) {
      setError(err.message || String(err));
    }
  }

  function onRemove(id) {
    setError(''); setOk('');
    removeProduct(id);
    setOk('Producto eliminado');
    refresh();
  }

  return (
    <Container className="py-4">
      <h2 className="page-title">Administración</h2>
      <Row className="g-3">
        <Col md={5}>
          <Card className="arcane p-3">
            <h5 className="mb-3">Agregar producto</h5>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            {ok && <div className="alert alert-success py-2">{ok}</div>}
            <Form onSubmit={onAdd}>
              <Form.Group className="mb-2">
                <Form.Label>ID (auto)</Form.Label>
                <Form.Control value={form.id} readOnly />
              </Form.Group>
              <Row className="g-2">
                <Col sm={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Select name="tipo" value={form.tipo} onChange={onTipoChange}>
                      {tipos.map(t => <option key={t} value={t}>{t}</option>)}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select name="categoria" value={form.categoria} onChange={onChange}>
                      <option value="hombre">hombre</option>
                      <option value="mujer">mujer</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={form.nombre} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Descripción</Form.Label>
                <Form.Control name="descripcion" value={form.descripcion} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" name="precio" value={form.precio} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control name="img" value={form.img} onChange={onChange} placeholder="/arcane/camisa-hombre-1.jpg o https://..." />
              </Form.Group>
              <Form.Check
                className="mb-3"
                type="checkbox"
                name="oferta"
                checked={form.oferta}
                onChange={onChange}
                label="Oferta"
              />
              <Button type="submit" variant="success">Agregar</Button>
            </Form>
          </Card>
        </Col>

        <Col md={7}>
          <Card className="arcane p-3">
            <h5 className="mb-3">Catálogo actual</h5>
            <Table responsive size="sm" className="align-middle">
              <thead>
                <tr>
                  <th>ID</th><th>Tipo</th><th>Cat.</th><th>Nombre</th><th>Precio</th><th>Oferta</th><th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(p => (
                  <tr key={p.id}>
                    <td><code>{p.id}</code></td>
                    <td>{p.tipo}</td>
                    <td>{p.categoria}</td>
                    <td>{p.nombre}</td>
                    <td>${(p.precio||0).toLocaleString('es-CL')}</td>
                    <td>{p.oferta ? <Badge bg="secondary">Sí</Badge> : '—'}</td>
                    <td className="text-end">
                      <Button size="sm" variant="outline-danger" onClick={() => onRemove(p.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
