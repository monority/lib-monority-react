#!/usr/bin/env node
/**
 * `pnpm lint:css` — Stylelint avec mode cliquet (ROADMAP §6).
 *
 * Le dépôt n'est pas conforme : on est en pleine reconstruction du système de
 * tokens, 97 % des références pendent. Interdire le rouge d'un coup rendrait
 * l'outillage inutilisable — personne ne peut plus distinguer une nouvelle
 * faute d'un bruit ambiant.
 *
 * Le cliquet règle le problème par le bas : chaque violation est comptée, le
 * compte est figé dans `audit-baseline.json`, et la commande échoue dès qu'un
 * compteur **augmente**. Corriger du code ne peut donc jamais faire échouer la
 * CI ; en ajouter des fautes, si. À l'étape 14, le compte tombe à 0 et la
 * baseline disparaît.
 *
 *   pnpm lint:css             compare à la baseline, échoue si un compteur monte
 *   pnpm lint:css -- --update  réécrit la baseline (à faire après un nettoyage)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import stylelint from 'stylelint'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const BASELINE = path.join(repoRoot, 'audit-baseline.json')
const TOOL = 'stylelint'

let total = 0
const GLOBS = ['packages/**/*.css', 'apps/**/*.css', 'tooling/**/*.css']

const readBaseline = () => {
    if (!fs.existsSync(BASELINE)) return {}
    try {
        return JSON.parse(fs.readFileSync(BASELINE, 'utf8'))
    } catch {
        return {}
    }
}

/**
 * Écrit la baseline de façon déterministe.
 *
 * Stylelint ne garantit pas l'ordre de `results`, ni celui des avertissements
 * d'un fichier. Sans tri, deux exécutions sur le même dépôt produisent deux
 * fichiers différents et le diff devient illisible : une clé peut « bouger »
 * sans qu'aucune valeur n'ait changé. Le tri rend l'écriture idempotente.
 */
const sortRecord = (record) =>
    Object.fromEntries(Object.entries(record).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))

const writeBaseline = (all) => {
    const sorted = Object.fromEntries(
        Object.entries(all).map(([tool, report]) => [
            tool,
            {
                ...report,
                byRule: sortRecord(report.byRule ?? {}),
                byFileRule: sortRecord(report.byFileRule ?? {}),
            },
        ])
    )
    fs.writeFileSync(BASELINE, JSON.stringify(sorted, null, 4) + '\n')
}

const { results } = await stylelint.lint({ files: GLOBS, cwd: repoRoot })

const byRule = {}
/** Clé `chemin|règle` -> nombre de violations. Granularité par fichier. */
const byFileRule = {}
const invalidOptions = []
for (const result of results) {
    const file = path.relative(repoRoot, result.source).split(path.sep).join('/')
    for (const w of result.invalidOptionWarnings ?? []) invalidOptions.push(w.text)
    for (const w of result.warnings ?? []) {
        byRule[w.rule] = (byRule[w.rule] ?? 0) + 1
        const key = `${file}|${w.rule}`
        byFileRule[key] = (byFileRule[key] ?? 0) + 1
        total++
    }
}

const report = {
    total,
    byRule,
    byFileRule,
    files: results.length,
    invalidOptions,
}
const update = process.argv.includes('--update')
const baseline = readBaseline()
const previous = baseline[TOOL]?.byFileRule ?? {}

if (invalidOptions.length) {
    console.error('lint:css — options de configuration invalides :')
    for (const t of invalidOptions) console.error('  ' + t)
    process.exit(2)
}

console.log(
    `${TOOL} — ${results.length} fichiers, ${total} violation(s) ` +
        `sur ${Object.keys(byRule).length} règle(s) actives`
)

if (update) {
    baseline[TOOL] = report
    writeBaseline(baseline)
    console.log(`Baseline ${TOOL} réécrite : ${total} violation(s).`)
    process.exit(0)
}

if (baseline[TOOL] === undefined) {
    console.error(`lint:css — pas de baseline pour ${TOOL}. Lance : pnpm lint:css -- --update`)
    process.exit(2)
}

// Comparaison cliquet, clé `fichier|règle`.
// Une granularité par règle seule est fausse : un fichier NEUF et propre ferait
// monter un compteur global. Ici, ajouter un fichier conforme n'ajoute aucune
// clé, donc aucune régression.
const regressions = []
for (const [key, count] of Object.entries(byFileRule)) {
    const before = previous[key] ?? 0
    if (count > before) {
        const [file, rule] = key.split('|')
        regressions.push(`${file} [${rule}] : ${before} → ${count}`)
    }
}
const dropped = Object.keys(previous)
    .filter((key) => (byFileRule[key] ?? 0) < previous[key])
    .map((key) => `${key} : ${previous[key]} → ${byFileRule[key] ?? 0}`)

console.log(`  ${dropped.length} amélioration(s) depuis la baseline`)
for (const line of dropped.slice(0, 10)) console.log(`    ${line}`)
if (dropped.length > 10) console.log(`    … et ${dropped.length - 10} autre(s)`)

if (regressions.length) {
    console.error(`\n${TOOL} RÉGRESSION — ${regressions.length} compteur(s) en hausse :`)
    for (const line of regressions) console.error('  ' + line)
    console.error("Corrige la cause, pas le seuil : la baseline ne se met à jour qu'avec --update.")
    process.exit(1)
}

console.log(
    `Cliquet OK — aucun compteur en hausse (baseline ${baseline[TOOL].total}). ` +
        'Corrections bienvenues : `pnpm lint:css -- --update` fige le nouveau compte.'
)
