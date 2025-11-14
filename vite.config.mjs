// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],

  // (opcional) ajustes de dev/preview
  server: { port: 5173, open: false },
  preview: { port: 4173 },

  // Config de Vitest (usa este archivo, no vitest.config.js)
  test: {
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, '__tests__/setup.js')], // << debe existir
    globals: true,
    include: ['__tests__/**/*.test.{js,jsx,ts,tsx}'],
    css: true, // permite imports de CSS en tests si aparecen
  },
});
