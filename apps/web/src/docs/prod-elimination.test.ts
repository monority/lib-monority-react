import { describe, expect, it } from 'vitest'
// @ts-ignore - node builtins unavailable in the web tsconfig types; vitest runs on node
import { execFileSync } from 'node:child_process'

declare const process: { cwd(): string; execPath: string }

interface ProbeResult {
    mode: string
    bytes: number
    deprecated: number
    template: number
    nodeEnv: number
}

/**
 * Le code de développement (avertissements de dépréciation) doit disparaître du
 * bundle d'une application consommatrice en production.
 *
 * Le bundle est produit par `scripts/bundle-dce-probe.mjs` dans un process Node
 * séparé (vite + rollup éliminent les branches mortes après remplacement de
 * `process.env.NODE_ENV`). Le cas `development` sert de contrôle : il prouve que
 * le test détecte bien les avertissements quand ils doivent être présents.
 */
function bundleDist(mode: 'production' | 'development'): ProbeResult {
    const output = execFileSync(process.execPath, ['scripts/bundle-dce-probe.mjs', mode], {
        cwd: process.cwd(),
        encoding: 'utf8',
    })
    return JSON.parse(output.trim()) as ProbeResult
}

describe('élimination du code de développement en production', () => {
    it('retire les avertissements de dépréciation du bundle de production', () => {
        const result = bundleDist('production')

        expect(result.deprecated).toBe(0)
        expect(result.template).toBe(0)
        expect(result.nodeEnv).toBe(0)
    })

    it('conserve les avertissements en développement (contrôle)', () => {
        const result = bundleDist('development')

        expect(result.deprecated).toBeGreaterThan(0)
        expect(result.template).toBeGreaterThan(0)
        expect(result.nodeEnv).toBe(0)
    })
})
