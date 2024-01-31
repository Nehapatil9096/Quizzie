import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Plugins
  plugins: [react()],
  base: "/Quizzie/",
  // Explicitly mark react-redux as external
  build: {
    rollupOptions: {
      external: ['react-redux']
    }
  }
});
