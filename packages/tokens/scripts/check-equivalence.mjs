#!/usr/bin/env node
/**
 * Phase 2a — T1. Le CSS généré et le CSS de référence, normalisés
 * (analyse syntaxique, tri des déclarations par sélecteur), sont identiques.
 *
 *   pnpm --filter @monority/tokens build && node packages/tokens/scripts/check-equivalence.mjs
 *
 * Sortie : "T1 PASS — 0 différence" ou liste (code 1).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const read = (p) => fs.readFileSync(path.join(repoRoot, p), 'utf8')
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '')

/** Sélecteur → déclarations triées. `@media Q @@ sel` pour les imbriquées. */
function parseCss(css) {
    const map = new Map()
    const add = (sel, body) => {
        const decls = [...body.matchAll(/([\w-]+)\s*:\s*([^;]+);/g)]
            .map((m) => `${m[1].trim()}:${m[2].trim().replace(/\s+/g, ' ')}`)
            .sort()
        const key = sel.replace(/\s+/g, ' ')
        if (!map.has(key)) map.set(key, [])
        map.get(key).push(...decls)
    }
    const rules = (text, media = null) => {
        let i = 0
        const n = text.length
        while (i < n) {
            while (i < n && /\s/.test(text[i])) i++
            if (i >= n) break
            if (text.startsWith('@import', i)) {
                i = text.indexOf(';', i) + 1
                continue
            }
            if (text.startsWith('@media', i)) {
                const open = text.indexOf('{', i)
                const q = text
                    .slice(i + 6, open)
                    .trim()
                    .replace(/\s+/g, ' ')
                let d = 1
                let j = open + 1
                while (j < n && d > 0) {
                    if (text[j] === '{') d++
                    else if (text[j] === '}') d--
                    j++
                }
                rules(text.slice(open + 1, j - 1), q)
                i = j
                continue
            }
            const open = text.indexOf('{', i)
            if (open < 0) break
            const sel = text.slice(i, open).trim().replace(/\s+/g, ' ')
            let d = 1
            let j = open + 1
            while (j < n && d > 0) {
                if (text[j] === '{') d++
                else if (text[j] === '}') d--
                j++
            }
            if (sel && !sel.startsWith('@'))
                add(media ? `@media ${media} @@ ${sel}` : sel, text.slice(open + 1, j - 1))
            i = j
        }
    }
    rules(stripComments(css))
    return map
}

const normSel = (s) =>
    s
        .replace(/\[data-theme=\\?"([\w-]+)\\?"\]/g, '[data-theme="$1"]')
        .replace(/\s*,\s*/g, ',\n')
        .trim()

const ref = parseCss(read('docs/design/reference/monority-ui-tokens.reference.css'))
const gen = parseCss(read('packages/styles/src/tokens/generated/tokens.css'))

const norm = (map) => {
    const out = new Map()
    for (const [k, v] of map) out.set(normSel(k), [...v].sort())
    return out
}
const refN = norm(ref)
const genN = norm(gen)

const diffs = []
for (const [k, v] of refN) {
    if (!genN.has(k)) {
        diffs.push(`sélecteur manquant dans le généré : ${k}`)
        continue
    }
    const g = genN.get(k)
    const onlyRef = v.filter((d) => !g.includes(d))
    const onlyGen = g.filter((d) => !v.includes(d))
    for (const d of onlyRef) diffs.push(`${k} : référence seule → ${d}`)
    for (const d of onlyGen) diffs.push(`${k} : généré seul → ${d}`)
}
for (const k of genN.keys()) {
    if (!refN.has(k)) diffs.push(`sélecteur en trop dans le généré : ${k}`)
}

if (diffs.length) {
    console.error(`T1 FAIL — ${diffs.length} différence(s) :`)
    for (const d of diffs.slice(0, 40)) console.error('  ' + d)
    process.exit(1)
}
console.log(
    `T1 PASS — 0 différence (${refN.size} sélecteurs, ${[...refN.values()].reduce((a, v) => a + v.length, 0)} déclarations)`
)
