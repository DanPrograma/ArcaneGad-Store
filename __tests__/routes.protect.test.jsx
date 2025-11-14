// __tests__/routes.protect.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../src/components/ProtectedRoute';
import AdminRoute from '../src/components/AdminRoute';
import * as auth from '../src/auth/AuthContext';

describe('Rutas protegidas', () => {
  it('ProtectedRoute redirige a /login si no hay usuario', () => {
    vi.spyOn(auth, 'useAuth').mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={['/carrito']}>
        <Routes>
          <Route path="/login" element={<div>LOGIN</div>} />
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <div>OK</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });

  it('AdminRoute bloquea a usuario común y lo envía a /', () => {
    vi.spyOn(auth, 'useAuth').mockReturnValue({ user: { role: 'user' } });

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/" element={<div>HOME</div>} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div>ADMIN</div>
              </AdminRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('HOME')).toBeInTheDocument();
  });
});
