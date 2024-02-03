import { resolve } from 'path';
import { defineConfig } from 'vite';
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
    coverage: { reporter: ['text', 'json', 'html'] },
  },
});
