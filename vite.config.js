import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy-policy.html'),
        terms: resolve(import.meta.dirname, 'terms-and-conditions.html')
      }
    }
  }
});
