import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './apps/web'),
      '@/lib': resolve(__dirname, './apps/web/lib'),
      '@/types': resolve(__dirname, './packages/types'),
    },
  },
})
