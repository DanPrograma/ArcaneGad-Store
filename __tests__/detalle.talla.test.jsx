// __tests__/detalle.talla.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductoDetalle from '../src/pages/ProductoDetalle';
import * as catalog from '../src/utils/catalog';
import * as auth from '../src/auth/AuthContext';

describe('Detalle requiere talla', () => {
  it('botón agregar deshabilitado sin talla; habilita al elegir', () => {
    // Catálogo con un producto
    vi.spyOn(catalog, 'getCatalog').mockReturnValue([
      { id:'ch-001', nombre:'Camisa', descripcion:'', precio:10000, tipo:'camisa', categoria:'hombre', img:'' }
    ]);
    // Usuario logueado para no redirigir a /register
    vi.spyOn(auth, 'useAuth').mockReturnValue({ user: { nombre:'Test' } });

    render(
      <MemoryRouter initialEntries={['/productos/ch-001']}>
        <Routes>
          <Route path="/productos/:id" element={<ProductoDetalle onAdd={()=>{}} />} />
        </Routes>
      </MemoryRouter>
    );

    const addBtn = screen.getByRole('button', { name:/Agregar al carrito/i });
    expect(addBtn).toBeDisabled();             // deshabilitado al inicio

    fireEvent.click(screen.getByRole('button', { name: 'M' })); // elegir talla M
    expect(addBtn).not.toBeDisabled();         // habilitado tras elegir talla
  });
});
