/**
 * Regex de nommage des tokens, DÉRIVÉE de `packages/tokens/categories.json`.
 *
 * La liste des catégories n'est écrite qu'une fois, dans ce JSON. Ni cette
 * regex ni `stylelint.config.mjs` ni `docs/design/tokens-convention.md` §4 ne
 * la recopient : `token-pattern.test.mjs` échoue si les trois divergent.
 *
 * Deux pièges de Stylelint 16, tous deux vérifiés par fixture :
 *  1. `custom-property-pattern` matche le nom **sans** les deux tirets de `--` ;
 *  2. Stylelint n'utilise que le **premier groupe capturant** d'une regex, donc
 *     toute alternance doit être en groupes non capturants `(?:…)`.
 *
 * Le motif exclut le préfixe `--` pour la raison (1). Il est donc utilisable tel
 * quel par Stylelint, et par `RegExp.test('--mr-…')` après retrait du préfixe.
 */
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const CATEGORIES = path.resolve(here, '../../packages/tokens/categories.json')

export const categories = require(CATEGORIES)

export const GLOBAL_CATEGORY_NAMES = categories.categories.map((c) => c.name)
export const PRIMITIVE_NAMES = categories.primitives.map((p) => p.name)
export const FORBIDDEN_PREFIXES = categories.forbidden.map((f) =>
    f.name.replace(/\*$/, '').replace(/-$/, '')
)

/**
 * Motif du nom de propriété pour Stylelint — SANS le préfixe `--` (piège 1),
 * le préfixe `mr-` étant conservé.
 *
 * Trois formes :
 *   primitif  `mr-ref-<rôle>(-<variante>)*`                 (D11)
 *   global    `mr-<catégorie>`                               (catégorie seule : border-width, z-index, accent)
 *   global    `mr-<catégorie>(-<rôle>)+`                     (bg-canvas, font-weight-medium)
 */
export const TOKEN_NAME_PATTERN =
    '^(?:' +
    'mr-ref-[a-z0-9]+(?:-[a-z0-9]+)*' +
    '|' +
    `mr-(?:${GLOBAL_CATEGORY_NAMES.join('|')})(?:-[a-z0-9]+)*` +
    ')$'

export const tokenNameRegex = new RegExp(TOKEN_NAME_PATTERN)

/** Retire le préfixe `--` : c'est la forme sur laquelle Stylelint travaille. */
const strip = (name) => name.replace(/^--/, '')
/** Le nom est-il un token global ou un primitif admissible ? */
export function isValidTokenName(name) {
    return tokenNameRegex.test(strip(name))
}

/** Le nom tombe-t-il dans une abréviation héritée interdite (D8) ? */
export function isForbiddenAbbreviation(name) {
    const bare = name.replace(/^--mr-/, '')
    return FORBIDDEN_PREFIXES.some((prefix) => bare === prefix || bare.startsWith(`${prefix}-`))
}
