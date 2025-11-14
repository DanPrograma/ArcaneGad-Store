import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import userLabel from '../utils/userLabel';

export default function AppNavbar() {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">ArcaneGad</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/productos">Ropa</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">Carrito</Nav.Link>
            {!!user?.role && user.role === 'admin' && (
              <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  Hola, <strong>{userLabel(user)}</strong>
                </Navbar.Text>
                <Button size="sm" variant="outline-light" onClick={logout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
