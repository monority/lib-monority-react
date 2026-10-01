#!/usr/bin/env node
/**
 * Étape 11a — audit des références de tokens.
 *
 * Balaye le code source (recettes, base, utilitaires, composants React,
 * application) et confronte chaque `var(--mr-*)` à ce qui existe réellement :
 * tokens globaux (tokens.css), tokens dépréciés (deprecated.css), ou variable
 * déclarée localement dans le balayage.
 *
 * Ce contrôle est en MODE RAPPORT : il sort toujours en 0, y compris quand il
 * trouve des défauts. Il sert d'inventaire, pas de garde-fou. Le passage en
 * bloquant est prévu à l'étape 11z, après la migration.
 *
 *   node packages/tokens/scripts/check-token-refs.mjs
 *   node packages/tokens/scripts/check-token-refs.mjs --json <chemin>
 *   node packages/tokens/scripts/check-token-refs.mjs --strict   (prévu 11z)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

const GENERATED = 'packages/styles/src/tokens/generated'
const SCANNED = [
    'packages/styles/src/recipes',
    'packages/styles/src/base',
    'packages/styles/src/utilities',
    'packages/ui/src',
    'apps/web/src',
]
const EXTENSIONS = /\.(css|tsx|ts)$/
const SKIP_DIRS = new Set(['node_modules', 'dist', '.next', 'coverage'])
const TEST_FILE = /\.(test|spec)\.[cm]?[jt]sx?$/

/**
 * Un fichier de test cite des noms de tokens pour raisonner sur du texte :
 * `expect(css).not.toContain('var(--mr-card-gap')` n'est pas une
 * consommation. On l'exclut. Le prix est un angle mort sur les styles inline
 * des tests, qui n'ont pas de contrat à prouver.
 */
export function isTestFile(file) {
    return TEST_FILE.test(file.split(path.sep).join('/'))
}

const read = (rel) => {
    const abs = path.join(repoRoot, rel)
    return fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : ''
}

/** Noms déclarés dans un CSS généré. */
export function declaredNames(css) {
    return new Set([...css.matchAll(/(--mr-[\w-]+)\s*:/g)].map((m) => m[1]))
}

/** Fichiers à auditer, extension CSS/TS/TSX. */
export function collectFiles(dir, acc = []) {
    const abs = path.join(repoRoot, dir)
    if (!fs.existsSync(abs)) return acc
    for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
        if (SKIP_DIRS.has(entry.name)) continue
        const rel = path.join(dir, entry.name)
        if (entry.isDirectory()) collectFiles(rel, acc)
        else if (EXTENSIONS.test(entry.name)) acc.push(rel)
    }
    return acc
}

/**
 * Références d'un fichier : `var(--mr-badge-height)` avec repli,
 * `var(--mr-card-gap)` sans repli. Le repli est détecté par la virgule qui suit
 * le nom, quel que soit l'imbrication (`var(--mr-card-gap, var(--mr-spacing-2))`).
 */
export function references(source) {
    const out = []
    for (const match of source.matchAll(/var\(\s*(--mr-[\w-]+)(\s*,)?/g)) {
        out.push({
            name: match[1],
            fallback: Boolean(match[2]),
            index: match.index + match[0].indexOf(match[1]),
        })
    }
    return out
}

/** Déclarations locales : `--mr-badge-height: ...` dans le fichier lui-même. */
export function localDeclarations(source) {
    return new Set([...source.matchAll(/(--mr-[\w-]+)\s*:/g)].map((m) => m[1]))
}

/** Ligne du nthième caractère (1-indexée). */
const lineOf = (source, index) => source.slice(0, index).split('\n').length

/**
 * Audit complet. `files` est injectable pour les tests.
 * Retourne `{ intrusions, overrides, deprecated, orphans, counts }`.
 */
export function audit(options = {}) {
    const allFiles = options.files ?? SCANNED.flatMap((dir) => collectFiles(dir))
    const files = allFiles.filter((file) => !isTestFile(file))
    const readFile = options.readFile ?? read
    const globals = declaredNames(readFile(`${GENERATED}/tokens.css`))
    const deprecated = declaredNames(readFile(`${GENERATED}/deprecated.css`))

    const intrusions = []
    const overrides = []
    const deprecatedUses = []
    const localNames = new Set()
    const referenced = new Set()

    // Passe 1 : ce que chaque fichier déclare localement.
    const parsed = files.map((file) => {
        const source = readFile(file)
        const locals = localDeclarations(source)
        for (const name of locals) localNames.add(name)
        return { file, source, locals }
    })

    // Passe 2 : chaque référence, confrontée aux trois sources de vérité.
    for (const { file, source, locals } of parsed) {
        for (const ref of references(source)) {
            referenced.add(ref.name)
            const known = globals.has(ref.name) || deprecated.has(ref.name) || locals.has(ref.name)
            const entry = { file, line: lineOf(source, ref.index), name: ref.name }
            if (!known) {
                ;(ref.fallback ? overrides : intrusions).push(entry)
            } else if (deprecated.has(ref.name) && !locals.has(ref.name)) {
                deprecatedUses.push(entry)
            }
        }
    }

    const orphans = [...globals].filter((name) => !referenced.has(name)).sort()
    const counts = {
        files: files.length,
        skippedTests: allFiles.length - files.length,
        globals: globals.size,
        deprecated: deprecated.size,
        referenced: referenced.size,
    }
    return { intrusions, overrides, deprecatedUses, orphans, counts }
}

const rel = (file) => file.split(path.sep).join('/')

function report(result, jsonPath) {
    const { intrusions, overrides, deprecatedUses, orphans, counts } = result
    const total = intrusions.length + overrides.length + deprecatedUses.length + orphans.length

    if (intrusions.length) {
        console.log(
            `INTRUSIONS — var(--mr-*) sans repli vers un token inexistant : ${intrusions.length}`
        )
        for (const i of intrusions) console.log(`  ${rel(i.file)}:${i.line}  ${i.name}`)
    }
    if (overrides.length) {
        console.log(`REPLIS — var(--mr-*) sur un nom non déclaré, avec repli : ${overrides.length}`)
        for (const o of overrides) console.log(`  ${rel(o.file)}:${o.line}  ${o.name}`)
    }
    if (deprecatedUses.length) {
        console.log(`DEPRECIES — références à un token déprécié : ${deprecatedUses.length}`)
        for (const d of deprecatedUses) console.log(`  ${rel(d.file)}:${d.line}  ${d.name}`)
    }
    if (orphans.length) {
        console.log(`ORPHELINS — tokens globaux jamais référencés : ${orphans.length}`)
        for (const name of orphans) console.log(`  ${name}`)
    }

    console.log(
        `AUDIT TOKENS — ${counts.files} fichiers audités (${counts.skippedTests} tests exclus), ` +
            `${counts.globals} tokens globaux ` +
            `(${counts.deprecated} dépréciés), ${counts.referenced} référencés, ` +
            `${total} constat(s)`
    )

    if (jsonPath) {
        const abs = path.isAbsolute(jsonPath) ? jsonPath : path.join(repoRoot, jsonPath)
        fs.mkdirSync(path.dirname(abs), { recursive: true })
        fs.writeFileSync(abs, JSON.stringify(result, null, 2) + '\n')
        console.log(`Rapport JSON → ${rel(abs)}`)
    }
    return total
}

function runCli() {
    const argv = process.argv.slice(2)
    const strict = argv.includes('--strict')
    const jsonIndex = argv.indexOf('--json')
    const jsonPath = jsonIndex >= 0 ? argv[jsonIndex + 1] : null

    const result = audit()
    const total = report(result, jsonPath)

    if (strict && total > 0) {
        console.error("check-token-refs FAIL — --strict est prévu pour l'étape 11z.")
        process.exit(1)
    }
    // MODE RAPPORT : toujours 0, même avec des défauts.
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) runCli()
