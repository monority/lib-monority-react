/**
 * Configuration Stylelint du monorepo — ROADMAP §5 et §6.
 *
 * Les règles sont écrites explicitement plutôt qu'héritées de
 * `stylelint-config-standard` : le ROADMAP nomme les règles qui comptent, et
 * une config standard en ajoute des dizaines d'autres quiarnseraient ici des
 * hundreds de messages sans rapport avec le chantier.
 *
 * Les fichiers générés sont exclus : leur format est imposé par le générateur
 * de tokens et vérifié par T1, pas par le linter.
 */
import { rules } from './tooling/stylelint/rules.mjs'

export default {
    plugins: rules,
    rules: {
        // --- Nommage (§5.2) ---
        // Deux formes acceptées :
        //   primitif (D11)  --mr-ref-<rôle>(-<variante>)*
        //   global          --mr-<catégorie>-<rôle>(-<variante>)+
        // Les tokens locaux portent le même préfixe mais sont déclarés dans le
        // registre `local-tokens` avec leur justification.
        //
        // ATTENTION Stylelint 16 : `custom-property-pattern` matche le nom de
        // propriété **sans** les deux tirets de `--`. Un motif qui les inclut ne
        // peut jamais matcher. Vérifié sur stylelint 16.26.1.
        // Groupes non capturants : Stylelint n'utilise que le premier groupe
        // capturant d'une regex, une alternance enveloppée matcherait à tort.
        'custom-property-pattern':
            '^(?:mr-ref-[a-z0-9]+(?:-[a-z0-9]+)*|mr-(?:bg|text|border|accent|tonal|status|scrim|chart|spacing|radius|border-width|focus|control-height|icon-size|font-[a-z]+|line-height|letter-spacing|duration|easing|shadow|z-index|opacity|container|breakpoint|density|brand)(?:-[a-z0-9]+)+)$',
        'selector-class-pattern': [
            '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
            { message: 'classe en kebab-case' },
        ],

        // --- Valeurs en dur (§5.1) — règle maison ---
        'mr/no-hard-value': true,
        'mr/no-global-selector': true,

        // --- Propriétés physiques interdites (RTL natif, §4.6) ---
        // La forme est un tableau de noms de propriétés ; le motif
        // « propriété → raison » n'existe pas pour cette règle.
        'property-disallowed-list': [
            [
                'margin-left',
                'margin-right',
                'padding-left',
                'padding-right',
                'left',
                'right',
                'border-top-left-radius',
                'border-top-right-radius',
                'border-bottom-left-radius',
                'border-bottom-right-radius',
            ],
            {
                message:
                    'propriété physique interdite : le RTL est natif (§4.6). ' +
                    'Utiliser margin-inline-start, padding-inline-end, inset-inline-start, ' +
                    'border-start-start-radius…',
            },
        ],

        // --- Structure ---
        'declaration-no-important': [
            true,
            { message: 'aucun !important hors forced-colors / reduced-motion' },
        ],
        'no-descending-specificity': true,
        'declaration-block-no-duplicate-properties': true,
        'block-no-empty': true,
        'color-no-invalid-hex': true,
        'no-duplicate-selectors': true,
    },
    overrides: [
        {
            files: ['**/tokens/generated/**', 'docs/design/reference/**'],
            rules: { 'mr/no-hard-value': null, 'custom-property-pattern': null },
        },
    ],
    ignoreFiles: [
        '**/dist/**',
        '**/node_modules/**',
        '**/.next/**',
        'packages/styles/src/tokens/generated/**',
        'docs/design/reference/**',
        'apps/web/test-results/**',
        'playwright-report/**',
    ],
}
