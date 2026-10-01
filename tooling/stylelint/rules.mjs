/**
 * Règles maison Monority, branchées sur Stylelint.
 *
 * Stylelint couvre le mécanique (noms, motifs, spécificité, `!important`,
 * propriétés physiques). Ces deux règles couvrent ce qu'il ne sait pas faire :
 * la liste fermée de littéraux autorisés (ROADMAP §5.1) et le périmètre de
 * portée (ROADMAP §4.5 : rien hors des éléments `mr-*`).
 *
 * Chacune est testée en négatif dans `rules.test.mjs` : une règle qui cesse de
 * détecter doit casser, sinon elle ne protège rien.
 */
import stylelint from 'stylelint'

/**
 * §5.1 — liste fermée de littéraux autorisés.
 * Tout le reste : couleur, longueur, durée, courbe, z-index, ombre → refusé.
 */
const ALLOWED_KEYWORDS = new Set([
    '0',
    'none',
    'auto',
    'inherit',
    'initial',
    'unset',
    'currentcolor',
    'transparent',
    '100%',
    '50%',
    '1fr',
    'min-content',
    'max-content',
    'fit-content',
    'flex',
    'grid',
    'inline',
    'block',
    'normal',
    'bold',
    'center',
])

/** Elément exempté : une variable custom contient une valeur brute par nature. */
const isCustomProperty = (prop) => prop.startsWith('--')

const hasHardValue = (value) => {
    if (/^var\(--[\w-]+\)$/.test(value.trim())) return false
    // calc() n'est toléré que s'il ne combine que des tokens et 0/1/100 %
    const calcOnly = (text) => {
        const inner = text.replace(/^calc\(|\)$/g, '')
        return /(^|[\s+\-*/])var\(--[\w-]+\)([\s+\-*/]|$)/.test(inner)
    }
    if (/^calc\(/.test(value.trim()) && calcOnly(value.trim())) return false
    if (value.trim().toLowerCase().startsWith('var(')) return false

    // 1px et 2px sont admis : ce sont des traits de bordure et des demi-pas.
    const stripped = value.replace(/\b[12]px\b/g, ' ')
    // 0 / 1 sans unité sont logiques (flex, opacity)
    const cleaned = stripped.replace(/(?<![\w.-])[01](?![\w.%])/g, ' ')
    const words = cleaned
        .toLowerCase()
        .split(/[\s,()/]+/)
        .filter(Boolean)
    const literals = words.filter((w) => !ALLOWED_KEYWORDS.has(w))

    return literals.some((w) =>
        /^(#|rgba?\(|hsla?\(|oklch\(|oklab\(|lab\(|lch\(|color\(|color-mix\(|[+-]?[\d.]+(?:px|rem|em|ch|ex|vh|vw|vmin|vmax|pt|cm|mm|in|ms|s|deg|rad|turn|fr)|calc\(|\d+)/i.test(
            w
        )
    )
}

export const noHardValue = stylelint.createPlugin('mr/no-hard-value', (primary) => {
    return (root, result) => {
        const validOptions = stylelint.utils.validateOptions(result, 'mr/no-hard-value', {
            actual: primary,
            possible: [true, false],
        })
        if (!validOptions || !primary) return

        root.walkDecls((decl) => {
            if (isCustomProperty(decl.prop)) return
            if (!hasHardValue(decl.value)) return
            stylelint.utils.report({
                result,
                ruleName: 'mr/no-hard-value',
                node: decl,
                word: decl.value,
                message:
                    `Valeur en dur interdite (ROADMAP §5.1) : « ${decl.value.trim()} » sur « ${decl.prop} ». ` +
                    'Seuls les littéraux de la liste fermée sont autorisés ; le reste passe par un token --mr-*.',
            })
        })
    }
})

/**
 * §4.5 — aucun sélecteur global hors du périmètre `mr-*`.
 *
 * Autorisé : sélecteurs qui contiennent `.mr-*`, `[data-mr]`, une classe
 * d'utilitaire `mr-`, `:root`, ou un pseudo qui reste dans le composant.
 * Refusé : `html`, `body`, `*`, un élément nu, ou une classe non préfixée.
 */
const SCOPED = /(\.mr-[a-z0-9-]+|\[data-mr|^:root|:root\b|\.mr-)/
const BARE_ELEMENT =
    /^(html|body|\*|h[1-6]|p|a|ul|ol|li|table|input|button|select|textarea|form|section|div|span)$/i

export const noGlobalSelector = stylelint.createPlugin('mr/no-global-selector', (primary) => {
    return (root, result) => {
        const validOptions = stylelint.utils.validateOptions(result, 'mr/no-global-selector', {
            actual: primary,
            possible: [true, false],
        })
        if (!validOptions || !primary) return

        root.walkRules((rule) => {
            if (
                rule.parent &&
                rule.parent.type === 'atrule' &&
                /keyframes$/i.test(rule.parent.name)
            )
                return
            const parts = rule.selector
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
            for (const part of parts) {
                if (SCOPED.test(part)) continue
                const compounds = part.split(/\s+|>/).filter(Boolean)
                const bad = compounds.filter((c) => {
                    const bare = c.replace(/::?[a-z-]+(\([^)]*\))?/gi, '').replace(/\[.*?\]/g, '')
                    return BARE_ELEMENT.test(bare)
                })
                if (!bad.length) continue
                stylelint.utils.report({
                    result,
                    ruleName: 'mr/no-global-selector',
                    node: rule,
                    word: part,
                    message:
                        `Sélecteur hors périmètre (ROADMAP §4.5) : « ${part} ». ` +
                        'La library ne style pas l’hôte : scopez la règle sur un élément mr-* ou [data-mr].',
                })
            }
        })
    }
})

export const rules = [noHardValue, noGlobalSelector]
export default rules
