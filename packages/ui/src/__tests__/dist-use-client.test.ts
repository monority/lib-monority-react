import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Graphe « use client » du paquet publié.
 *
 * La directive `"use client"` doit être posée exactement sur les fichiers qui
 * utilisent React (hooks, contexte, état). Les barrels et les modules purs
 * (`getThemeScript`, `cn`, `cva`, constantes) doivent rester hors bannière et
 * n'atteindre aucun chunk banni — sinon un Server Component ne peut plus les
 * appeler.
 */
const distDir = resolve(process.cwd(), 'dist')
const jsFiles = readdirSync(distDir).filter((name) => name.endsWith('.js'))

const REACT =
    /(?:^|\n)\s*(?:import|export)[^;\n]*from\s*["']react(?:-dom)?(?:\/[^"']*)?["']|require\(\s*["']react(?:-dom)?(?:\/[^"']*)?["']\s*\)/
const IMPORT = /(?:from|import)\s*["'](\.\/[^"']+)["']/g
const BANNER = '"use client";'

const sourceOf = (file: string) => readFileSync(join(distDir, file), 'utf8')
const hasBanner = (file: string) => sourceOf(file).startsWith(BANNER)
const bodyOf = (file: string) => {
    const source = sourceOf(file)
    return source.startsWith(BANNER) ? source.slice(BANNER.length) : source
}
const isClient = (file: string) => REACT.test(bodyOf(file))
const importsOf = (file: string) =>
    [...bodyOf(file).matchAll(IMPORT)].map((match) => match[1]!.replace('./', ''))

function closure(files: string[]): string[] {
    const seen = new Set<string>()
    const queue = [...files]
    while (queue.length) {
        const file = queue.pop()!
        if (seen.has(file)) continue
        seen.add(file)
        for (const next of importsOf(file)) if (jsFiles.includes(next)) queue.push(next)
    }
    return [...seen]
}

const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')) as {
    exports: Record<string, { import?: string }>
}
const distFileOf = (subpath: string) => pkg.exports[subpath]!.import!.replace('./dist/', '')

const entryFiles = Object.values(pkg.exports)
    .map((value) => (typeof value === 'object' ? value.import : undefined))
    .filter((target): target is string => typeof target === 'string' && target.endsWith('.js'))
    .map((target) => target.replace('./dist/', ''))

describe('dist — graphe « use client »', () => {
    it('la bannière est posée exactement sur les fichiers qui utilisent React', () => {
        const missIngBanner = jsFiles.filter((f) => isClient(f) && !hasBanner(f))
        const uselessBanner = jsFiles.filter((f) => !isClient(f) && hasBanner(f))

        expect(
            missIngBanner,
            `fichiers clients sans bannière : ${missIngBanner.join(', ')}`
        ).toEqual([])
        expect(
            uselessBanner,
            `bannière inutile (aucun usage React) : ${uselessBanner.join(', ')}`
        ).toEqual([])
        expect(jsFiles.filter(isClient).length).toBeGreaterThan(0)
    })

    it('les entrées serveur n’atteignent aucun fichier banni', () => {
        for (const subpath of ['./get-theme-script', './lib']) {
            const entry = distFileOf(subpath)
            expect(hasBanner(entry), `${entry} ne doit pas porter la bannière`).toBe(false)
            const bannered = closure([entry]).filter((file) => hasBanner(file))
            expect(
                bannered,
                `${entry} atteint des fichiers bannis : ${bannered.join(', ')}`
            ).toEqual([])
        }
    })

    it('aucune entrée publique ne porte la bannière (le code client vit dans les chunks)', () => {
        const bannered = entryFiles.filter(hasBanner)

        expect(bannered, `entrées publiques bannies : ${bannered.join(', ')}`).toEqual([])
        expect(entryFiles.length).toBeGreaterThan(50)
    })

    it('react-dom (createPortal) entraîne la bannière', () => {
        const reactDomFiles = jsFiles.filter((file) => {
            const body = bodyOf(file)
            return (
                /from\s*["']react-dom/.test(body) ||
                /require\(\s*["']react-dom/.test(body) ||
                body.includes('createPortal')
            )
        })

        expect(reactDomFiles.length, 'aucun fichier react-dom dans le dist').toBeGreaterThan(0)
        const missing = reactDomFiles.filter((file) => !hasBanner(file))
        expect(missing, `react-dom/createPortal sans bannière : ${missing.join(', ')}`).toEqual([])
    })

    it('les entrées internes sont des barrels sans bannière, leurs chunks sont clients', () => {
        for (const entry of ['components.js', 'hooks.js', 'providers.js', 'primitives.js']) {
            expect(hasBanner(entry), `${entry} ne doit pas porter la bannière`).toBe(false)
            const clientChunks = closure([entry]).filter(isClient)
            expect(clientChunks.length, `${entry} sans chunk client`).toBeGreaterThan(0)
        }
    })
})
