/**
 * Périmètre d'audit, dérivé de `packages/tokens/audit-exclusions.json`.
 *
 * Les exclusions vivent dans un fichier versionné et sont lues ici, pas
 * décidées dans la tête de chaque script. Un grep ou un audit qui refuse de
 * renommer une archive doit le dire à partir de ce fichier.
 */
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

export const EXCLUSIONS = require(path.resolve(here, '../../audit-exclusions.json'))

/** Chemins exacts exclus des audits de tokens. */
export const EXCLUDED_PATHS = new Set(EXCLUSIONS.exclusions.map((e) => e.path))

/** Préfixes de répertoires exclus (fichiers générés). */
export const EXCLUDED_PREFIXES = EXCLUSIONS.generatedNeverAudited.map((e) => e.path)

/**
 * Un chemin est-il hors périmètre d'audit ?
 * `rel` est un chemin relatif au dépôt, avec `/` comme séparateur.
 */
export function isExcluded(rel) {
    const normalized = rel.split(path.sep).join('/')
    if (EXCLUDED_PATHS.has(normalized)) return true
    return EXCLUDED_PREFIXES.some((prefix) => normalized.startsWith(prefix))
}

/**
 * Toutes les exclusions portent-elles une raison ?
 * Une entrée sans raison ferait échouer l'audit : une exclusion non motivée
 * est une dette invisible.
 */
export function validateExclusions() {
    const missing = [...EXCLUSIONS.exclusions, ...EXCLUSIONS.generatedNeverAudited].filter(
        (e) => !e.reason || !e.reason.trim()
    )
    return missing
}

/** Motif de grep qui exclut le périmètre, à passer après `-e`. */
export function grepExclusions() {
    return EXCLUSIONS.exclusions.map((e) => `:(exclude)${e.path}`)
}
