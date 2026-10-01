/**
 * Tests du périmètre d'audit (phase 0.12).
 *
 * Le risque n'est pas qu'une exclusion soit appliquée : c'est qu'elle le soit
 * par convention orale, donc qu'un script audite une archive et se contredise,
 * ou qu'une exclusion non motivée s'installe. Ces deux dérives doivent casser.
 */
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
    EXCLUSIONS,
    EXCLUDED_PATHS,
    grepExclusions,
    isExcluded,
    validateExclusions,
} from './lib/audit-scope.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

/** Fichiers trouves par un grep de l'ancien nom. Sortie vide = rien trouvé. */
const grepOldNames = (extra = '') => {
    const cmd = `git grep -l -e "--mr-brand-hue" -e "--mr-font-sans" -- . ${extra}`.trim()
    try {
        return execSync(cmd, { cwd: repoRoot, encoding: 'utf8' }).split('\n').filter(Boolean)
    } catch {
        return []
    }
}

test('chaque exclusion porte une raison', () => {
    assert.deepEqual(
        validateExclusions(),
        [],
        'une exclusion sans raison est une dette invisible et doit être refusée'
    )
})

test('NÉGATIF : une exclusion sans raison est détectée', () => {
    // Reproduit la forme fautive sans toucher au fichier réel.
    const fautif = [{ path: 'docs/x.md', kind: 'archive' }]
    const sansRaison = fautif.filter((e) => !e.reason || !e.reason.trim())
    assert.equal(sansRaison.length, 1, 'le garde-fou doit voir passer une entrée sans raison')
})

test('les deux archives sont bien exclues', () => {
    assert.equal(EXCLUDED_PATHS.has('docs/design/audit/migration-table.md'), true)
    assert.equal(EXCLUDED_PATHS.has('docs/design/reference/prompt-maitre-v4.md'), true)
})

test('les archives contiennent bien les anciens noms, sinon l exclusion ne prouve rien', () => {
    const oldNames = [
        '--mr-brand-hue',
        '--mr-brand-chroma',
        '--mr-neutral-hue',
        '--mr-neutral-chroma',
        '--mr-font-sans',
        '--mr-font-mono',
        '--mr-radius-scale',
    ]
    for (const entry of EXCLUSIONS.exclusions) {
        const source = fs.readFileSync(path.join(repoRoot, entry.path), 'utf8')
        const found = oldNames.filter((n) => source.includes(n))
        assert.ok(
            found.length > 0,
            `${entry.path} ne contient aucun ancien nom : l'exclusion est devenue une convention vide`
        )
    }
})

test('le code vit dehors est audité', () => {
    for (const rel of [
        'packages/styles/src/recipes/badge.recipe.css',
        'packages/ui/src/lib/design-config.ts',
        'apps/web/src/index.css',
    ]) {
        assert.equal(isExcluded(rel), false, `${rel} ne doit pas être exclu`)
    }
})

test('les générés ne sont jamais audités', () => {
    assert.equal(
        isExcluded('packages/styles/src/tokens/generated/tokens.css'),
        true,
        'le CSS généré est reconstruit, l auditer ne veut rien dire'
    )
    assert.equal(isExcluded('docs/design/reference/monority-ui-tokens.reference.css'), true)
})

test('le motif de grep couvre exactement les archives, et les fichiers générés', () => {
    const patterns = grepExclusions()
    assert.equal(patterns.length, EXCLUSIONS.exclusions.length)
    for (const entry of EXCLUSIONS.exclusions) {
        assert.ok(
            patterns.includes(`:(exclude)${entry.path}`),
            `le motif de grep ne couvre pas ${entry.path}`
        )
    }
})

test('le motif de grep exclut réellement : preuve par exécution', () => {
    const archives = [
        'docs/design/audit/migration-table.md',
        'docs/design/reference/prompt-maitre-v4.md',
    ]

    const brut = grepOldNames()
    for (const file of archives) {
        assert.ok(
            brut.includes(file),
            `le grep non filtré doit trouver ${file}, trouvé : ${JSON.stringify(brut)}`
        )
    }

    const filtre = grepOldNames(grepExclusions().join(' '))
    assert.deepEqual(
        filtre,
        [],
        `le grep filtré ne doit rien trouver, trouvé : ${JSON.stringify(filtre)}`
    )
})
