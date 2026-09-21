import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic export contract guard
//
// Authority: packages/ui/package.json `exports` map.
// Any new public export must appear in package.json and resolve at runtime.
// No hardcoded lists — if you add an export to package.json, this test covers it.
// ─────────────────────────────────────────────────────────────────────────────
declare const process: { cwd(): string }
const root = `${process.cwd()}/../..`
const pkg = JSON.parse(
    readFileSync(resolve(root, 'packages/ui/package.json'), 'utf8'),
) as { exports: Record<string, unknown> }

const exportedSubpaths = Object.keys(pkg.exports)
    .filter((key) => key !== '.' && !key.endsWith('.css'))
    .map((key) => key.replace('./', ''))
    .sort()

describe('Export contract · package.json is the single source of truth', () => {
    it('has no duplicate subpaths', () => {
        const uniq = [...new Set(exportedSubpaths)]
        expect(uniq).toEqual(exportedSubpaths)
    })

    it('resolves every declared subpath at runtime', async () => {
        const failures: string[] = []
        for (const subpath of exportedSubpaths) {
            try {
                const mod = await import(`@monority/ui/${subpath}`)
                const keys = Object.keys(mod)
                if (keys.length === 0) {
                    failures.push(`${subpath}: module has no named exports`)
                }
            } catch (err) {
                failures.push(`${subpath}: ${String(err)}`)
            }
        }
        expect(failures, 'subpath resolution failures').toEqual([])
    })
})

describe('Export contract · root barrel', () => {
    it('resolves @monority/ui', async () => {
        const mod = await import('@monority/ui')
        expect(Object.keys(mod).length).toBeGreaterThan(0)
    })
})

describe('Export contract · CSS paths', () => {
    it('resolves @monority/ui/index.css', async () => {
        await expect(import('@monority/ui/index.css')).resolves.toBeDefined()
    })

    it('resolves @monority/ui/styles.css', async () => {
        await expect(import('@monority/ui/styles.css')).resolves.toBeDefined()
    })
})
