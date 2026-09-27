import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Contrat de résolution du paquet publié.
 *
 * La condition `development` pointait vers `./src`, absent du paquet publié.
 * Vite ET webpack résolvent `development` nativement : chez un consommateur
 * tiers, l'import échouait au runtime au lieu de retomber sur `dist`.
 *
 * On utilise donc une condition personnalisée `monority-source`, activée
 * explicitement (et seulement là) via `resolve.conditions`.
 */
const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))

const entries = Object.entries(pkg.exports) as [string, Record<string, string>][]

describe('package.json — conditions d’export', () => {
  it('n’expose plus aucune condition `development`', () => {
    const offenders = entries
      .filter(([, v]) => 'development' in v)
      .map(([k]) => k)
    expect(offenders, `conditions development restantes : ${offenders.join(', ')}`).toHaveLength(0)
  })

  it('chaque entrée propose `monority-source` vers ./src', () => {
    for (const [key, value] of entries) {
      // Seules les entrées code (les .css n'ont pas de source TS équivalente).
      if (key.endsWith('.css')) continue
      expect(value['monority-source'], `entrée ${key}`).toMatch(/^\.\/src\//)
    }
  })

  it('toute entrée retombe bien sur dist sans condition spéciale', () => {
    for (const [key, value] of entries) {
      expect(value.import ?? value.default, `entrée ${key}`).toMatch(/^\.\/dist\//)
    }
  })

  it('`files` ne publie que dist et README', () => {
    expect([...pkg.files].sort()).toEqual(['README.md', 'dist'])
  })
})
