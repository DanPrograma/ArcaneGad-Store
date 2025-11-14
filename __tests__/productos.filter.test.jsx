// __tests__/productos.filter.test.jsx
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Productos from '../src/pages/Productos';
import * as catalog from '../src/utils/catalog';

describe('Productos filtros', () => {
  it('filtra por tipo "camisa"', () => {
    vi.spyOn(catalog, 'getCatalog').mockReturnValue([
      { id:'ch-001', nombre:'Camisa', descripcion:'', precio:10000, tipo:'camisa', categoria:'hombre', img:'' },
      { id:'pa-001', nombre:'Pantalón', descripcion:'', precio:20000, tipo:'pantalon', categoria:'hombre', img:'' },
    ]);

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Tipo/i), { target: { value: 'camisa' } });
    fireEvent.click(screen.getByRole('button', { name: /Filtrar/i }));

    const grid = screen.getByTestId('grid-productos');
    // dentro del grid debe existir Camisa y NO Pantalón
    expect(within(grid).getByText('Camisa')).toBeInTheDocument();
    expect(within(grid).queryByText('Pantalón')).toBeNull();
  });
});
