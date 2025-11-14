import { getCatalog, addProduct, removeProduct } from '../src/utils/catalog';

describe('catalog utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('expone las funciones necesarias', () => {
    expect(typeof getCatalog).toBe('function');
    expect(typeof addProduct).toBe('function');
    expect(typeof removeProduct).toBe('function');
  });

  it('fusiona base + extras y respeta eliminados', () => {
    const baseLen = getCatalog().length;
    expect(Array.isArray(getCatalog())).toBe(true);

    addProduct({
      id: 'prd-test-1',
      nombre: 'X',
      descripcion: 'Producto de prueba',
      precio: 1000,
      tipo: 'camisa',
      categoria: 'hombre',
      img: '/arcane/test.jpg',
      oferta: false,
    });

    let merged = getCatalog();
    expect(merged.length).toBe(baseLen + 1);
    expect(merged.some(p => p.id === 'prd-test-1')).toBe(true);

    removeProduct('prd-test-1');
    merged = getCatalog();
    expect(merged.find(p => p.id === 'prd-test-1')).toBeUndefined();
    expect(merged.length).toBe(baseLen);
  });
});
