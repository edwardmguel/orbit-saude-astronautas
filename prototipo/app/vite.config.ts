import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// `@config` aponta para prototipo/config, a fonte única dos JSON (nunca copiar).
const aliases = {
  '@config': fileURLToPath(new URL('../config', import.meta.url)),
  '@': fileURLToPath(new URL('./src', import.meta.url)),
}

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { alias: aliases },
  server: { fs: { allow: ['..'] } },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
