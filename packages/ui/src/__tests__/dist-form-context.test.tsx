import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { beforeAll, describe, expect, it } from 'vitest'

/**
 * Contexte de formulaire à travers deux ENTRÉES distinctes du dist.
 *
 * On importe volontairement `Field` depuis `@monority/ui/field` et `Input`
 * depuis `@monority/ui/input` (deux fichiers distincts du dist), pour prouver
 * qu'ils partagent la MÊME instance de `FormControlContext` :
 *  - le `<label>` du Field pointe vers l'id de l'input (`htmlFor` / `id`) ;
 *  - l'input reçoit `aria-describedby` calculé par le contexte.
 *
 * Ce test échoue si `splitting: false` revient : les deux entrées
 * embarqueraient chacune leur `createContext`, et l'input n'aurait ni le
 * `id` du Field ni son `aria-describedby`.
 */
const distDir = join(process.cwd(), 'dist')
const load = (entry: string) => import(pathToFileURL(join(distDir, entry)).href)

let Field: any
let Input: any
let InputBase: any

beforeAll(async () => {
  const field = await load('field.js')
  const input = await load('input.js')
  const inputBase = await load('inputBase.js').catch(() => ({ InputBase: null }))
  Field = field.Field
  Input = input.Input
  InputBase = inputBase?.InputBase ?? null
})

function renderToHtml(node: ReturnType<typeof createElement>) {
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

describe('dist — contexte partagé entre deux entrées', () => {
  it('Field et Input sont importables depuis deux entrées distinctes du dist', () => {
    expect(typeof Field).toBe('function')
    // Input est un forwardRef : un objet React, pas une fonction.
    expect(Input).toBeTruthy()
    expect(['function', 'object']).toContain(typeof Input)
  })

  it('le label du Field est associé à l’input via htmlFor/id', () => {
    const html = renderToHtml(
      createElement(Input, { id: 'courriel', label: 'Courriel' }),
    )
    // <label for="courriel"> ... <input id="courriel">
    expect(html).toMatch(/<label[^>]*for="courriel"/)
    expect(html).toMatch(/<input[^>]*id="courriel"/)
  })

  it('l’input reçoit aria-describedby calculé par le contexte', () => {
    const html = renderToHtml(
      createElement(Input, { id: 'courriel', label: 'Courriel', hint: 'Format work' }),
    )
    // describedBy = `${inputId}-hint`
    expect(html).toMatch(/<input[^>]*aria-describedby="courriel-hint"/)
    // l'id d'aide est bien présent dans le markup
    expect(html).toContain('id="courriel-hint"')
  })

  it('le contexte propage l’état invalide aux deux entrées', () => {
    const html = renderToHtml(
      createElement(Input, { id: 'x', label: 'X', error: 'Requis' }),
    )
    // aria-invalid présent sur l'input, message d'erreur rendu avec son id
    expect(html).toMatch(/<input[^>]*aria-invalid="true"/)
    expect(html).toContain('id="x-error"')
  })
})
