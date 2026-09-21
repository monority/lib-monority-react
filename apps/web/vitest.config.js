import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        deps: {
            optimizer: {
                web: {
                    exclude: ['@monority/ui'],
                },
            },
        },
    },
    resolve: {
        // Subpath imports (@monority/ui/button, ...) resolve to the built package
        // entries, mirroring the public import contract. Multi-word entries whose
        // dist filename differs are mapped explicitly.
        alias: [
            {
                find: '@monority/ui/alert-dialog',
                replacement: path.resolve(__dirname, '../../packages/ui/dist/alertDialog.js'),
            },
            {
                find: '@monority/ui/pre-code',
                replacement: path.resolve(__dirname, '../../packages/ui/dist/preCode.js'),
            },
            {
                find: /^@monority\/ui\/([\w-]+)$/,
                replacement: path.resolve(__dirname, '../../packages/ui/dist/$1.js'),
            },
            {
                find: '@monority/ui',
                replacement: path.resolve(__dirname, '../../packages/ui/dist/index.js'),
            },
            { find: '@', replacement: path.resolve(__dirname, './src') },
        ],
    },
})
