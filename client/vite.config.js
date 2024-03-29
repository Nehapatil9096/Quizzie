import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/Quizzie/",
  build: {
    rollupOptions: {
      external: ['react-toastify/dist/ReactToastify.css'] // Add the CSS file path here
    }
  }
});
