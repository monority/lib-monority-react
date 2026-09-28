import { readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Frontière inter-packages de `apps/web`.
 *
 * `apps/web` est une application : elle consomme `@monority/ui` par son API
 * publique. Atteindre les sources d'un autre paquet
 * (`../../packages/ui/src/internal/…`) fonctionne — le typecheck ne le voit
 * pas, car un chemin relatif contourne la map `exports` — mais casse en
 * silence dès qu'un fichier bouge, et contourne les exports publics.
 *
 * Exception unique et assumée : `vite.config.mjs`, évalué par Node avant tout
 * build alors que `packages/ui/dist` n'existe pas sur un clone frais. Elle est
 * listée ci-dessous, donc visible, et son retrait fait échouer le test.
 */

// vitest s'exécute avec cwd = racine du package (apps/web), convention déjà
// utilisée par les autres tests contractuels du dépôt.
const WEB_ROOT = process.cwd()

const SCAN_EXTENSIONS = ['.ts', '.tsx', '.mjs', '.js', '.jsx']

/** Exceptions justifiées : fichier -> raison. À relire à chaque ajout. */
const ALLOWED: Record<string, string> = {
    'vite.config.mjs':
        "config de build évaluée par Node avant le build ; packages/ui/dist est ignoré par git et turbo dev n'a pas de dependsOn",
}

function collectFiles(dir: string, acc: string[] = []): string[] {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (
            ['node_modules', 'dist', '.git', 'test-results', 'playwright-report'].includes(
                entry.name
            )
        ) {
            continue
        }
        const full = join(dir, entry.name)
        if (entry.isDirectory()) collectFiles(full, acc)
        else if (SCAN_EXTENSIONS.includes(entry.name.slice(entry.name.lastIndexOf('.'))))
            acc.push(full)
    }
    return acc
}

/** Specifiers qui atteignent les sources d'un autre paquet. */
const DEEP_RELATIVE = /from\s+['"][^'"]*(\.\.[/\\])+packages[/\\](ui|styles|tokens)[/\\]src[/\\]/
const DEEP_PACKAGE = /from\s+['"]@monority\/(ui|styles|tokens)\/(src|internal)[/\\]/

const SELF = relative(WEB_ROOT, __filename).split(sep).join('/')

function findViolations(): string[] {
    const violations: string[] = []
    for (const file of collectFiles(WEB_ROOT)) {
        const rel = relative(WEB_ROOT, file).split(sep).join('/')
        if (rel === SELF) continue
        if (ALLOWED[rel]) continue
        readFileSync(file, 'utf8')
            .split('\n')
            .forEach((line, i) => {
                if (!DEEP_RELATIVE.test(line) && !DEEP_PACKAGE.test(line)) return
                violations.push(`${rel}:${i + 1} ${line.trim()}`)
            })
    }
    return violations
}

describe('frontière inter-packages', () => {
    it("apps/web n'atteint aucune source d'un autre paquet", () => {
        const violations = findViolations()
        expect(
            violations,
            `imports profonds interdits (passer par l'API publique) :\n${violations.join('\n')}`
        ).toEqual([])
    })

    it('chaque exception est documentée avec une raison', () => {
        for (const [file, reason] of Object.entries(ALLOWED)) {
            expect(reason.length, `raison manquante pour ${file}`).toBeGreaterThan(20)
        }
    })

    it("l'exception reste nécessaire : le fichier Allowlist existe toujours", () => {
        const present = Object.keys(ALLOWED).filter((f) =>
            collectFiles(WEB_ROOT).includes(join(WEB_ROOT, f))
        )
        expect(present).toEqual(Object.keys(ALLOWED))
    })
})
