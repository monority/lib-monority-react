/**
 * Garde-fou du namespace des CSS layers.
 *
 * Contexte : le template de `tooling/generators` émettait `@layer recipes`
 * (sans namespace) alors que le dépôt n'utilise que `monority.*`. Un layer non
 * déclaré dans `layers/index.css` est ordonné en dernier par le navigateur :
 * tout composant scaffoldé aurait donc été au-dessus de `monority.overrides`,
 * sans qu'aucune erreur ne remonte. Corrigé dans 27eebfe, ce test verrouille
 * la règle.
 *
 * S'appuie sur l'infra existante du package (`node --test ./scripts/*.test.mjs`).
 * Aucune dépendance ajoutée.
 */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const PACKAGE_ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const REPO_ROOT = join(PACKAGE_ROOT, '..', '..')
const NAMESPACE = 'monority.'

/** Tous les fichiers .css d'un dossier, récursivement. */
function cssFiles(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) return cssFiles(path)
        return entry.name.endsWith('.css') ? [path] : []
    })
}

test('tous les @layer des sources de styles sont namespés monority.*', () => {
    const offenders = []

    for (const file of cssFiles(join(PACKAGE_ROOT, 'src'))) {
        const content = readFileSync(file, 'utf8')
        for (const match of content.matchAll(/@layer\s+([\w.-]+)/g)) {
            if (!match[1].startsWith(NAMESPACE)) {
                offenders.push(`${file.slice(REPO_ROOT.length + 1)} : @layer ${match[1]}`)
            }
        }
    }

    assert.deepEqual(offenders, [], `layers non namespés :\n${offenders.join('\n')}`)
})

test('le template du générateur émet un layer namespacé monority.*', () => {
    const template = readFileSync(
        join(REPO_ROOT, 'tooling/generators/scripts/generate-component.js'),
        'utf8'
    )
    const layers = [...template.matchAll(/@layer\s+([\w.-]+)/g)].map((match) => match[1])

    assert.ok(layers.length > 0, 'le template doit contenir au moins une déclaration @layer')
    for (const layer of layers) {
        assert.ok(
            layer.startsWith(NAMESPACE),
            `le générateur émet "@layer ${layer}" hors namespace "${NAMESPACE}*"`
        )
    }
})
