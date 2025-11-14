// __tests__/cart.merge.test.jsx
import { mergeAdd, incQty, decQty, removeLine, computeTotals } from '../src/utils/cart';

describe('carrito (merge por id+talla)', () => {
  it('suma cantidades si id+talla coinciden', () => {
    const a = [{ id: 'x', talla: 'M', qty: 1, precio: 1000 }];
    const b = mergeAdd(a, { id: 'x', talla: 'M', qty: 2, precio: 1000 });
    expect(b).toHaveLength(1);
    expect(b[0].qty).toBe(3);
  });

  it('crea línea nueva si la talla es distinta', () => {
    const a = [{ id: 'x', talla: 'M', qty: 1, precio: 1000 }];
    const b = mergeAdd(a, { id: 'x', talla: 'L', qty: 1, precio: 1000 });
    expect(b).toHaveLength(2);
    expect(b.find(l => l.talla === 'L').qty).toBe(1);
  });

  it('decQty resta y elimina línea al llegar a 0', () => {
    const a = [{ id: 'x', talla: 'M', qty: 1, precio: 1000 }];
    const b = decQty(a, 'x', 'M');
    expect(b).toHaveLength(0);
  });

  it('removeLine elimina la línea exacta por id+talla', () => {
    const a = [
      { id: 'x', talla: 'M', qty: 2, precio: 1000 },
      { id: 'x', talla: 'L', qty: 1, precio: 1000 },
    ];
    const b = removeLine(a, 'x', 'M');
    expect(b).toHaveLength(1);
    expect(b[0].talla).toBe('L');
  });

  it('computeTotals calcula items y subtotal', () => {
    const lines = [
      { id: 'x', talla: 'M', qty: 2, precio: 1000 },
      { id: 'y', talla: 'S', qty: 3, precio: 500 },
    ];
    const { items, subtotal } = computeTotals(lines);
    expect(items).toBe(5);
    expect(subtotal).toBe(2 * 1000 + 3 * 500);
  });
});
