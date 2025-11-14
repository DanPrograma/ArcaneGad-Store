// src/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

const LS_USER  = 'tg_user';
const LS_USERS = 'tg_users';

// Admin “semilla”: puedes cambiar clave aquí
const ADMIN = {
  username: 'admin',
  email: 'admin@arcanegad.cl',
  password: 'Admin123',
  nombre: 'Admin',
  role: 'admin',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_USER);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const saveUser = (u) => {
    setUser(u);
    localStorage.setItem(LS_USER, JSON.stringify(u));
  };

  // identifier = username o correo
  const login = async ({ identifier, password }) => {
    const id = identifier?.toLowerCase();

    // Admin por usuario O por correo
    if (
      (id === ADMIN.username || id === ADMIN.email) &&
      password === ADMIN.password
    ) {
      const adminUser = {
        username: ADMIN.username,
        email: ADMIN.email,
        nombre: ADMIN.nombre,
        role: 'admin',
      };
      saveUser(adminUser);
      return { ok: true, user: adminUser };
    }

    // Usuarios registrados (pueden NO tener email)
    const users = JSON.parse(localStorage.getItem(LS_USERS) || '[]');
    const found = users.find(
      (u) =>
        (u.username?.toLowerCase() === id ||
          u.email?.toLowerCase?.() === id) &&
        u.password === password
    );

    if (found) {
      const u = { ...found, password: undefined, role: found.role || 'user' };
      saveUser(u);
      return { ok: true, user: u };
    }
    return { ok: false, error: 'Credenciales inválidas' };
  };

  // email es opcional; seguimos permitiendo registro sin correo
  const register = async ({ nombre, apellido, username, password, email }) => {
    const users = JSON.parse(localStorage.getItem(LS_USERS) || '[]');
    if (users.some((u) => u.username?.toLowerCase() === username?.toLowerCase())) {
      return { ok: false, error: 'Ese usuario ya existe' };
    }
    const newUser = {
      nombre,
      apellido,
      username,
      password,
      email: email || null,
      role: 'user',
    };
    users.push(newUser);
    localStorage.setItem(LS_USERS, JSON.stringify(users));
    const u = { ...newUser, password: undefined };
    saveUser(u);
    return { ok: true, user: u };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_USER);
  };

  return (
    <AuthCtx.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
