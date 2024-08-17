import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/todos': {
        target: 'http://localhost:3309', // Ensure this matches your backend port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/todos/, '/todos'),
      },
    },
  },
});
