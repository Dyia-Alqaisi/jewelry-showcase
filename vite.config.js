import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// base './' => works on any GitHub Pages path or custom domain.
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        dark: resolve(__dirname, 'dark.html'),
        light: resolve(__dirname, 'light.html'),
      },
    },
  },
});
