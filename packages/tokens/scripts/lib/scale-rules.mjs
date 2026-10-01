/**
 * Vérification des échelles de pas (D15, validée le 2026-10-01).
 *
 * Les plafonds et les pas sont lus dans `packages/tokens/categories.json`,
 * jamais recopiés. Trois règles, chacune testée en négatif :
 *
 *   1. un pas hors de la liste fermée de sa famille → violation
 *   2. un dépassement du plafond de pas → violation
 *   3. un token de famille à `stepType: 'role-seul'` qui porte un pas → violation
 *
 * Un token à rôle seul est valide (arbitrage du 2026-10-01) : une famille sans
 * échelle est une famille valide.
 */
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const CATEGORIES = path.resolve(here, '../../categories.json')

export const scales = require(CATEGORIES).scales ?? []

/** Index famille → déclaration d'échelle. */
export const SCALE_BY_FAMILY = new Map(scales.map((s) => [s.family, s]))

/**
 * Découpe un nom de token en famille, rôle et pas.
 *
 * `--mr-spinner-ring-md` → famille `spinner`, rôle `ring`, pas `md`
 * `--mr-shadow-raised`   → famille `shadow`,  rôle `raised`, pas null
 * `--mr-opacity-disabled`→ famille `opacity`, rôle `disabled`, pas null
 *
 * Les familles à plusieurs segments (`icon-size`, `dialog-width`) sont testées
 * en premier : sans cela `icon-size-sm` serait lu famille `icon`, pas `size`.
 */
export function decompose(name, families = SCALE_BY_FAMILY) {
    const bare = name.replace(/^--mr-/, '')
    // Les familles triées par longueur décroissante évitent les faux préfixes.
    const familiesByLength = [...families.keys()].sort((a, b) => b.length - a.length)
    for (const family of familiesByLength) {
        if (bare !== family && !bare.startsWith(family + '-')) continue
        const rest = bare.slice(family.length).replace(/^-/, '')
        if (rest === '') return { family, role: null, step: null, rest: '' }
        const scale = families.get(family)
        // Un rôle déclaré est le premier segment ; ce qui reste est le pas.
        for (const role of scale.roles ?? []) {
            if (rest === role) return { family, role, step: null, rest }
            if (rest.startsWith(role + '-')) {
                return { family, role, step: rest.slice(role.length + 1), rest }
            }
        }
        return { family, role: null, step: rest, rest }
    }
    return null
}

/**
 * Un nom respecte-t-il l'échelle de sa famille ?
 * Retourne `null` si c'est conforme, sinon le motif de la violation.
 */
export function checkScale(name, families = SCALE_BY_FAMILY) {
    const parts = decompose(name, families)
    if (!parts) return null // famille sans échelle déclarée : hors périmètre
    const { family, role, step } = parts
    const scale = families.get(family)

    // Rôle seul : aucun pas ne doit être attaché.
    if (scale.stepType === 'role-seul') {
        return step === null
            ? null
            : `la famille « ${family} » est à rôle seul : « ${name} » porte un pas « ${step} »`
    }

    if (step === null) {
        // Un rôle sans pas est valide : le pas est alors implicite
        // (`--mr-shadow-raised`, `--mr-spinner-size`). C'est un nom sans pas
        // NI rôle qui est incomplet — la famille en a plusieurs et n'en
        // désigne aucun.
        if (role !== null) return null
        return scale.steps.length === 1
            ? null
            : `la famille « ${family} » a ${scale.steps.length} pas : « ${name} » n'en porte aucun`
    }
    if (!scale.steps.includes(step)) {
        return (
            `pas « ${step} » hors liste pour la famille « ${family} » ` +
            `(attendu : ${scale.steps.join(', ')})`
        )
    }
    void role
    return null
}

/** Toutes les violations d'échelle d'un ensemble de noms. */
export function checkScales(names, families = SCALE_BY_FAMILY) {
    const out = []
    for (const name of names) {
        const reason = checkScale(name, families)
        if (reason) out.push({ name, reason })
    }
    return out
}

/**
 * Une famille donnée respecte-t-elle son propre plafond ?
 * Séparé de `checkScale` : un dépassement est un défaut de la déclaration,
 * pas du nom d'un token. Testé sur la déclaration elle-même.
 */
export function checkCap(family, families = SCALE_BY_FAMILY) {
    const scale = families.get(family)
    if (!scale) return null
    if (scale.stepType === 'role-seul' && scale.steps.length > 0) {
        return `la famille « ${family} » est à rôle seul mais déclare ${scale.steps.length} pas`
    }
    if (scale.steps.length > scale.cap) {
        return `la famille « ${family} » déclare ${scale.steps.length} pas pour un plafond de ${scale.cap}`
    }
    const doublons = scale.steps.filter((s, i) => scale.steps.indexOf(s) !== i)
    if (doublons.length) {
        return `la famille « ${family} » déclare des pas en double : ${[...new Set(doublons)].join(', ')}`
    }
    return null
}
