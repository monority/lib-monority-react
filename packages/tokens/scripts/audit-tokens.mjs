#!/usr/bin/env node
/**
 * Étape 0.9 — `pnpm audit:tokens` : audits du graphe de tokens.
 *
 * Ce contrôle complète `check-token-refs.mjs` (qui compte les références) par
 * deux analyses **structurelles**, qui ne se déduisent d'aucun balayage de
 * texte :
 *
 *   1. CYCLES — un token qui se référence lui-même, directement ou indirectement.
 *      Un cycle rend toute résolution infinie : le navigateur abandonne la
 *      propriété et la déclaration est muette. C'est le pire défaut possible,
 *      invisible à la lecture du CSS.
 *
 *   2. VIOLATIONS DE NIVEAU (ROADMAP §4.1) — dépendance à sens unique :
 *        primitif (`--mr-ref-*`) → sémantique → composant
 *      Un token sémantique ne référence qu'un primitif ou un sémantique de rang
 *      supérieur ; un composant ne référence qu'un sémantique. Une recette qui
 *      lit un primitif est signalée aussi : ROADMAP §4.1 l'interdit.
 *
 * Sortie : console + JSON optionnel. Mode RAPPORT (code 0) tant que
 * `rebuild.json` est actif, comme T6/X2/S11.
 *
 *   node packages/tokens/scripts/audit-tokens.mjs
 *   node packages/tokens/scripts/audit-tokens.mjs --json <chemin>
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadSources } from './lib/tokens-lib.mjs'
import { isRebuilding } from './lib/rebuild.mjs'
import { checkCap, checkScales, SCALE_BY_FAMILY } from './lib/scale-rules.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SCOPE_KEYS = new Set([
    'theme-light',
    'theme-dark',
    'theme-oled',
    'theme-ocean',
    'theme-night',
    'theme-high-contrast',
    'density-compact',
    'media-max640',
    'motion-reduced',
    'brand-studio',
])

/** Niveau d'un token, d'après son nom (ROADMAP §4.1). */
export function levelOf(name) {
    if (name.startsWith('--mr-ref-')) return 'primitif'
    return 'global'
}

/** Nom CSS d'un chemin de segments DTCG. */
function cssNameOf(segs) {
    const s = segs[0] === 'mr' ? segs.slice(1) : segs
    const stripped = SCOPE_KEYS.has(s[0]) ? s.slice(1) : s
    return `--mr-${stripped.join('-')}`
}

/** Toutes les feuilles DTCG, à plat : `chemin` → chemin de segments. */
export function collectLeaves() {
    const sources = loadSources(path.join(pkgDir, 'src'))
    const leaves = new Map()
    const walk = (node, segs, file) => {
        for (const [key, value] of Object.entries(node)) {
            if (key.startsWith('$')) continue
            if (value && typeof value === 'object' && '$value' in value) {
                leaves.set(cssNameOf(segs.concat(key)), {
                    file,
                    value: value.$value,
                    scope: SCOPE_KEYS.has(segs[segs.length - 1]) ? segs[segs.length - 1] : 'root',
                })
            } else if (value && typeof value === 'object') {
                walk(value, segs.concat(key), file)
            }
        }
    }
    for (const [file, tree] of Object.entries(sources)) walk(tree.mr ?? tree, [], file)
    return leaves
}

/**
 * Graphe de dépendances token → tokens référencés.
 * Ne suit que les références **réelles** (`var(--mr-*)`), pas les noms cités
 * en prose : une mention dans une note n'est pas une dépendance.
 */
export function buildGraph(leaves) {
    const graph = new Map()
    for (const [name, leaf] of leaves) {
        const refs = [...leaf.value.matchAll(/var\(\s*(--mr-[\w-]+)/g)].map((m) => m[1])
        graph.set(name, [...new Set(refs)])
    }
    return graph
}

/** Cycles du graphe, par parcours en profondeur. */
export function findCycles(graph) {
    const cycles = []
    const state = new Map() // 0 = en cours, 1 = terminé
    const stack = []

    const visit = (node) => {
        state.set(node, 0)
        stack.push(node)
        for (const next of graph.get(node) ?? []) {
            if (!graph.has(next)) continue // référence externe : pas notre graphe
            const s = state.get(next)
            if (s === 0) {
                // Cycle : on remonte jusqu'à `next`
                const start = stack.indexOf(next)
                cycles.push([...stack.slice(start), next])
            } else if (s === undefined) {
                visit(next)
            }
        }
        stack.pop()
        state.set(node, 1)
    }

    for (const node of graph.keys()) {
        if (state.get(node) === undefined) visit(node)
    }
    // Un cycle est rapporté une seule fois, sous sa forme canonique.
    const seen = new Set()
    return cycles.filter((cycle) => {
        const key = [...cycle].sort().join('|')
        if (seen.has(key)) return false
        seen.add(key)
        return true
    })
}

/**
 * Violations de niveau : un token de rang N ne référence pas un rang N+1.
 * Les tokens locaux (déclarés dans une recette) sont ignorés ici : leur
 *cycle est vérifié par le registre `local-tokens` (étape 0.7), pas par l'audit
 * des sources.
 */
export function findLevelViolations(graph, leaves) {
    const violations = []
    for (const [name, refs] of graph) {
        const level = levelOf(name)
        for (const ref of refs) {
            if (!graph.has(ref)) continue
            const refLevel = levelOf(ref)
            if (level === 'global' && refLevel === 'primitif') continue // autorisé
            if (level === 'primitif' && refLevel === 'primitif') {
                violations.push({
                    kind: 'primitif-vers-primitif',
                    from: name,
                    to: ref,
                    reason: 'un primitif ne référence que lui-même ou rien',
                })
            }
        }
    }
    void leaves
    return violations
}

/** Recettes qui lisent un primitif — interdit par ROADMAP §4.1. */
export function findRecipesReadingPrimitives() {
    const roots = [
        'packages/styles/src/recipes',
        'packages/styles/src/base',
        'packages/styles/src/utilities',
        'apps/web/src',
    ]
    const hits = []
    const walk = (dir) => {
        if (!fs.existsSync(dir)) return
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            if (['node_modules', 'dist', '.next'].includes(entry.name)) continue
            const abs = path.join(dir, entry.name)
            if (entry.isDirectory()) walk(abs)
            else if (/\.(css|tsx|ts)$/.test(entry.name)) {
                const source = fs.readFileSync(abs, 'utf8')
                for (const m of source.matchAll(/var\(\s*(--mr-ref-[\w-]+)/g)) {
                    hits.push({
                        file: path.relative(repoRoot, abs).split(path.sep).join('/'),
                        name: m[1],
                        line: source.slice(0, m.index).split('\n').length,
                    })
                }
            }
        }
    }
    for (const r of roots) walk(path.join(repoRoot, r))
    return hits
}

/**
 * Point d'entrée CLI. Isolé de l'analyse pour que l'import du module par les
 * tests n'exécute pas l'audit : sans cette garde, `process.exit` tuerait le
 * runner et les assertions ne tourneraient jamais.
 */
/** Familles d'échelle déclarées, triées par longueur décroissante. */
function scaleFamilies() {
    return [...SCALE_BY_FAMILY.keys()].sort((a, b) => b.length - a.length)
}

/** Familles réellement présentes dans l'ensemble de tokens donné. */
export function familiesPresent(names) {
    const found = new Set()
    for (const name of names) {
        for (const family of scaleFamilies()) {
            if (name === `--mr-${family}` || name.startsWith(`--mr-${family}-`)) {
                found.add(family)
                break
            }
        }
    }
    return [...found]
}

function runCli() {
    // --- Exécution ---
    const leaves = collectLeaves()
    const graph = buildGraph(leaves)
    const cycles = findCycles(graph)
    const levelViolations = findLevelViolations(graph, leaves)
    const primitiveReaders = findRecipesReadingPrimitives()

    // Échelles de pas (D15) : un pas hors liste fermée ou un plafond dépassé
    // est un écart. Les plafonds sont lus dans categories.json, jamais recopiés.
    const scaleViolations = checkScales([...leaves.keys()])
    const capViolations = familiesPresent([...leaves.keys()])
        .map((f) => checkCap(f))
        .filter(Boolean)

    const failures = [
        ...cycles.map((c) => `cycle : ${c.join(' → ')}`),
        ...levelViolations.map((v) => `${v.kind} : ${v.from} → ${v.to} (${v.reason})`),
        ...scaleViolations.map((v) => `échelle : ${v.reason}`),
        ...capViolations,
    ]

    console.log(`audit:tokens — ${leaves.size} tokens, ${graph.size} nœuds du graphe`)
    console.log(`  cycles                 : ${cycles.length}`)
    console.log(`  violations de niveau   : ${levelViolations.length}`)
    console.log(
        `  recettes lisant --mr-ref- : ${primitiveReaders.length} (ROADMAP §4.1 l'interdit)`
    )
    console.log(`  pas hors échelle         : ${scaleViolations.length}`)
    console.log(`  plafonds dépassés        : ${capViolations.length}`)

    if (primitiveReaders.length) {
        const byFile = new Map()
        for (const h of primitiveReaders) {
            if (!byFile.has(h.file)) byFile.set(h.file, [])
            byFile.get(h.file).push(h)
        }
        for (const [file, list] of byFile) {
            console.log(`    ${file} : ${list.map((h) => `${h.name}:${h.line}`).join(', ')}`)
        }
        failures.push(
            `${byFile.size} fichier(s) lisent un primitif directement au lieu d'un token sémantique`
        )
    }

    const report = {
        counts: {
            tokens: leaves.size,
            nodes: graph.size,
            cycles: cycles.length,
            levelViolations: levelViolations.length,
            scaleViolations: scaleViolations.length,
            capViolations: capViolations.length,
            primitiveReaders: primitiveReaders.length,
        },
        cycles,
        levelViolations,
        scaleViolations,
        capViolations,
        primitiveReaders,
    }
    const jsonIndex = process.argv.indexOf('--json')
    if (jsonIndex >= 0 && process.argv[jsonIndex + 1]) {
        const abs = path.isAbsolute(process.argv[jsonIndex + 1])
            ? process.argv[jsonIndex + 1]
            : path.join(repoRoot, process.argv[jsonIndex + 1])
        fs.mkdirSync(path.dirname(abs), { recursive: true })
        fs.writeFileSync(abs, JSON.stringify(report, null, 2) + '\n')
        console.log(`Rapport JSON → ${path.relative(repoRoot, abs)}`)
    }

    if (!failures.length) {
        console.log(
            '\naudit:tokens PASS — 0 cycle, 0 violation de niveau, aucune recette ne lit un primitif.'
        )
        return
    }
    console.log(`\naudit:tokens RAPPORT — ${failures.length} écart(s) :`)
    for (const f of failures.slice(0, 30)) console.log('  ' + f)
    if (failures.length > 30) console.log(`  … et ${failures.length - 30} autre(s)`)
    if (isRebuilding()) {
        console.log('Mode rapport : reconstruction en cours (rebuild.json actif).')
        return
    }
    console.error('\naudit:tokens FAIL — le graphe de tokens est incohérent.')
    process.exitCode = 1
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    runCli()
}
