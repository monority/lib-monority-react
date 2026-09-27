import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Non-duplication de `createContext` dans le dist.
 *
 * Avec `splitting: false`, chaque entrée tsup embarquait sa propre copie de
 * chaque `createContext`. Résultat observé avant correctif : 39 occurrences
 * réparties sur 17 fichiers, donc 17 `FormControlContext` DIFFÉRENTS. Un
 * `<Input>` importé de `@monority/ui/input` et un `<Field>` importé de
 * `@monority/ui/field` ne partageaient alors plus la même instance de
 * contexte : les attributs d'accessibilité (label associé, aria-describedby)
 * ne se propageaient pas d'une entrée à l'autre.
 *
 * Ce test lit le dist réellement produit et échoue si un contexte est
 * dupliqué. Il suppose que `pnpm build` a été lancé (cf. `pretest`).
 */
const distDir = join(process.cwd(), 'dist')

const readEntry = (name: string) => readFileSync(join(distDir, name), 'utf8')

describe('dist — non-duplication des contextes React', () => {
  it('ne contient qu’une seule instance de FormControlContext', () => {
    const files = readdirSync(distDir).filter((f) => f.endsWith('.js'))
    expect(files.length).toBeGreaterThan(0)

    const definitions = files.filter((f) =>
      /var\s+\w*FormControlContext\s*=\s*createContext/.test(readFileSync(join(distDir, f), 'utf8')),
    )

    // Un seul chunk porte la définition ; `input.js` et `field.js` y importent.
    expect(definitions).toHaveLength(1)
  })

  it('input.js et field.js importent le même chunk de contexte', () => {
    const input = readEntry('input.js')
    const field = readEntry('field.js')

    // Le chunk qui définit FormControlContext
    const owner = readdirSync(distDir).find(
      (f) => f.endsWith('.js') && /var\s+\w*FormControlContext\s*=\s*createContext/.test(readFileSync(join(distDir, f), 'utf8')),
    )
    expect(owner).toBeDefined()

    expect(input).toContain(`./${owner}`)
    expect(field).toContain(`./${owner}`)
  })

  it('aucun contexte n’est défini deux fois dans tout le dist', () => {
    const files = readdirSync(distDir).filter((f) => f.endsWith('.js'))
    const perName = new Map<string, string[]>()

    for (const file of files) {
      const src = readFileSync(join(distDir, file), 'utf8')
      // `var X = createContext(...)`
      for (const m of src.matchAll(/var\s+(\w+)\s*=\s*createContext\(/g)) {
        const list = perName.get(m[1]) ?? []
        list.push(file)
        perName.set(m[1], list)
      }
    }

    const duplicated = [...perName.entries()].filter(([, files]) => files.length > 1)
    expect(duplicated, `contextes dupliqués : ${duplicated.map(([n, f]) => `${n} dans ${f.join(', ')}`).join(' | ')}`).toHaveLength(0)
  })

  it('aucune entrée n’instancie sa propre FormControlContext', () => {
    // Régression ciblée sur le contexte de formulaire, qui doit vivre dans un
    // chunk partagé. `index.js` peut légitimement définir ThemeContext /
    // ToastContext : ce sont des singletons sans entrée dédiée.
    const entries = readdirSync(distDir).filter((f) => f.endsWith('.js') && !f.startsWith('chunk-'))
    const offenders = entries.filter((f) =>
      /=\s*createContext\(/.test(readEntry(f)) && /createContext[\s\S]{0,80}FormControl|FormControl[\s\S]{0,80}=?\s*createContext\(/.test(readEntry(f)),
    )
    expect(offenders).toHaveLength(0)
  })
})
