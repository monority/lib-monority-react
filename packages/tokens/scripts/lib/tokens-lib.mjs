/** Phase 2a — lib partagée des tokens (DTCG → CSS / résolus / contrôles).
 * Zéro dépendance d'exécution (colorjs.io : devDependency de @monority/tokens,
 * utilisée par les scripts de contrôle et de génération uniquement).
 * Toutes les valeurs viennent des JSON de `src/`.
 */
import fs from 'node:fs'
import path from 'node:path'
import Color from 'colorjs.io'

export const BRANDS = {
    monority: { brandHue: 200, brandChroma: 0.12, neutralHue: 215 },
    studio: { brandHue: 85, brandChroma: 0.1, neutralHue: 250 },
}
export const THEMES = ['light', 'dark', 'oled', 'ocean', 'night', 'high-contrast']
export const DENSITIES = ['comfortable', 'compact']
export const BRAND_NAMES = ['monority', 'studio']

const num = (v) => {
    if (Number.isInteger(v)) return String(v)
    return String(Math.round(v * 10000) / 10000)
}

/** Formule oklch() depuis l'extension, pour une marque donnée (CSS var). */
export function oklchDecl(ext) {
    const l = num(ext.l)
    const c = typeof ext.c === 'number' ? num(ext.c) : `calc(var(--mr-brand-chroma) * ${num(ext.c.factor)})`
    const h = ext.h === 'brand' ? 'var(--mr-brand-hue)' : ext.h === 'neutral' ? 'var(--mr-neutral-hue)' : num(ext.h)
    return `oklch(${l} ${c} ${h})`
}

/** Couleur résolue (l, c, h numériques) pour marque × thème. */
export function resolveOklch(ext, brand) {
    const b = BRANDS[brand]
    const c = typeof ext.c === 'number' ? ext.c : b.brandChroma * ext.c.factor
    const h = ext.h === 'brand' ? b.brandHue : ext.h === 'neutral' ? b.neutralHue : ext.h
    return { l: ext.l, c, h }
}

// --- oklch → sRGB avec projection de gamme (CSS Color 4, via colorjs.io) ---
export function oklchToHex(l, c, h) {
    return new Color(`oklch(${l} ${c} ${h})`).to('srgb').toString({ format: 'hex' })
}

/** Contraste WCAG 2.1 entre deux couleurs CSS (hex ou oklch). */
export function contrast(a, b) {
    return new Color(a).contrast(new Color(b), 'WCAG21')
}

// --- lecture des sources DTCG ---
export function loadSources(srcDir) {
    const files = [
        'primitives.json',
        'core.json',
        'components.json',
        'density.json',
        'brand-studio.json',
        'themes/light.json',
        'themes/dark.json',
        'themes/oled.json',
        'themes/ocean.json',
        'themes/night.json',
        'themes/high-contrast.json',
        'deprecated.json',
    ]
    const out = {}
    for (const f of files) {
        out[f] = JSON.parse(fs.readFileSync(path.join(srcDir, f), 'utf8'))
    }
    return out
}

/** Nom CSS depuis un chemin DTCG (segments), avec routage des namespaces. */
export function cssName(segments) {
    const [ns, ...rest] = segments
    if (ns !== 'mr') throw new Error('racine attendue: mr')
    const head = rest[0]
    if (['theme-light', 'theme-dark', 'theme-oled', 'theme-ocean', 'theme-night', 'theme-high-contrast'].includes(head)) {
        return { scope: head, name: '--mr-' + rest.slice(1).join('-').split('~')[0] }
    }
    if (head === 'density-compact' || head === 'media-max640' || head === 'motion-reduced') {
        return { scope: head, name: '--mr-' + rest.slice(1).join('-').split('~')[0] }
    }
    if (head === 'brand-studio') {
        return { scope: head, name: '--mr-' + rest.slice(1).join('-').split('~')[0] }
    }
    return { scope: 'root', name: '--mr-' + rest.join('-').split('~')[0] }
}

const walk = (node, segs, cb) => {
    if (node && typeof node === 'object' && '$value' in node) {
        cb(segs, node)
        return
    }
    if (node && typeof node === 'object') {
        for (const k of Object.keys(node)) {
            if (k.startsWith('$')) continue
            walk(node[k], [...segs, k], cb)
        }
    }
}

/** Itère les feuilles DTCG d'un document chargé. */
export function eachLeaf(doc, cb) {
    walk(doc.mr, ['mr'], cb)
}

/** Déclaration CSS d'une feuille (formule oklch pour les couleurs à extension). */
export function declOf(leaf) {
    const ext = leaf.$extensions?.['com.monority.oklch']
    if (ext) return oklchDecl(ext)
    return leaf.$value
}
