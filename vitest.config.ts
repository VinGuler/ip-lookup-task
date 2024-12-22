/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // Only a type error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [vue() as any],
  test: {
    environment: 'jsdom',
    exclude: ['node_modules'],
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
});
