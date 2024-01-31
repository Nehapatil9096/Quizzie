import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Plugins
  plugins: [react()],
  base:"/Quizzie/",
  
});