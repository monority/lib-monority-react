/**
 * Phase 2a — valeurs résolues par combinaison thème × densité × marque.
 * Utilisé par resolved.json, le contrôle X2 et le critère S11.
 *
 * Deux lectures d'un même token couleur :
 * - `comboValue`  : rendu final (hex projeté pour l'affichage / S11) ;
 * - `comboOklch`  : source oklch non arrondie, pour les calculs de contraste
 *   (X2), qui doivent partir des sources DTCG et non du rendu 8 bits.
 */
import {
    BRAND_NAMES,
    DENSITIES,
    THEMES,
    cssName,
    eachLeaf,
    oklchToHex,
    resolveOklch,
} from './tokens-lib.mjs'
import { themeFileMap } from './themes.mjs'

export const comboKey = (theme, density, brand) => `${theme}.${density}.${brand}`

export function buildMaps(sources) {
    const rootRaw = new Map()
    const compactRaw = new Map()
    const studioPrim = new Map()
    // Les thèmes viennent du disque (étape 0.13), pas d'une liste en dur.
    const themeRaw = new Map(THEMES.map((t) => [t, new Map()]))
    const themeFile = Object.fromEntries(themeFileMap())
    for (const f of ['primitives.json', 'core.json', 'components.json']) {
        eachLeaf(sources[f], (segs, leaf) => {
            const { name } = cssName(segs)
            rootRaw.set(name, leaf)
        })
    }
    eachLeaf(sources['density.json'], (segs, leaf) => {
        const { scope, name } = cssName(segs)
        if (scope === 'density-compact') compactRaw.set(name, leaf)
    })
    eachLeaf(sources['brand-studio.json'], (segs, leaf) => {
        const { name } = cssName(segs)
        studioPrim.set(name, leaf)
    })
    for (const [f, theme] of Object.entries(themeFile)) {
        eachLeaf(sources[f], (segs, leaf) => {
            const { name } = cssName(segs)
            if (name.startsWith('--mr-')) themeRaw.get(theme).set(name, leaf)
        })
    }
    return { rootRaw, compactRaw, studioPrim, themeRaw }
}

/** Feuille DTCG applicable : thème > densité compact > primitive de marque > racine. */
function findLeaf(name, theme, density, brand, maps) {
    const { rootRaw, compactRaw, studioPrim, themeRaw } = maps
    if (themeRaw.get(theme)?.has(name)) return themeRaw.get(theme).get(name)
    if (density === 'compact' && compactRaw.has(name)) return compactRaw.get(name)
    if (brand === 'studio' && studioPrim.has(name)) return studioPrim.get(name)
    return rootRaw.get(name)
}

const VAR_RE = /var\((--mr-[\w-]+)\)/g

function normalizeLength(raw) {
    const s = raw.trim()
    const calc = s.match(/^calc\(\s*([\d.]+)px\s*\*\s*([\d.]+)\s*\)$/)
    if (calc) {
        const px = Math.round(Number.parseFloat(calc[1]) * Number.parseFloat(calc[2]) * 1000) / 1000
        return `${px}px`
    }
    const rem = s.match(/^([\d.]+)rem$/)
    if (rem) {
        const px = Math.round(Number.parseFloat(rem[1]) * 16 * 1000) / 1000
        return `${px}px`
    }
    return s
}

const num = (v) => (Number.isInteger(v) ? String(v) : String(Math.round(v * 10000) / 10000))

/**
 * Valeur oklch() non arrondie du token couleur (source DTCG), ou valeur
 * résolue pour les autres tokens. Rend `undefined` si le token n'existe pas.
 */
export function comboOklch(name, theme, density, brand, maps, depth = 0) {
    if (depth > 6) throw new Error(`référence circulaire: ${name}`)
    const leaf = findLeaf(name, theme, density, brand, maps)
    if (!leaf) return undefined
    const ext = leaf.$extensions?.['com.monority.oklch']
    if (ext) {
        const { l, c, h } = resolveOklch(ext, brand)
        return `oklch(${num(l)} ${num(c)} ${num(h)})`
    }
    let raw = leaf.$value
    if (VAR_RE.test(raw)) {
        VAR_RE.lastIndex = 0
        raw = raw.replace(VAR_RE, (m, ref) => {
            const v = comboOklch(ref, theme, density, brand, maps, depth + 1)
            if (v === undefined) throw new Error(`référence inconnue: ${ref} (depuis ${name})`)
            return v
        })
    }
    return raw
}

/** Valeur finale résolue (hex pour les couleurs, px pour les longueurs). */
export function comboValue(name, theme, density, brand, maps, depth = 0) {
    if (depth > 6) throw new Error(`référence circulaire: ${name}`)
    const leaf = findLeaf(name, theme, density, brand, maps)
    if (!leaf) return undefined
    const ext = leaf.$extensions?.['com.monority.oklch']
    if (ext) {
        const { l, c, h } = resolveOklch(ext, brand)
        return oklchToHex(l, c, h)
    }
    let raw = leaf.$value
    if (VAR_RE.test(raw)) {
        VAR_RE.lastIndex = 0
        raw = raw.replace(VAR_RE, (m, ref) => {
            const v = comboValue(ref, theme, density, brand, maps, depth + 1)
            if (v === undefined) throw new Error(`référence inconnue: ${ref} (depuis ${name})`)
            return v
        })
        return normalizeLength(raw)
    }
    return normalizeLength(raw)
}

export function allTokenNames(maps) {
    const names = new Set([...maps.rootRaw.keys()])
    for (const t of THEMES) for (const n of maps.themeRaw.get(t).keys()) names.add(n)
    return [...names].sort()
}

export function buildResolved(sources) {
    const maps = buildMaps(sources)
    const names = allTokenNames(maps)
    const combos = []
    const values = {}
    for (const theme of THEMES) {
        for (const density of DENSITIES) {
            for (const brand of BRAND_NAMES) {
                const key = comboKey(theme, density, brand)
                combos.push(key)
                values[key] = {}
                for (const n of names) {
                    values[key][n] = comboValue(n, theme, density, brand, maps)
                }
            }
        }
    }
    return { combos, names, values }
}
