// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/cleanup/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
