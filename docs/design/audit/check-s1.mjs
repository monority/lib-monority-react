#!/usr/bin/env node
/**
 * Grille phase 1a — S1.
 * Vérifie que docs/design/language.md contient tous les tokens cités dans
 * les sections 3 à 6 et 9 du prompt maître.
 *
 *   node docs/design/audit/check-s1.mjs
 *
 * Sortie : "S1 PASS — 0 token manquant" ou liste des manquants (code 1).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const prompt = fs.readFileSync(
    path.join(repoRoot, 'docs/roadmap/refonte/prompt-refonte-monority-ui.md'),
    'utf8',
)
const language = fs.readFileSync(path.join(repoRoot, 'docs/design/language.md'), 'utf8')

const lines = prompt.split('\n')
const find = (txt) => lines.findIndex((l) => l.startsWith(txt))
const i3 = find('## 3. Décisions structurantes')
const i7 = find('## 7. Spécifications des composants')
const i9 = find("## 9. Conventions d'API")
const i10 = find('## 10. Grille de qualité')
if ([i3, i7, i9, i10].some((i) => i < 0)) {
    console.error('S1 FAIL — sections du prompt introuvables')
    process.exit(1)
}
const source = [...lines.slice(i3, i7), ...lines.slice(i9, i10)].join('\n')
const tokens = [...new Set([...source.matchAll(/--mr-[\w-]+/g)].map((m) => m[0]))].sort()
const missing = tokens.filter((t) => !language.includes(t))

if (missing.length) {
    console.error(`S1 FAIL — ${missing.length} token(s) manquant(s) dans language.md :`)
    for (const t of missing) console.error('  ' + t)
    process.exit(1)
}
console.log(`S1 PASS — ${tokens.length} tokens cités, 0 manquant`)
