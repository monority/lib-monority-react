import { describe, expect, it } from 'vitest'
// @ts-ignore - node builtins unavailable in the web tsconfig types; vitest runs on node
import { readFileSync, readdirSync, statSync } from 'node:fs'

declare const process: { cwd(): string }

// Step 09 DX guard.
// Locks the documentation ↔ package contract:
//  - every documented `@monority/ui/<subpath>` actually exists in package.json exports
//  - every Playground entry is marked `stable` in the docs registry
//  - each component's `.meta.ts` status matches the registry (source of truth)
//  - the Playground import statement points at a real subpath export
const root = `${process.cwd()}/../..`
const uiPkg = JSON.parse(readFileSync(`${root}/packages/ui/package.json`, 'utf8')) as {
    exports: Record<string, unknown>
}
const exportedSubpaths = new Set(
    Object.keys(uiPkg.exports)
        .filter((key) => key !== '.' && !key.endsWith('.css'))
        .map((key) => key.replace('./', '')),
)

const componentsDir = `${process.cwd()}/src/docs/components`
const adaptersDir = `${process.cwd()}/src/app/pages/playground/adapters`

function subpathsIn(text: string): string[] {
    return [...text.matchAll(/@monority\/ui\/([a-z0-9-]+)/g)].map((match) => match[1]!)
}

function registryStatuses(): Map<string, string> {
    const text = readFileSync(`${componentsDir}/registry.ts`, 'utf8')
    const statuses = new Map<string, string>()
    const slugMatches = [...text.matchAll(/slug:\s*'([^']+)'/g)]
    for (const match of slugMatches) {
        const rest = text.slice(match.index! + match[0].length)
        const status = rest.match(/status:\s*'([^']+)'/)
        if (status) statuses.set(match[1]!, status[1]!)
    }
    return statuses
}

function adapterFiles(): string[] {
    return readdirSync(adaptersDir).filter((file: string) => file.endsWith('.adapter.tsx'))
}

describe('Step 09 · documented import paths are real exports', () => {
    it('every subpath referenced by the Playground adapters is exported', () => {
        const offenders: string[] = []
        for (const file of adapterFiles()) {
            const text = readFileSync(`${adaptersDir}/${file}`, 'utf8')
            for (const subpath of subpathsIn(text)) {
                if (!exportedSubpaths.has(subpath)) offenders.push(`${file} → ${subpath}`)
            }
        }
        expect(offenders).toEqual([])
    })

    it('every subpath referenced by component docs is exported', () => {
        const offenders: string[] = []
        for (const slug of readdirSync(componentsDir)) {
            const dir = `${componentsDir}/${slug}`
            if (!statSync(dir).isDirectory()) continue
            for (const file of readdirSync(dir)) {
                if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue
                const text = readFileSync(`${dir}/${file}`, 'utf8')
                for (const subpath of subpathsIn(text)) {
                    if (!exportedSubpaths.has(subpath)) offenders.push(`${slug}/${file} → ${subpath}`)
                }
            }
        }
        expect(offenders).toEqual([])
    })
})

describe('Step 09 · Playground entries and docs registry agree', () => {
    const statuses = registryStatuses()

    it('marks every Playground component as stable in the registry', () => {
        const offenders: string[] = []
        for (const file of adapterFiles()) {
            const text = readFileSync(`${adaptersDir}/${file}`, 'utf8')
            const slug = text.match(/slug:\s*'([^']+)'/)?.[1]
            if (!slug) continue
            if (statuses.get(slug) !== 'stable') {
                offenders.push(`${slug} (registry: ${statuses.get(slug) ?? 'missing'})`)
            }
        }
        expect(offenders).toEqual([])
    })

    it('keeps each component .meta.ts status in sync with the registry', () => {
        const offenders: string[] = []
        for (const file of adapterFiles()) {
            const text = readFileSync(`${adaptersDir}/${file}`, 'utf8')
            const slug = text.match(/slug:\s*'([^']+)'/)?.[1]
            if (!slug) continue
            const dir = `${componentsDir}/${slug}`
            const metaFile = readdirSync(dir).find((name: string) => name.endsWith('.meta.ts'))
            if (!metaFile) {
                offenders.push(`${slug}: missing meta`)
                continue
            }
            const meta = readFileSync(`${dir}/${metaFile}`, 'utf8')
            const metaStatus = meta.match(/status:\s*'([^']+)'/)?.[1]
            if (metaStatus !== statuses.get(slug)) {
                offenders.push(`${slug}: meta '${metaStatus}' vs registry '${statuses.get(slug)}'`)
            }
        }
        expect(offenders).toEqual([])
    })

    it('keeps the Playground import statement on a real component subpath', () => {
        const offenders: string[] = []
        for (const file of adapterFiles()) {
            const text = readFileSync(`${adaptersDir}/${file}`, 'utf8')
            const statement = text.match(/importStatement:\s*["'`]([^"'`]+)["'`]/)?.[1]
            if (!statement) {
                offenders.push(`${file}: missing importStatement`)
                continue
            }
            for (const subpath of subpathsIn(statement)) {
                if (!exportedSubpaths.has(subpath)) offenders.push(`${file} → ${subpath}`)
            }
        }
        expect(offenders).toEqual([])
    })
})
