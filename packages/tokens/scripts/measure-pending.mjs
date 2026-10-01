#!/usr/bin/env node
/**
 * Mesure de référence du chantier : RÉFÉRENCES PENDANTES.
 *
 * Unité unique et stable, à ne pas confondre avec le nombre de constats de
 * `check-token-refs.mjs`, qui est une autre unité.
 *
 * **Unité** : une occurrence `var(--mr-x)` dans une recette CSS où
 * `--mr-x` n'est définie ni globalement, ni localement dans le même fichier,
 * ni dans le fichier déprécié. Une même occurrence est comptée une fois, même
 * si le token apparaît plusieurs fois sur la même ligne.
 *
 * **Périmètre** : `packages/styles/src/recipes/*.recipe.css` uniquement. Les
 * styles de base, les utilitaires et `apps/web` ne sont pas comptés : ce sont des
 * consommateurs, pas la cible de la reconstruction.
 *
 * Ce chiffre sert de base au cliquet du chantier et au rapport de chaque famille
 * de 11b1. Il doit baisser, jamais monter.
 *
 *   node packages/tokens/scripts/measure-pending.mjs          # rapport
 *   node packages/tokens/scripts/measure-pending.mjs --json   # machine
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const RECIPES = path.join(repoRoot, 'packages/styles/src/recipes')
const GENERATED = path.join(repoRoot, 'packages/styles/src/tokens/generated')

const namesIn = (file) =>
    new Set([...fs.readFileSync(file, 'utf8').matchAll(/(--mr-[\w-]+)\s*:/g)].map((m) => m[1]))

const globals = namesIn(path.join(GENERATED, 'tokens.css'))
const deprecated = namesIn(path.join(GENERATED, 'deprecated.css'))

let occurrences = 0
const distinct = new Set()
const perFile = new Map()

for (const entry of fs.readdirSync(RECIPES).sort()) {
    if (!entry.endsWith('.recipe.css')) continue
    const source = fs.readFileSync(path.join(RECIPES, entry), 'utf8')
    // Un token local déclaré dans la recette est défini, pas pendant.
    const locals = new Set([...source.matchAll(/(--mr-[\w-]+)\s*:/g)].map((m) => m[1]))
    let count = 0
    for (const match of source.matchAll(/var\(\s*(--mr-[\w-]+)/g)) {
        const name = match[1]
        if (globals.has(name) || locals.has(name) || deprecated.has(name)) continue
        count++
        distinct.add(name)
    }
    if (count) perFile.set(entry.replace('.recipe.css', ''), count)
    occurrences += count
}

const result = {
    unit: 'occurrence de var(--mr-x) pendante dans packages/styles/src/recipes/*.recipe.css',
    scope: 'recettes uniquement ; hors base, utilitaires et apps/web',
    occurrences,
    distinctTokens: distinct.size,
    filesWithPending: perFile.size,
    recipesTotal: fs.readdirSync(RECIPES).filter((f) => f.endsWith('.recipe.css')).length,
    perFile: Object.fromEntries([...perFile].sort((a, b) => b[1] - a[1])),
}

console.log(`Références pendantes — ${result.unit}`)
console.log(`  périmètre : ${result.scope}`)
console.log(`  recettes totales        : ${result.recipesTotal}`)
console.log(`  recettes concernées     : ${result.filesWithPending}`)
console.log(`  occurrences pendantes   : ${result.occurrences}`)
console.log(`  tokens pendants distincts: ${result.distinctTokens}`)
console.log('  top 10 des recettes :')
for (const [name, count] of Object.entries(result.perFile).slice(0, 10)) {
    console.log(`    ${String(count).padStart(4)}  ${name}`)
}

if (process.argv.includes('--json')) {
    console.log(JSON.stringify(result, null, 2))
}

const baselinePath = path.join(repoRoot, 'pending-baseline.json')

if (process.argv.includes('--update')) {
    fs.writeFileSync(
        baselinePath,
        JSON.stringify(
            {
                unit: result.unit,
                scope: result.scope,
                occurrences: result.occurrences,
                distinctTokens: result.distinctTokens,
                recipesTotal: result.recipesTotal,
                measuredAtCommit: process.env.PENDING_BASE_COMMIT ?? 'à renseigner',
            },
            null,
            4
        ) + '\n'
    )
    console.log(`\nBaseline écrite : ${result.occurrences} occurrences.`)
    process.exit(0)
}

if (process.argv.includes('--check')) {
    const previous = fs.existsSync(baselinePath)
        ? JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
        : null
    if (!previous) {
        console.error('pending-baseline.json absent : lancez une première mesure avec --update')
        process.exit(2)
    }
    if (result.occurrences > previous.occurrences) {
        console.error(
            `RÉGRESSION — références pendantes : ${previous.occurrences} → ${result.occurrences}.`
        )
        process.exit(1)
    }
    if (result.occurrences < previous.occurrences) {
        console.log(
            `  amélioration : ${previous.occurrences} → ${result.occurrences} ` +
                `(-${previous.occurrences - result.occurrences}).`
        )
    }
}
