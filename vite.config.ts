import { resolve } from 'path';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    pool: 'forks',
    setupFiles: [resolve(__dirname, 'src/commons/utils/test-setup.ts')],
    exclude: [...configDefaults.exclude, 'e2e/*'],
    coverage: { reporter: ['text', 'json', 'html'] },
  },
});
