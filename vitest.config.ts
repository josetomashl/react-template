import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html']
    }
  }
});
