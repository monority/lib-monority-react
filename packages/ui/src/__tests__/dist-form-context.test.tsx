import { act, createElement, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { beforeAll, describe, expect, it } from 'vitest'

/**
 * Le contexte de formulaire traverse réellement deux ENTRÉES du dist.
 *
 * Répartition volontairement croisée :
 *   - `FormControl` (provider) et `Input` : dist/index.js et dist/input.js
 *   - `Field` et `FieldError`               : dist/field.js
 *
 * Ce qui est vérifié est indiqué test par test. Une distinction importante :
 * `Input` est un composite qui crée LUI-MÊME son `FormControl` (voir
 * Input.tsx) : ses attributs d'accessibilité viennent donc de son contexte
 * interne, et ne constituent donc pas un signal inter-entrées. Ce qui prouve
 * le partage à travers les entrées, ce sont les attributs que `Field`
 * DÉRIVE du contexte fourni par une autre entrée :
 *   - `htmlFor` du label   <- ctx.inputId  (écrit par index.js, lu par field.js)
 *   - `id` du FieldError   <- ctx.errorId  (idem)
 *
 * Régression couverte : avec `splitting: false`, `field.js` et `index.js`
 * embarquaient chacun leur propre `createContext` (17 instances distinctes).
 * `Field` lisait alors un contexte vide et perdait `htmlFor` et l'id d'erreur.
 */
const distDir = join(process.cwd(), 'dist')
const load = (entry: string) => import(pathToFileURL(join(distDir, entry)).href)

let FormControl: any
let Field: any
let FieldError: any
let Input: any

beforeAll(async () => {
    const index = await load('index.js')
    FormControl = index.FormControl
    const field = await load('field.js')
    Field = field.Field
    FieldError = field.FieldError
    const input = await load('input.js')
    Input = input.Input
})

function renderToHtml(node: ReactElement) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    act(() => {
        root.render(node)
    })
    const html = container.innerHTML
    act(() => root.unmount())
    container.remove()
    return html
}

describe('dist — contexte partagé entre field.js et index.js', () => {
    it('expose les trois pièces attendues', () => {
        expect(typeof FormControl).toBe('function')
        expect(typeof Field).toBe('function')
        expect(FieldError).toBeTruthy()
        expect(Input).toBeTruthy()
    })

    it('INTER-ENTRÉES : le label de field.js pointe vers l’id fourni par index.js', () => {
        const html = renderToHtml(
            createElement(
                FormControl,
                { id: 'courriel' },
                createElement(Field, { label: 'Courriel' }, createElement(Input))
            )
        )
        // ctx.inputId est écrit par FormControl (index.js) et lu par Field (field.js).
        // Contexte non partage => ctx.inputId === '' => aucun `for`.
        expect(html).toMatch(/<label[^>]*for="courriel"/)
    })

    it('INTER-ENTRÉES : le FieldError de field.js reçoit l’id d’erreur du contexte', () => {
        const html = renderToHtml(
            createElement(
                FormControl,
                { id: 'courriel', error: true, invalid: true },
                // `error` en prop demande à Field de rendre son FieldError ; l'`id`
                // de ce message vient de ctx.errorId, pas de la prop.
                createElement(
                    Field,
                    { label: 'Courriel', error: 'Adresse invalide' },
                    createElement(Input)
                )
            )
        )
        // L'ordre des attributs n'est pas garanti (ils sont spreads) : on verifie
        // la presence des deux cote par cote.
        expect(html).toMatch(/<span[^>]*id="courriel-error"/)
        expect(html).toMatch(/<span[^>]*role="alert"/)
        // et l'erreur est annoncée a l'assistance technique
        expect(html).toMatch(/aria-live="assertive"/)
    })

    it('l’Input porte aria-invalid et aria-describedby cohérents avec l’erreur', () => {
        // Rendu de l'API publique : Input compose son propre FormControl, donc
        // ces attributs viennent de son contexte interne. On vérifie qu'ils sont
        // bien corrects et cohérents avec le message rendu juste après.
        const html = renderToHtml(
            createElement(Input, {
                id: 'solo',
                label: 'Seul',
                error: 'Adresse invalide',
            })
        )
        const invalid = /<input[^>]*aria-invalid="true"/.test(html)
        expect(invalid).toBe(true)
        const describedBy = /<input[^>]*aria-describedby="([^"]*)"/.exec(html)
        expect(describedBy).not.toBeNull()
        // aria-describedby pointe vers un element reellement present
        expect(html).toContain(`id="${describedBy![1]}"`)
    })

    it('l’Input simple reste correctement associé à son label', () => {
        const html = renderToHtml(createElement(Input, { id: 'solo', label: 'Seul' }))
        expect(html).toMatch(/<label[^>]*for="solo"/)
        expect(html).toMatch(/<input[^>]*id="solo"/)
    })
})
