// src/pages/Login.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // usuario o correo
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ identifier, password });
    if (res.ok) navigate('/');
    else setErr(res.error || 'Error de autenticación');
  };

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h2>Iniciar sesión</h2>
      {err && <Alert variant="danger" className="mt-3">{err}</Alert>}
      <Form onSubmit={onSubmit} className="mt-3">
        <Form.Group className="mb-3" controlId="login-id">
          <Form.Label>Usuario o correo</Form.Label>
          <Form.Control
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder="nomre de usuario o su correo terminado en '@arcanegad.cl'"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="login-pass">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
}
