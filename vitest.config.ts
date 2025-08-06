import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html']
    },
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
