import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Get the directory name of the current module file
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  root: '.', // Ensure this matches your project structure
  build: {
    outDir: path.resolve(__dirname, 'build'),
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Ensure this path is correct
    },
  },
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
  },
});
