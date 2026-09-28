import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * L'état invalid doit gagner : `data-invalid` est le système canonique.
 *
 * Régression corrigée en C1 : le sélecteur BEM `.mr-textarea--invalid`
 * (spécificité 0,1,0) perdait face à la règle de base `.mr-textarea.mr-textarea`
 * (0,2,0) ; l'état invalid du textarea n'était donc pas stylé. La correction
 * consiste à laisser `[data-invalid='true']` s'appliquer normalement (0,2,0,
 * déclaré après la base) — pas de `!important` ni de sélecteur alourdi.
 */
const css = readFileSync(resolve(process.cwd(), 'dist/index.css'), 'utf8')
// Le bundle normalise les guillemets des valeurs d'attribut : on matche les deux formes.
const invalidSelector = /\.mr-textarea\[data-invalid=['"]?true['"]?\]/

describe('dist — portée de data-invalid (Textarea)', () => {
    it('applique l’état invalid via un sélecteur non neutralisé', () => {
        expect(css).toMatch(invalidSelector)
        expect(css).not.toMatch(/:where\(\.mr-textarea\[data-invalid/)
    })

    it('déclare la règle invalid après la règle de base pour gagner le conflit de spécificité', () => {
        const invalidIndex = css.search(invalidSelector)
        const baseIndex = css.indexOf('.mr-textarea.mr-textarea')

        expect(baseIndex).toBeGreaterThan(-1)
        expect(invalidIndex).toBeGreaterThan(baseIndex)
    })
})
