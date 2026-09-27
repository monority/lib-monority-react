#!/usr/bin/env node
/**
 * Phase 2a — extraction one-shot des valeurs actuelles vers DTCG déprécié.
 *
 * Lit la référence dépréciée (71 alias, repris verbatim) + tous les fichiers
 * CSS sources (tokens/, themes/, recipes/, base/, apps/web) et émet
 * `packages/tokens/src/deprecated.json` : chaque token `--mr-*` ABSENT du
 * nouveau système, avec sa valeur actuelle exacte et son sélecteur.
 *
 * Règles :
 * - noms présents dans tokens.css (référence v4) → exclus (le nouveau gagne) ;
 * - sélecteurs hérités `:root[data-theme='X'],.monority-theme-root[...]`
 *   → normalisés en `[data-theme="X"]` (la classe legacy reste sans effet) ;
 * - autres sélecteurs (portées recettes) → repris verbatim ;
 * - `@import` ignorés ; `@layer` traversés ; `@media` signalés.
 *
 *   node packages/tokens/scripts/extract-deprecated.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const read = (p) => fs.readFileSync(path.join(repoRoot, p), 'utf8')

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '')

// --- noms du nouveau système (référence v4) ---
const refCss = read('docs/design/reference/monority-ui-tokens.reference.css')
const newNames = new Set(
    [...refCss.matchAll(/(--mr-[\w-]+)\s*:/g)].map((m) => m[1]).filter((t) => t !== '--mr-')
)

// --- mini-parseur CSS (corpus contraint : règles, @layer, @media 1 niveau) ---
function parseRules(css, media = null, out = []) {
    let i = 0
    const n = css.length
    const skipWs = () => {
        while (i < n && /\s/.test(css[i])) i++
    }
    while (i < n) {
        skipWs()
        if (i >= n) break
        if (css.startsWith('@import', i)) {
            const end = css.indexOf(';', i)
            i = end < 0 ? n : end + 1
            continue
        }
        if (css.startsWith('@media', i)) {
            const open = css.indexOf('{', i)
            const query = css.slice(i + 6, open).trim()
            let depth = 1
            let j = open + 1
            while (j < n && depth > 0) {
                if (css[j] === '{') depth++
                else if (css[j] === '}') depth--
                j++
            }
            parseRules(css.slice(open + 1, j - 1), query, out)
            i = j
            continue
        }
        if (css.startsWith('@layer', i)) {
            const open = css.indexOf('{', i)
            if (open < 0) break
            // @layer nom; (sans bloc) ou @layer [nom] { ... }
            const semi = css.indexOf(';', i)
            if (semi >= 0 && semi < open) {
                i = semi + 1
                continue
            }
            let depth = 1
            let j = open + 1
            while (j < n && depth > 0) {
                if (css[j] === '{') depth++
                else if (css[j] === '}') depth--
                j++
            }
            parseRules(css.slice(open + 1, j - 1), media, out)
            i = j
            continue
        }
        const open = css.indexOf('{', i)
        if (open < 0) break
        const selector = css.slice(i, open).trim().replace(/\s+/g, ' ')
        let depth = 1
        let j = open + 1
        while (j < n && depth > 0) {
            if (css[j] === '{') depth++
            else if (css[j] === '}') depth--
            j++
        }
        const body = css.slice(open + 1, j - 1)
        if (selector && !selector.startsWith('@')) out.push({ selector, body, media })
        i = j
    }
    return out
}

const normalizeSelector = (sel) => {
    const m = sel.match(/\[data-theme=['"]?([\w-]+)['"]?\]/)
    if (m) return `[data-theme="${m[1]}"]`
    return sel
}

const entries = [] // { name, value, selector, origin }
const warnings = []

// 1. alias de la référence (verbatim, ordre conservé)
const depRef = read('docs/design/reference/monority-ui-tokens.deprecated.reference.css')
for (const { selector, body, media } of parseRules(stripComments(depRef))) {
    if (media) warnings.push(`media in depref: ${media}`)
    for (const dm of body.matchAll(/(--mr-[\w-]+)\s*:\s*([^;]+);/g)) {
        entries.push({ name: dm[1], value: dm[2].trim(), selector, origin: 'reference-alias' })
    }
}

// 2. fichiers actuels SUPPRIMÉS en 2a (tokens/, themes/) : toute définition
// d'un nom absent du nouveau système est reportée avec sa valeur exacte.
// Les définitions locales des recettes, de base/ et de apps/ restent en place
// (fichiers non touchés en 2a) et ne sont pas copiées.
const roots = ['packages/styles/src/tokens', 'packages/styles/src/themes']
const cssFiles = []
for (const r of roots) {
    const abs = path.join(repoRoot, r)
    const walk = (d) => {
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
            const f = path.join(d, e.name)
            if (e.isDirectory()) walk(f)
            else if (e.name.endsWith('.css')) cssFiles.push(f)
        }
    }
    walk(abs)
}
// + CSS applicatif (docs) : exclu — définitions locales conservées en place.
// (audit-8 : --mr-code-bg/fg/scrollbar/shadow définis dans apps/web, listés à part en T6.)

const auditOnly = new Set([
    '--mr-combobox-list-min-width',
    '--mr-hovercard-arrow-left',
    '--mr-hovercard-arrow-top',
    '--mr-code-bg',
    '--mr-code-fg',
    '--mr-code-scrollbar',
    '--mr-code-shadow',
    '--mr-code-padding',
])

let skippedNew = 0
let skippedAudit = 0
for (const f of cssFiles) {
    const rel = path.relative(repoRoot, f)
    if (rel.includes('generated')) continue
    const rules = parseRules(stripComments(fs.readFileSync(f, 'utf8')))
    for (const { selector, body, media } of rules) {
        if (media) warnings.push(`media: ${rel} :: ${media} :: ${selector}`)
        for (const dm of body.matchAll(/(--mr-[\w-]+)\s*:\s*([^;]+);/g)) {
            const name = dm[1]
            const value = dm[2].trim()
            if (newNames.has(name)) {
                skippedNew++
                continue
            }
            if (auditOnly.has(name)) {
                skippedAudit++
                continue
            }
            entries.push({ name, value, selector: normalizeSelector(selector), origin: rel })
        }
    }
}

// 3. émission DTCG (ordre : alias réf, :root, thèmes, portées)
const selRank = (s) => {
    if (s === ':root, [data-theme]') return 0
    if (s === ':root') return 1
    const m = s.match(/^\[data-theme="([\w-]+)"\]$/)
    if (m) return 10 + ['light', 'dark', 'dim', 'oled', 'high-contrast'].indexOf(m[1])
    return 100
}
const decorated = entries.map((e, i) => ({ ...e, i }))
decorated.sort((a, b) => {
    const ra = a.origin === 'reference-alias' ? -1 : selRank(a.selector)
    const rb = b.origin === 'reference-alias' ? -1 : selRank(b.selector)
    return ra - rb || a.i - b.i
})

const mr = {}
const mrOrigin = {}
let superseded = 0
for (const e of decorated) {
    const key = e.name.replace(/^--mr-/, '')
    const leaf = { $value: e.value }
    if (e.selector !== ':root, [data-theme]' && e.selector !== ':root') {
        leaf.$extensions = { 'com.monority.deprecated': { selector: e.selector } }
    } else if (e.origin !== 'reference-alias') {
        leaf.$extensions = { 'com.monority.deprecated': { origin: e.origin } }
    }
    if (mr[key]) {
        const firstSel = mr[key].$extensions?.['com.monority.deprecated']?.selector ?? ':root'
        if (e.origin !== 'reference-alias' && mrOrigin[key] === 'reference-alias') {
            superseded++ // l'alias de référence gagne sur l'ancienne valeur
            continue
        }
        if (mr[key].$value === e.value && firstSel === e.selector) {
            continue // même valeur, même sélecteur : doublon de fichier, ignoré
        }
        // même nom, autre sélecteur (valeurs par thème) : conserve les deux
        let k = 2
        while (mr[`${key}~${k}`]) k++
        mr[`${key}~${k}`] = leaf
        mrOrigin[`${key}~${k}`] = e.origin
        warnings.push(`multi-sélecteur: ${e.name} (${firstSel} + ${e.selector}) ← ${e.origin}`)
    } else {
        mr[key] = leaf
        mrOrigin[key] = e.origin
    }
}

const outPath = path.join(repoRoot, 'packages/tokens/src/deprecated.json')
fs.writeFileSync(outPath, JSON.stringify({ mr }, null, 2) + '\n')

console.log(`deprecated.json : ${Object.keys(mr).length} entrées`)
console.log(`  alias référence : ${entries.filter((e) => e.origin === 'reference-alias').length}`)
console.log(`  valeurs actuelles : ${entries.filter((e) => e.origin !== 'reference-alias').length}`)
console.log(`  ignorés (nouveau système) : ${skippedNew}, audit-8 : ${skippedAudit}`)
const dupes = warnings.filter((w) => w.startsWith('doublon'))
console.log(`  doublons multi-sélecteurs : ${dupes.length}`)
for (const w of warnings) console.log('  ! ' + w)
