import { defineConfig } from 'tsup'

export default defineConfig({
    entry: { index: 'src/index.ts', react: 'src/react/index.tsx', data: 'src/data/logo.ts' },
    format: ['esm'],
    dts: true,
    clean: true,
    treeshake: true,
    external: ['three', 'react'],
    target: 'es2022',
})
