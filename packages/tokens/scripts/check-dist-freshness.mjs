#!/usr/bin/env node
/**
 * Phase 2a — T7. Le CSS généré est-il bien celui que consomme l'application ?
 *
 * Piège : `@monority/ui` embarque le CSS (tsup -> `packages/ui/dist/index.css`)
 * et `apps/web` consomme ce dist, PAS `packages/styles/src/tokens/generated/`.
 * Reconstruire les tokens seul ne change donc rien au rendu : le bundle
 * continue de servir l'ancien CSS, silencieusement.
 *
 * Ce contrôle compare le CONTENU (pas les dates : un build rendrait le
 * contrôle par mtime toujours rouge) : chaque déclaration des CSS générés
 * doit être présente dans le bundle consommé.
 *
 *   node packages/tokens/scripts/check-dist-freshness.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

const GENERATED = [
    'packages/styles/src/tokens/generated/tokens.css',
    'packages/styles/src/tokens/generated/deprecated.css',
]
const CONSUMED = 'packages/ui/dist/index.css'

/** `--mr-x: <valeur>` normalisée (espaces compactés, commentaires ignorés). */
function declarations(css) {
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '')
    const out = new Set()
    for (const m of stripped.matchAll(/(--mr-[\w-]+)\s*:\s*([^;{}]+);/g)) {
        out.add(`${m[1]}:${m[2].trim().replace(/\s+/g, ' ')}`)
    }
    return out
}

const read = (rel) => {
    const abs = path.join(repoRoot, rel)
    return fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null
}

const bundle = read(CONSUMED)
if (bundle === null) {
    console.log(
        `T7 SKIP — ${CONSUMED} absent. Construire @monority/ui ` +
            `(pnpm --filter @monority/tokens build:downstream) pour pouvoir verifier.`
    )
    process.exit(0)
}

const inBundle = declarations(bundle)
const missing = []
let checked = 0

for (const rel of GENERATED) {
    const css = read(rel)
    if (css === null) continue
    for (const d of declarations(css)) {
        checked++
        if (!inBundle.has(d)) missing.push(`${rel} : ${d}`)
    }
}

if (missing.length) {
    console.error(
        `T7 FAIL — ${missing.length} déclaration(s) générée(s) absente(s) du bundle consommé ` +
            `(${CONSUMED}) : le CSS de l'application est périmé.`
    )
    for (const m of missing.slice(0, 10)) console.error(`  ${m}`)
    console.error('  Relancer : pnpm --filter @monority/tokens build:downstream')
    process.exit(1)
}
console.log(`T7 PASS — ${checked} déclarations générées présentes dans ${CONSUMED} (bundle à jour)`)
