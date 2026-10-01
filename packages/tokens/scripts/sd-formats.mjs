/**
 * Phase 2a — formats personnalisés Style Dictionary v4 + build programmé.
 * Les émetteurs lisent les JSON DTCG de `src/` (ordre des fichiers conservé).
 */
import { cssName, declOf, eachLeaf, THEMES } from './lib/tokens-lib.mjs'
import {
    DEFAULT_THEME,
    SYSTEM_FALLBACK_THEME,
    selectorFor,
    systemFallbackSelector,
    themeFileMap,
} from './lib/themes.mjs'

const HEADER = '/* GENERE — ne pas modifier. Source : packages/tokens/src/*.json (DTCG). */'

function block(selector, entries) {
    return `${selector} {\n${entries.map(([n, v]) => `  ${n}: ${v};`).join('\n')}\n}`
}

function collect(sources) {
    const root = []
    const rootBrand = []
    // Les thèmes viennent du disque (étape 0.13), pas d'une liste en dur.
    const themes = new Map(THEMES.map((t) => [`theme-${t}`, []]))
    const compact = []
    const media640 = []
    const reduced = []
    const studio = []
    const push = (file, segs, leaf) => {
        const { scope, name } = cssName(segs)
        const cssProp = name === '--mr-color-scheme' ? 'color-scheme' : name
        const target =
            scope === 'root' && leaf.$extensions?.['com.monority.scope'] === 'root-brand'
                ? rootBrand
                : scope === 'root'
                  ? root
                  : scope.startsWith('theme-')
                    ? (themes.get(scope) ??
                      (() => {
                          throw new Error(
                              `Portée « ${scope} » sans fichier de thème correspondant dans src/themes/.`
                          )
                      })())
                    : scope === 'density-compact'
                      ? compact
                      : scope === 'media-max640'
                        ? media640
                        : scope === 'motion-reduced'
                          ? reduced
                          : studio
        target.push([cssProp, declOf(leaf), file])
    }
    for (const f of ['primitives.json', 'core.json', 'components.json']) {
        eachLeaf(sources[f], (segs, leaf) => push(f, segs, leaf))
    }
    // Les fichiers de thèmes viennent du disque (étape 0.13), triés pour un
    // ordre déterministe. Ajouter un thème = ajouter un fichier.
    for (const f of themeFileMap().map(([path]) => path)) {
        eachLeaf(sources[f], (segs, leaf) => push(f, segs, leaf))
    }
    eachLeaf(sources['density.json'], (segs, leaf) => push('density.json', segs, leaf))
    eachLeaf(sources['brand-studio.json'], (segs, leaf) => push('brand-studio.json', segs, leaf))
    return { root, rootBrand, themes, compact, media640, reduced, studio }
}

const stripFile = (entries) => entries.map(([n, v]) => [n, v])

/** Vrai si la valeur gèle une var de marque ou un token de thème (substitution
 *  faite à la déclaration : un sous-arbre [data-brand] sans [data-theme]
 *  hériterait sinon la valeur calculée de l'ancêtre). */
function isBrandDependent(value, themeNames) {
    const v = String(value)
    if (/var\(--mr-(?:brand|neutral)-/.test(v)) return true
    for (const m of v.matchAll(/var\((--mr-[\w-]+)\)/g)) {
        if (themeNames.has(m[1])) return true
    }
    return false
}

/** Sélecteur + variantes [data-brand] (même élément : spécificité 0,2,0 —
 *  gagne contre le bloc de base 0,1,0 à valeurs identiques ; et descendant).
 *  Limite connue : thèmes imbriqués + marque sur l'élément interne partagent
 *  la même spécificité (ordre source) — cas non supporté par ailleurs. */
function withBrandScope(selector) {
    return selector
        .split(',\n')
        .flatMap((s) => [`${s}[data-brand]`, `${s} [data-brand]`])
        .join(',\n')
}

export function emitTokensCss(sources) {
    const { root, rootBrand, themes, compact, media640, reduced, studio } = collect(sources)
    const themeNames = new Set()
    for (const list of themes.values()) for (const [n] of list) themeNames.add(n)
    const brandDep = (list) => list.filter(([, v]) => isBrandDependent(v, themeNames))
    const rootDep = brandDep(root)
    // Sélecteurs dérivés du disque : `light` est le défaut (`:root`), `dark` est
    // le repli système et garde l'alias historique `dim`.
    if (!THEMES.includes(DEFAULT_THEME)) {
        throw new Error(
            `Thème par défaut « ${DEFAULT_THEME} » absent de src/themes/. Le CSS généré serait sans :root.`
        )
    }
    if (!THEMES.includes(SYSTEM_FALLBACK_THEME)) {
        throw new Error(
            `Thème de repli système « ${SYSTEM_FALLBACK_THEME} » absent de src/themes/.`
        )
    }
    const themeSels = THEMES.map((name) => [
        selectorFor(name, { withRoot: true }),
        themes.get(`theme-${name}`),
    ])
    const parts = [
        HEADER,
        '',
        block(':root', stripFile(root)),
        '',
        block(':root,\n[data-theme],\n[data-brand]', stripFile(rootBrand)),
        '',
    ]
    for (const [sel, list] of themeSels) {
        parts.push(block(sel, stripFile(list)), '')
        const dep = brandDep(list)
        if (dep.length) parts.push(block(withBrandScope(sel), stripFile(dep)), '')
    }
    if (rootDep.length) parts.push(block('[data-brand]', stripFile(rootDep)), '')
    parts.push(
        '@media (prefers-color-scheme: dark) {',
        indent(
            block(
                systemFallbackSelector(SYSTEM_FALLBACK_THEME),
                stripFile(themes.get(`theme-${SYSTEM_FALLBACK_THEME}`))
            )
        ),
        '}',
        ''
    )
    {
        const dep = brandDep(themes.get(`theme-${SYSTEM_FALLBACK_THEME}`))
        if (dep.length)
            parts.push(
                '@media (prefers-color-scheme: dark) {',
                indent(
                    block(
                        withBrandScope(systemFallbackSelector(SYSTEM_FALLBACK_THEME)),
                        stripFile(dep)
                    )
                ),
                '}',
                ''
            )
    }
    parts.push(
        block('[data-brand="studio"]', stripFile(studio)),
        '',
        block('[data-density="compact"]', stripFile(compact)),
        '',
        '@media (max-width: 640px) {',
        indent(block(':root', stripFile(media640))),
        '}',
        '',
        '@media (prefers-reduced-motion: reduce) {',
        indent(block(':root', stripFile(reduced))),
        '}',
        ''
    )
    return parts.join('\n')
}

const indent = (s) =>
    s
        .split('\n')
        .map((l) => '  ' + l)
        .join('\n')

/** Alias déprécié : références token→token, gelées par héritage dans les
 *  sous-arbres [data-brand]/[data-density] sans [data-theme]. On les redéclare
 *  dans ces contextes (mêmes valeurs, re-substitution locale). Les surcharges
 *  par thème reçoivent en plus les variantes combinées. */
function withAliasScope(sel) {
    if (sel === ':root, [data-theme]') return ':root, [data-theme], [data-brand], [data-density]'
    return [
        sel,
        `${sel}[data-brand]`,
        `${sel} [data-brand]`,
        `${sel}[data-density]`,
        `${sel} [data-density]`,
        `${sel}[data-brand][data-density]`,
        `${sel} [data-brand][data-density]`,
    ].join(', ')
}

export function emitDeprecatedCss(sources) {
    const groups = new Map() // selector -> [[name, value]]
    eachLeaf(sources['deprecated.json'], (segs, leaf) => {
        const raw = segs.slice(1).join('-')
        const name = '--mr-' + raw.split('~')[0]
        const sel = withAliasScope(
            leaf.$extensions?.['com.monority.deprecated']?.selector ?? ':root, [data-theme]'
        )
        if (!groups.has(sel)) groups.set(sel, [])
        groups.get(sel).push([name, leaf.$value])
    })
    const parts = [HEADER, '']
    for (const [sel, entries] of groups) {
        parts.push(block(sel, entries), '')
    }
    return parts.join('\n')
}

export function emitDts(sources) {
    const names = new Set()
    for (const f of [
        'primitives.json',
        'core.json',
        'components.json',
        ...themeFileMap().map(([path]) => path),
        'density.json',
        'brand-studio.json',
    ]) {
        eachLeaf(sources[f], (segs) => {
            const { name } = cssName(segs)
            if (name.startsWith('--mr-')) names.add(name)
        })
    }
    const sorted = [...names].sort()
    return (
        `${HEADER}\n` +
        `/** Noms de tokens du système (référence v4). Total : ${sorted.length}. */\n` +
        `export type TokenName =\n${sorted.map((n) => `    | '${n}'`).join('\n')};\n`
    )
}
