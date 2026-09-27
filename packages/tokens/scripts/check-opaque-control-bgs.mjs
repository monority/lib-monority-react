#!/usr/bin/env node
/**
 * Phase 2a — T8. Les contrôles à bordure ont-ils un fond opaque ?
 *
 * WCAG 1.4.11 identifie un contrôle par sa limite AU REPOS. Cette limite doit
 * être mesurable contre le fond RÉELLEMENT situé derrière elle. Un contrôle à
 * fond transparent repose sur la surface qui le porte, et son contraste change
 * selon le contexte (fond survolé, overlay, conteneur) : le couple
 * bordure/fond devient indéterministe, et le seuil de 3:1 guarantees au repos
 * ne tient plus.
 *
 * Les 9 contrôles à bordure doivent donc poser un fond opaque
 * (`--mr-bg-control` = `--mr-bg-sunken`).
 *
 * La liste `.mr-combobox__list` en est exclue : c'est un conteneur d'overlay
 * (comme dropdown-menu, context-menu, command-palette), pas une limite de
 * contrôle ; sa bordure suit celle des autres overlays.
 *
 *   node packages/tokens/scripts/check-opaque-control-bgs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const RECIPES = path.join(repoRoot, 'packages/styles/src/recipes')

// Sélecteur de la RECETTE ->propriété background attendue. On lit les recipes
// (source de vérité du style), pas le CSS généré.
const CONTROLS = [
    { recipe: 'input-base.recipe.css', selector: '.mr-input-base', covers: 'input, select, textarea, date-picker, combobox input, number-input, password-input' },
    { recipe: 'checkbox.recipe.css', selector: '.mr-checkbox__control', covers: 'checkbox' },
    { recipe: 'radio-group.recipe.css', selector: '.mr-radio__control', covers: 'radio' },
    { recipe: 'switch.recipe.css', selector: '.mr-switch__control', covers: 'switch (piste off)' },
]
// Contrôles explicitement exclus, avec la raison.
const EXCLUDED = [
    {
        recipe: 'combobox.recipe.css',
        selector: '.mr-combobox__list',
        reason: 'conteneur d’overlay : bordure alignee sur dropdown-menu / context-menu / command-palette (border-subtle)',
    },
]

const failures = []
const checked = []

for (const c of CONTROLS) {
    const file = path.join(RECIPES, c.recipe)
    const css = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
    const start = css.indexOf(`${c.selector} {`)
    if (start < 0) {
        failures.push(`${c.recipe} : bloc \`${c.selector} {\` introuvable`)
        continue
    }
    const body = css.slice(start, css.indexOf('}', start))
    const m = body.match(/background(?:-color)?:\s*([^;]+);/)
    if (!m) {
        failures.push(`${c.selector} (${c.recipe}) : aucun \`background\``)
        continue
    }
    const value = m[1].trim()
    const opaque = !/transparent|currentColor|inherit|\bvar\(\s*transparent/.test(value)
    if (!opaque) {
        failures.push(
            `${c.selector} (${c.recipe}) : fond non opaque \`${value}\` — ` +
                `la bordure au repos n'a pas de fond stable pour etre mesuree`,
        )
    }
    checked.push({ ...c, value })
}

if (failures.length) {
    console.error(`T8 FAIL — ${failures.length} contrôle(s) à bordure sans fond opaque :`)
    for (const f of failures) console.error(`  ${f}`)
    process.exit(1)
}
console.log(
    `T8 PASS — ${checked.length} contrôles à bordure ont un fond opaque ` +
        `(${EXCLUDED.length} conteneur(s) d'overlay exclus : ${EXCLUDED.map((e) => e.selector).join(', ')})`,
)
