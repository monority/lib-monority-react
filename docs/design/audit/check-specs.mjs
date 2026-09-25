#!/usr/bin/env node
/**
 * Grille phase 1a — S2, S5, S6.
 *
 *   node docs/design/audit/check-specs.mjs
 *
 * S2 : 45 fichiers attendus, chacun avec les 10 titres exacts dans l'ordre.
 * S5 : section « Écarts avec l'existant » renseignée (au moins une ligne de tableau).
 * S6 : au moins 8 critères de vérification pour un composant interactif, 4 sinon.
 *
 * Code 1 si une vérification échoue.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const dir = path.join(repoRoot, 'docs/design/components')

const expected = [
    'button',
    'icon-button',
    'copy-button',
    'button-link',
    'toggle',
    'toggle-group',
    'badge',
    'field',
    'form-section',
    'input',
    'textarea',
    'number-input',
    'password-input',
    'select',
    'combobox',
    'checkbox',
    'radio-group',
    'switch',
    'slider',
    'tabs',
    'popover',
    'dropdown-menu',
    'context-menu',
    'menubar',
    'hover-card',
    'tooltip',
    'modal',
    'alert-dialog',
    'drawer',
    'command-palette',
    'card',
    'stat-card',
    'metric-grid',
    'table',
    'data-table',
    'data-list',
    'topbar',
    'sidebar-layout',
    'navigation-menu',
    'breadcrumb',
    'pagination',
    'spinner',
    'skeleton',
    'divider',
    'progress',
    'accordion',
    'collapsible',
    'avatar',
    'carousel',
    'banner',
    'callout',
    'empty-state',
    'toast',
    'calendar',
    'date-picker',
    'date-range-picker',
    'file-upload',
    'aspect-ratio',
    'container',
    'grid',
    'stack',
    'section',
    'page-header',
    'toolbar',
    'scroll-area',
    'resizable',
    'filter-bar',
    'text',
    'title',
    'kbd',
    'pre-code',
    'infinite-scroll',
]

const headings = [
    '## Rôle',
    '## Anatomie',
    '## Dimensions',
    '## États',
    '## Comportement et clavier',
    '## Accessibilité',
    '## API cible',
    "## Écarts avec l'existant",
    '## Critères de vérification',
    '## Interdits',
]

// Composants non interactifs : minimum 4 critères.
const nonInteractive = new Set([
    'badge',
    'form-section',
    'data-list',
    'metric-grid',
    'divider',
    'skeleton',
    'spinner',
    'stat-card',
])

const present = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort()

const failures = []
for (const name of expected) if (!present.includes(name)) failures.push(`S2 manquant : ${name}.md`)
for (const name of present) if (!expected.includes(name)) failures.push(`S2 en trop : ${name}.md`)

let minCriteria = Infinity
const counts = []
for (const name of expected) {
    const file = path.join(dir, `${name}.md`)
    if (!fs.existsSync(file)) continue
    const src = fs.readFileSync(file, 'utf8')

    // S2 — titres exacts, dans l'ordre.
    const found = src.split('\n').filter((l) => l.startsWith('## '))
    if (found.length !== headings.length || found.some((l, i) => l.trim() !== headings[i])) {
        failures.push(
            `S2 titres non conformes : ${name}.md → ${found.map((l) => l.trim()).join(' | ')}`,
        )
    }

    // S5 — écarts renseignés.
    const ecartsIdx = src.indexOf("## Écarts avec l'existant")
    const ecartsBody = src.slice(ecartsIdx, src.indexOf('## Critères de vérification', ecartsIdx))
    const ecartRows = ecartsBody.split('\n').filter((l) => l.trim().startsWith('|')).length - 2
    if (ecartRows < 1) failures.push(`S5 écarts vides : ${name}.md`)

    // S6 — nombre de critères.
    const critIdx = src.indexOf('## Critères de vérification')
    const critBody = src.slice(critIdx, src.indexOf('## Interdits', critIdx))
    const criteria = critBody.split('\n').filter((l) => /^\d+\.\s/.test(l.trim())).length
    counts.push({ name, criteria, ecartRows })
    if (criteria < 4) failures.push(`S6 critères insuffisants (<4) : ${name}.md (${criteria})`)
    if (!nonInteractive.has(name) && criteria < 8) {
        failures.push(`S6 critères insuffisants (<8, interactif) : ${name}.md (${criteria})`)
    }
    if (nonInteractive.has(name)) minCriteria = Math.min(minCriteria, criteria)
}

if (failures.length) {
    console.error(`phase 1a FAIL — ${failures.length} point(s) :`)
    for (const f of failures) console.error('  ' + f)
    process.exit(1)
}

counts.sort((a, b) => a.criteria - b.criteria)
const totalCriteria = counts.reduce((s, c) => s + c.criteria, 0)
const totalEcarts = counts.reduce((s, c) => s + c.ecartRows, 0)
console.log(
    `S2 PASS — ${present.length} specs, 10 titres exacts chacune\n` +
        `S5 PASS — ${totalEcarts} lignes d'écarts cumulées (min par fichier : ${Math.min(...counts.map((c) => c.ecartRows))})\n` +
        `S6 PASS — ${totalCriteria} critères cumulés (min : ${counts[0].name}=${counts[0].criteria}, non interactif min : ${minCriteria})`,
)
