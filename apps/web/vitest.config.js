import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    deps: {
      optimizer: {
        web: {
          exclude: ['@monority/ui'],
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: '@/', replacement: path.resolve(__dirname, './src') },
    ],
    conditions: ['development'],
  },
})
