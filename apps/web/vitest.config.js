import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { readFileSync } from 'node:fs'

const uiPkg = JSON.parse(
    readFileSync(path.resolve(__dirname, '../../packages/ui/package.json'), 'utf8')
)

const subpathAliases = Object.entries(uiPkg.exports || {})
    .filter(([key]) => key.startsWith('./') && key !== '.' && !key.endsWith('.css'))
    .map(([key, val]) => {
        const subpath = key.replace('./', '')
        const distFile =
            typeof val === 'object' && val !== null && 'import' in val
                ? val.import
                : `./dist/${subpath}.js`
        return {
            find: `@monority/ui/${subpath}`,
            replacement: path.resolve(__dirname, '../../packages/ui', distFile),
        }
    })

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/shared/test/setup.ts'],
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
        // entries, mirroring the public import contract. Aliases are derived directly
        // from package.json exports so all multi-word and camelCase dist targets match.
        alias: [
            ...subpathAliases,
            {
                find: '@monority/ui',
                replacement: path.resolve(__dirname, '../../packages/ui/dist/index.js'),
            },
            { find: '@', replacement: path.resolve(__dirname, './src') },
        ],
    },
})
