// src/utils/cart.js
// Utilidades puras de carrito: merge por id+talla, inc/dec, remover y totales.

function normQty(q) {
  const n = Number(q);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

// Agregar un ítem: si coincide id+talla, suma cantidades; si no, crea línea.
export function mergeAdd(prev, item) {
  if (!item || !item.id) return prev;
  const talla = item.talla ?? null;
  const qty = normQty(item.qty ?? 1);
  const idx = prev.findIndex(l => l.id === item.id && l.talla === talla);
  if (idx >= 0) {
    const copy = [...prev];
    copy[idx] = { ...copy[idx], qty: (copy[idx].qty ?? 1) + qty };
    return copy;
    }
  return [...prev, { ...item, talla, qty }];
}

// Incrementa cantidad en 1 para id+talla
export function incQty(prev, id, talla) {
  return prev.map(l =>
    l.id === id && l.talla === talla ? { ...l, qty: (l.qty ?? 1) + 1 } : l
  );
}

// Decrementa cantidad; si llega a 0, quita la línea
export function decQty(prev, id, talla) {
  return prev
    .map(l =>
      l.id === id && l.talla === talla ? { ...l, qty: (l.qty ?? 1) - 1 } : l
    )
    .filter(l => (l.qty ?? 1) > 0);
}

// Elimina la línea por id+talla (sin tocar otras)
export function removeLine(prev, id, talla) {
  return prev.filter(l => !(l.id === id && l.talla === talla));
}

// Totales: { items (suma qty), subtotal (precio*qty) }
export function computeTotals(lines) {
  return (lines || []).reduce(
    (acc, l) => {
      const q = normQty(l.qty ?? 1);
      const p = Number(l.precio) || 0;
      acc.items += q;
      acc.subtotal += p * q;
      return acc;
    },
    { items: 0, subtotal: 0 }
  );
}

export default { mergeAdd, incQty, decQty, removeLine, computeTotals };
