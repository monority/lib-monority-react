/**
 * Normalisation du nom de token pour T3 (`check-no-hardcoded.mjs`).
 *
 * T3 autorise les teintes fixes de statut par NOM COURT : `success-text`.
 * Un thème nommé produit `theme-slate-success-text`, qui ne correspondait à
 * rien : tous les tons d'un thème ajouté au glob étaient signalés à tort.
 *
 * Comparer le dernier segment serait faux : `info-text`, `danger-text`,
 * `warning-text` et `success-text` se terminent tous par `text`, et T3
 * deviendrait aveugle à la distinction entre tons. On retire donc le préfixe
 * EXACT `--mr-theme-<nom de thème>-`, jamais un segment.
 *
 * La liste des thèmes vient du disque (`lib/themes.mjs`), donc aucun nom de
 * thème n'est codé en dur ici : D14.
 */
import { discoverThemes } from './themes.mjs'

/**
 * Retire le préfixe de thème d'un nom de token.
 * Retourne le nom court si le préfixe correspond à un thème connu,
 * le nom inchangé sinon.
 *
 * @param {string} name  nom de token, par exemple `--mr-theme-slate-success-text`
 * @param {string[]} themes  noms de thèmes connus
 */
export function shortName(name, themes) {
    for (const theme of themes) {
        const prefix = `--mr-theme-${theme}-`
        if (name.startsWith(prefix)) return name.slice(prefix.length)
    }
    return name
}

/** Même chose, sans argument : dérive les thèmes du disque. */
export function shortNameFromDisk(name) {
    return shortName(name, discoverThemes())
}
