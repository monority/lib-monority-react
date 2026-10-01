/**
 * Étape 0.13, suite — X2 parcourt tous les thèmes.
 *
 * X2 mesurait le contraste. Il ignorait les thèmes qu'il ne connaissait pas :
 * sa liste était en dur, donc un thème ajouté à `src/themes/*.json` passait
 * sans contrôle de contraste. C'est le même défaut que la parité du build, vu
 * par l'autre bout.
 *
 * Ce test compare ce que X2 **annonce avoir parcouru** — Behaviour observable,
 * pas lecture de source — à ce qui est **émis** dans le CSS. Un thème vide
 * compte : il doit être contrôlé, pas ignoré.
 *
 * Le contraste lui-même est couvert par l'étape 0.10. Ici on vérifie la
 * présence, pas la mesure.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { discoverThemes } from './lib/themes.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const pkgDir = path.join(repoRoot, 'packages/tokens')
const generatedCss = path.join(repoRoot, 'packages/styles/src/tokens/generated/tokens.css')

/** Ce que X2 déclare avoir parcouru, lu dans sa sortie réelle. */
function themesVisitedByX2() {
    let out = ''
    try {
        out = execSync('node scripts/check-contrasts.mjs', {
            cwd: pkgDir,
            encoding: 'utf8',
            maxBuffer: 1e8,
            stdio: ['ignore', 'pipe', 'pipe'],
        })
    } catch (e) {
        out = (e.stdout || '') + (e.stderr || '')
    }
    const m = out.match(/X2 thèmes parcourus \(\d+\) : (.+)/)
    assert.ok(m, `X2 n'annonce pas les thèmes qu'il parcourt. Sortie : ${out.slice(0, 200)}`)
    return m[1].split(',').map((s) => s.trim())
}

test('X2 parcourt tous les thèmes du disque', () => {
    const disk = discoverThemes()
    const visited = themesVisitedByX2()
    assert.deepEqual(
        visited,
        disk,
        `X2 ne parcourt pas les mêmes thèmes que le disque.\n` +
            `  disque  : ${disk.join(', ')}\n` +
            `  X2 parcourt : ${visited.join(', ')}`
    )
})

test('X2 ne déclare pas sa propre liste de thèmes', () => {
    const source = fs.readFileSync(path.join(pkgDir, 'scripts/check-contrasts.mjs'), 'utf8')
    assert.ok(
        !/const THEMES\s*=\s*\[/.test(source),
        'X2 redéclare une liste de thèmes en dur : elle doit venir de lib/themes.mjs'
    )
})

test('X2 échoue si le tableau 5.5 cite un thème absent du disque', () => {
    const source = fs.readFileSync(path.join(pkgDir, 'scripts/check-contrasts.mjs'), 'utf8')
    assert.match(
        source,
        /tableau 5\.5.*absents de src\/themes/s,
        'la validation du tableau 5.5 contre le disque est obligatoire'
    )
})

test('un thème vide reste contrôlé, pas ignoré', () => {
    // `slate` est volontairement vide après la table rase. Il doit être
    // annoncé par X2 : c'est le cas qui avait échappé à tous les contrôles.
    const visited = themesVisitedByX2()
    const slate = JSON.parse(fs.readFileSync(path.join(pkgDir, 'src/themes/slate.json'), 'utf8'))
    const slateTokens = Object.keys(slate.mr ?? {}).length
    assert.ok(
        visited.includes('slate'),
        `slate est vide (${slateTokens} token) mais X2 ne le parcourt pas : un thème vide ` +
            'doit être contrasté, pas ignoré.'
    )
})

test('le CSS émis ne porte aucun thème absent du disque', () => {
    if (!fs.existsSync(generatedCss)) return
    const css = fs.readFileSync(generatedCss, 'utf8')
    const emitted = [...new Set([...css.matchAll(/\[data-theme="([a-z-]+)"\]/g)].map((m) => m[1]))]
    // `dim` est un alias de rendu, pas un fichier : il est traité séparément.
    const disk = discoverThemes()
    const orphans = emitted.filter((name) => !disk.includes(name) && name !== 'dim')
    assert.deepEqual(
        orphans,
        [],
        `sélecteur émis sans fichier de thème correspondant : ${orphans.join(', ')}`
    )
})
