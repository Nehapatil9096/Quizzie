import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Plugins
  plugins: [react()],

  // Build Configuration
  build: {
    outDir: 'build', // Specify the output directory here
  },
});
