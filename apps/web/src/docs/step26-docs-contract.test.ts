import { describe, expect, it } from 'vitest'
// @ts-ignore - node builtins unavailable in the web tsconfig types; vitest runs on node
import { readFileSync, readdirSync, statSync } from 'node:fs'
// @ts-ignore - path builtin
import { join } from 'node:path'

declare const process: { cwd(): string }

// Step 26 - documentation <-> implementation contract.
// Protects the gaps found in the Step 26 audit: exports without docs pages,
// docs pages pointing at dead slugs, and importCode subpaths that do not exist.

const root = join(process.cwd(), '..', '..')
const componentsDir = join(process.cwd(), 'src', 'docs', 'components')

const REDIRECTS: Record<string, string> = {
    'copy-button': 'button',
    'icon-button': 'button',
    'number-input': 'input',
    'password-input': 'input',
}

function readJson(path: string) {
    return JSON.parse(readFileSync(path, 'utf8')) as {
        exports: Record<string, unknown>
    }
}

function registrySlugs(): string[] {
    const text = readFileSync(join(componentsDir, 'registry.ts'), 'utf8')
    return [...text.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]!)
}

describe('Step 26 - every public export has docs or a redirect', () => {
    it('no exported subpath is a dead docs route', () => {
        const pkg = readJson(join(root, 'packages', 'ui', 'package.json'))
        const subpaths = Object.keys(pkg.exports).filter(
            (k) => k !== '.' && !k.endsWith('.css'),
        ).map((k) => k.replace('./', ''))

        const slugs = new Set(registrySlugs())
        const offenders = subpaths.filter((s) => !slugs.has(s) && !REDIRECTS[s])
        expect(offenders, 'exported without docs page or redirect').toEqual([])
    })
})

describe('Step 26 - every registry slug has a docs folder', () => {
    it('registry slugs resolve to a docs directory with the four required files', () => {
        const missing: string[] = []
        for (const slug of registrySlugs()) {
            const dir = join(componentsDir, slug)
            try {
                const files = readdirSync(dir)
                const pascal = slug
                    .split('-')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join('')
                const needs = [
                    `${pascal}.docs.tsx`,
                    `${pascal}.examples.tsx`,
                    `${pascal}.meta.ts`,
                    'index.ts',
                ]
                const absent = needs.filter((f) => !files.includes(f))
                if (absent.length) missing.push(`${slug}: missing ${absent.join(', ')}`)
            } catch {
                missing.push(`${slug}: no docs directory`)
            }
        }
        expect(missing, 'registry slugs without docs').toEqual([])
    })
})

describe('Step 26 - docs importCode subpaths are exported', () => {
    it('every @monority/ui/<subpath> in a docs importCode exists in package exports', () => {
        const pkg = readJson(join(root, 'packages', 'ui', 'package.json'))
        const exported = new Set(Object.keys(pkg.exports).map((k) => k.replace('./', '')))

        const offenders: string[] = []
        for (const entry of readdirSync(componentsDir)) {
            const dir = join(componentsDir, entry)
            if (!statSync(dir).isDirectory()) continue
            const docsFile = readdirSync(dir).find((f: string) => f.endsWith('.docs.tsx'))
            if (!docsFile) continue
            const text = readFileSync(join(dir, docsFile), 'utf8')
            const match = text.match(/importCode:\s*(["'`])([\s\S]*?)\1/)
            if (!match) continue
            for (const sub of match[2]!.matchAll(/@monority\/ui\/([a-z0-9-]+)/g)) {
                if (!exported.has(sub[1]!)) offenders.push(`${entry}: ${sub[1]} not exported`)
            }
        }
        expect(offenders, 'docs importCode with unknown subpaths').toEqual([])
    })
})
