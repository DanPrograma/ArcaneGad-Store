// devuelva un string legible para mostrar el usuario en la UI
export function userLabel(u) {
  if (!u) return 'Usuario';
  if (typeof u === 'string') return u;
  const nom = [u.nombre, u.apellido].filter(Boolean).join(' ').trim();
  return nom || u.username || u.email || 'Usuario';
}
export default userLabel;
