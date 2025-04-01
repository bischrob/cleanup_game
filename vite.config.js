import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/cleanup/',  // <--- This is the key change
  plugins: [react()],
  build: {
    outDir: 'dist',  // output folder for the built site
  },
  server: {
    port: 5173,       // dev server port (only used in `npm run dev`)
  }
});

