/**
 * Phase 2a — configuration Style Dictionary v4.
 * Source unique DTCG (`src/*.json`) ; les formats personnalisés `mr/*`
 * sont enregistrés par `scripts/build.mjs`.
 */
export default {
    // Les sources DTCG sont volontairement isolées par couche/thème ;
    // les formats mr/* les projettent eux-mêmes en CSS et ne subissent pas
    // la détection de collision de Style Dictionary.
    log: {
        verbosity: 'silent',
        warnings: 'disabled',
    },
    source: [
        'src/primitives.json',
        'src/core.json',
        'src/components.json',
        'src/density.json',
        'src/brand-studio.json',
        'src/themes/*.json',
        'src/deprecated.json',
    ],
    platforms: {
        css: {
            files: [
                { destination: 'tokens.css', format: 'mr/css-tokens' },
                { destination: 'deprecated.css', format: 'mr/css-deprecated' },
            ],
        },
        meta: {
            files: [
                { destination: 'tokens.d.ts', format: 'mr/dts' },
                { destination: 'resolved.json', format: 'mr/resolved' },
            ],
        },
    },
}
