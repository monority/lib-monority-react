import { readFileSync, readdirSync } from 'node:fs'
import { dirname, relative, resolve, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Étanchéité du paquet publié.
 *
 * `publicDir: 'src/styles'` copiait `globals.css` — un fichier de 42 octets
 * qui ne fait qu'un `@import '../../../styles/src/index.css'`. Installé depuis
 * npm, ce chemin n'existe pas : le CSS du paquet était cassé.
 *
 * Le CSS utile est produit par tsup dans `dist/index.css` (via l'import CSS de
 * `src/index.ts`), avec les `@layer` et les chemins résolus. Ces tests
 * verrouillent qu'il n'en reste pas de copie "@import vers le dehors".
 */
const pkgDir = process.cwd()
const distDir = resolve(pkgDir, 'dist')
const norm = (p: string) => p.split(sep).join('/')

const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = resolve(dir, e.name)
        return e.isDirectory() ? walk(p) : [p]
    })

const SOURCE = /\.(js|css|d\.ts|json)$/
const SPECIFIER =
    /(?:@import\s+["']|from\s+["']|import\s*\(\s*["']|require\s*\(\s*["'])([^"']+)["']/g
const ALLOWED_BARE = new Set([
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react-dom/client',
    'node:path',
    'node:url',
])

describe('dist — étanchéité du paquet', () => {
    it('ne publie pas globals.css (copie de src/styles)', () => {
        expect(readdirSync(distDir).filter((f) => f === 'globals.css')).toHaveLength(0)
    })

    it('le CSS publié est autoportant (aucun @import résiduel)', () => {
        const css = readFileSync(resolve(distDir, 'index.css'), 'utf8')
        expect(css).not.toMatch(/@import/)
        // Il contient bien le contenu résolu des layers, dans l'ordre de priorité.
        const layerOrder = [
            'monority.reset',
            'monority.tokens',
            'monority.base',
            'monority.recipes',
            'monority.components',
            'monority.utilities',
            'monority.overrides',
        ]
        let previousDeclaration = -1
        for (const layer of layerOrder) {
            const at = css.indexOf(`@layer ${layer};`)
            expect(at, `déclaration @layer ${layer}; absente du dist`).toBeGreaterThan(-1)
            expect(at, `@layer ${layer}; hors ordre de priorité`).toBeGreaterThan(
                previousDeclaration
            )
            previousDeclaration = at
        }
        expect(css.length).toBeGreaterThan(10_000)
    })

    it('le reset est hors du bundle principal et disponible en opt-in', () => {
        const css = readFileSync(resolve(distDir, 'index.css'), 'utf8')
        expect(css).not.toContain('text-rendering')
        expect(css).not.toContain('font-smoothing')

        const reset = readFileSync(resolve(distDir, 'reset.css'), 'utf8')
        expect(reset).toContain('text-rendering')
        expect(reset).toContain('min-height: 100%')
        // Le fichier opt-in ne contient plus de reset global d'éléments :
        // l'autonomie des composants est assurée par la portée `mr-`.
        expect(reset).not.toContain('box-sizing')
        expect(reset).not.toMatch(/button,\s*input,/)
    })

    it('les composants sont autonomes sans reset.css (portée `mr-`)', () => {
        const css = readFileSync(resolve(distDir, 'index.css'), 'utf8')
        expect(css).toMatch(/\[class\^=("|')?mr-/)
        expect(css).toContain('box-sizing: border-box')
        expect(css).toMatch(/font:\s*inherit/)
    })

    it('les utilitaires génériques sont hors du bundle principal', () => {
        const css = readFileSync(resolve(distDir, 'index.css'), 'utf8')
        expect(css).not.toContain('.mr-surface')
        expect(css).not.toContain('.mr-cluster')
        expect(css).not.toContain('.container {')
        expect(css).not.toContain('.stack-m')

        const utilities = readFileSync(resolve(distDir, 'utilities.css'), 'utf8')
        expect(utilities).toContain('.mr-surface')
        expect(utilities).toContain('.mr-cluster')
        expect(utilities).toContain('.mr-stack-m')
    })

    it('aucun fichier du dist ne référence un chemin hors du paquet', () => {
        const escape: string[] = []
        for (const file of walk(distDir)) {
            if (!SOURCE.test(file)) continue
            const content = readFileSync(file, 'utf8')
            const rel = relative(distDir, file).split(sep).join('/')
            for (const m of content.matchAll(SPECIFIER)) {
                const spec = m[1]
                if (spec.startsWith('.')) {
                    const target = norm(resolve(dirname(file), spec))
                    if (!target.startsWith(norm(distDir))) escape.push(`${rel} -> ${spec}`)
                } else if (!spec.startsWith('node:') && !ALLOWED_BARE.has(spec)) {
                    escape.push(`${rel} -> ${spec}`)
                }
            }
        }
        expect(escape, `références sortantes : ${escape.join(', ')}`).toHaveLength(0)
    })
})
