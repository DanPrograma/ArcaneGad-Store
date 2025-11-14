// src/utils/catalog.js
// Capa de catálogo: base (data/ropa) + extras de admin, respetando eliminados.

import { ropa as ropaBase } from '../data/ropa'; // export nombrado desde src/data/ropa.js

const EXTRA_KEY = 'catalog_extra';    // productos agregados por admin
const REM_KEY   = 'catalog_removed';  // ids marcados como eliminados

// Helpers de storage seguros
function readArray(key) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
function writeArray(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

// Devuelve catálogo combinado (base + extras) filtrando los eliminados en ambas fuentes
export function getCatalog() {
  const extras = readArray(EXTRA_KEY);
  const removed = new Set(readArray(REM_KEY));

  const baseFiltered   = (ropaBase || []).filter(p => p && !removed.has(p.id));
  const extrasFiltered = (extras   || []).filter(p => p && !removed.has(p.id));

  return [...baseFiltered, ...extrasFiltered];
}

// Agrega un producto “admin” (evita ids duplicados con base + extras)
export function addProduct(prod) {
  if (!prod || !prod.id) throw new Error('Producto sin id');

  const currentIds = new Set(
    [...(ropaBase || []), ...readArray(EXTRA_KEY)]
      .filter(Boolean)
      .map(p => p.id)
  );
  if (currentIds.has(prod.id)) throw new Error('ID de producto ya existe');

  const extras = readArray(EXTRA_KEY);
  extras.push(prod);
  writeArray(EXTRA_KEY, extras);

  // Si estaba eliminado, lo restauramos al agregarlo de nuevo
  const removed = new Set(readArray(REM_KEY));
  if (removed.has(prod.id)) {
    removed.delete(prod.id);
    writeArray(REM_KEY, [...removed]);
  }
}

// Marca un producto como eliminado y lo quita de extras
export function removeProduct(id) {
  if (!id) return;

  // marcar como eliminado
  const removed = new Set(readArray(REM_KEY));
  removed.add(id);
  writeArray(REM_KEY, [...removed]);

  // quitar de extras para que no aparezca aunque se olvide el filtro
  const nextExtras = readArray(EXTRA_KEY).filter(p => p.id !== id);
  writeArray(EXTRA_KEY, nextExtras);
}

// Quita un id de la lista de eliminados (no lo re-agrega a extras)
export function restoreProduct(id) {
  if (!id) return;
  const removed = new Set(readArray(REM_KEY));
  if (removed.delete(id)) writeArray(REM_KEY, [...removed]);
}

// Utilidad opcional para tests/resets
export function clearAdminChanges() {
  localStorage.removeItem(EXTRA_KEY);
  localStorage.removeItem(REM_KEY);
}

// Genera ids únicos legibles (ej: prd-camisa-20251113-0421)
export function genProductId(tipo = 'misc') {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
  const rnd = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `prd-${tipo}-${stamp}-${rnd}`;
}

// Export default opcional (comodidad)
export default {
  getCatalog,
  addProduct,
  removeProduct,
  restoreProduct,
  genProductId,
  clearAdminChanges,
};
