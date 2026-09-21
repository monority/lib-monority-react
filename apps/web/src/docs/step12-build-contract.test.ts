import { describe, expect, it } from 'vitest'
// @ts-ignore - node builtins unavailable in the web tsconfig types; vitest runs on node
import { readFileSync, readdirSync } from 'node:fs'

declare const process: { cwd(): string }

const root = `${process.cwd()}/../..`

const pkg = JSON.parse(
    readFileSync(`${root}/packages/ui/package.json`, 'utf8'),
) as { exports: Record<string, { import?: string; types?: string } | string> }

// Build a map: subpath -> expected dist JS filename (from package.json exports)
const exportDistPaths: Map<string, string> = new Map()
for (const [key, value] of Object.entries(pkg.exports)) {
    if (key === '.' || key.endsWith('.css')) continue
    const subpath = key.replace('./', '')
    if (typeof value === 'object' && value.import) {
        const distFile = value.import.replace('./dist/', '')
        exportDistPaths.set(subpath, distFile)
    }
}

// Convert kebab-case to camelCase (tsup convention for most entries)
function toCamel(str: string): string {
    return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

const distDir = `${root}/packages/ui/dist`
const distFiles = new Set(readdirSync(distDir))

describe('Step 12 · Dist health — every export produces dist files', () => {
    it('every export subpath has a .js file in dist', () => {
        const missing: string[] = []
        for (const [, jsFile] of exportDistPaths) {
            if (!distFiles.has(jsFile)) missing.push(jsFile)
        }
        expect(missing, 'missing dist JS files').toEqual([])
    })

    it('every export subpath has a .d.ts file in dist', () => {
        const missing: string[] = []
        for (const [, jsFile] of exportDistPaths) {
            const dtsFile = jsFile.replace(/\.js$/, '.d.ts')
            if (!distFiles.has(dtsFile)) missing.push(dtsFile)
        }
        expect(missing, 'missing dist .d.ts files').toEqual([])
    })

    it('has index.js and index.d.ts for root barrel', () => {
        expect(distFiles.has('index.js')).toBe(true)
        expect(distFiles.has('index.d.ts')).toBe(true)
    })

    it('has index.css for style exports', () => {
        expect(distFiles.has('index.css')).toBe(true)
    })
})

describe('Step 12 · tsup ↔ package.json alignment', () => {
    const tsupSrc = readFileSync(`${root}/packages/ui/tsup.config.ts`, 'utf8')

    it('every package.json subpath has a tsup entry', () => {
        const missing: string[] = []
        for (const subpath of exportDistPaths.keys()) {
            // tsup may use kebab-case ('radio-group') or camelCase (commandPalette)
            const hasEntry =
                tsupSrc.includes(`'${subpath}':`) ||
                tsupSrc.includes(`${subpath}:`) ||
                tsupSrc.includes(`'${toCamel(subpath)}':`) ||
                tsupSrc.includes(`${toCamel(subpath)}:`)
            if (!hasEntry) missing.push(subpath)
        }
        expect(missing, 'tsup entries missing').toEqual([])
    })

    it('every tsup entry has a package.json export', () => {
        // Match keys like: button:, 'radio-group':, commandPalette:, etc.
        const tsupKeys = [...tsupSrc.matchAll(/^\s+['"]?([a-zA-Z][\w-]*)['"]?\s*:/gm)].map((m) => m[1]!)
        const skipKeys = new Set(['entry', 'publicDir', 'format', 'dts', 'sourcemap', 'clean', 'splitting', 'treeshake', 'minify', 'external', 'tsconfig'])
        const missing: string[] = []
        for (const key of tsupKeys) {
            if (skipKeys.has(key) || key === 'index') continue
            // Check if this key corresponds to any export's dist file
            const distFileFromKey = `${key}.js`
            let found = false
            for (const [, jsFile] of exportDistPaths) {
                if (jsFile === distFileFromKey) { found = true; break }
                // Also check camelCase mapping
                if (jsFile === `${toCamel(key)}.js`) { found = true; break }
            }
            if (!found) missing.push(key)
        }
        expect(missing, 'tsup entries without package.json exports').toEqual([])
    })
})
