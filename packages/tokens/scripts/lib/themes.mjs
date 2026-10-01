/**
 * Découverte des thèmes à partir du glob `src/themes/*.json`.
 *
 * Avant 0.13, trois listes codées en dur décrivaient les mêmes six thèmes.
 * Un fichier ajouté sur disque n'était ni lu, ni résolu, ni émis : c'est ce qui
 * est arrivé à `slate.json`. La source est désormais le disque.
 *
 * L'ordre est trié pour que le CSS généré soit déterministe d'une machine à
 * l'autre. Un nom de fichier non conforme fait échouer le build : mieux vaut un
 * build rouge qu'un thème perdu.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const pkgDir = path.resolve(here, '../..')
const THEMES_DIR = path.join(pkgDir, 'src/themes')

/** Un nom de thème doit être utilisable dans un sélecteur CSS et un nom de fichier. */
export const THEME_NAME_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

/**
 * Noms de thèmes présents sur disque, triés.
 * Lève une erreur explicite sur un nom non conforme plutôt que de l'ignorer.
 */
export function discoverThemes(dir = THEMES_DIR) {
    const files = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.json'))
        .sort()
    const names = files.map((f) => path.basename(f, '.json'))
    const invalid = names.filter((n) => !THEME_NAME_RE.test(n))
    if (invalid.length) {
        throw new Error(
            `Nom de thème non conforme dans ${path.relative(pkgDir, dir)} : ` +
                `${invalid.join(', ')}. Attendu : minuscules, chiffres, tirets, ` +
                'commençant par une lettre.'
        )
    }
    if (names.length === 0) {
        throw new Error(`Aucun fichier de thème dans ${path.relative(pkgDir, dir)}`)
    }
    return names
}

/** Association nom de fichier → nom de thème, dérivée du disque. */
export function themeFileMap(dir = THEMES_DIR) {
    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.json'))
        .sort()
        .map((f) => [`themes/${f}`, path.basename(f, '.json')])
}

/**
 * Sélecteur CSS d'un thème.
 *
 * Deux conventions portent une information sémantique, pas une liste :
 *  - `light` est le thème par défaut : il s'applique à `:root` sans attribut ;
 *  - `dark` est le repli système : il s'applique sous `prefers-color-scheme`.
 *
 * Les deux sont dérivées de noms de fichiers réservés, et le build échoue si
 * aucun des deux n'est présent — plutôt que d'émettre un CSS sans `:root`.
 */
export const DEFAULT_THEME = 'light'
export const SYSTEM_FALLBACK_THEME = 'dark'

export function selectorFor(name, { withRoot = false, withDimAlias = false } = {}) {
    if (name === DEFAULT_THEME) {
        return withRoot ? `:root,\n[data-theme="${name}"]` : `[data-theme="${name}"]`
    }
    const alias = withDimAlias && name === SYSTEM_FALLBACK_THEME ? ', \n[data-theme="dim"]' : ''
    return `[data-theme="${name}"]${alias}`
}

/** Sélecteur pour le repli `prefers-color-scheme`, sans attribut de thème. */
export function systemFallbackSelector(name) {
    return `:root:not([data-theme="${name}"])`
}
