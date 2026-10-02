import stylelint from 'stylelint'

const ruleName = 'monority/no-raw-values'
const messages = stylelint.utils.ruleMessages(ruleName, {
    rejected: (prop, value, reason) =>
        `Valeur brute interdite "${value}" pour "${prop}" (${reason}). Utilisez un token --mr-* (exceptions autorisees: 0, 1px, 2px, pourcentages).`,
})

function isExemptFile(filePath) {
    if (!filePath) return false
    const normalized = filePath.replace(/\\/g, '/')
    if (normalized.includes('/tokens/') || normalized.includes('tokens/')) return true
    if (normalized.includes('/themes/') || normalized.includes('themes/')) return true
    return false
}

function findRawValue(value) {
    let stripped = value
    let prev
    do {
        prev = stripped
        stripped = stripped.replace(/var\([^()]+\)/g, '')
    } while (stripped !== prev)

    // 1. Couleurs hex
    const hexMatch = stripped.match(/#[0-9a-fA-F]{3,8}\b/)
    if (hexMatch) {
        return { value: hexMatch[0], reason: 'couleur hexadecimale' }
    }

    // 2. Fonctions de couleur
    const colorFnMatch = stripped.match(/\b(oklch|rgb|rgba|hsl|hsla|color)\s*\(/i)
    if (colorFnMatch) {
        return { value: colorFnMatch[0], reason: 'fonction couleur brute' }
    }

    // 3. Dimensions et durees avec unites (sauf 0, 1px, 2px, pourcentages)
    const unitMatches = stripped.matchAll(
        /(?<![a-zA-Z-])(?:\d*\.)?\d+(px|rem|em|ms|s|vh|vw|ch)\b/gi
    )
    for (const m of unitMatches) {
        const raw = m[0].toLowerCase()
        if (
            raw === '0px' ||
            raw === '1px' ||
            raw === '2px' ||
            raw === '0rem' ||
            raw === '0em' ||
            raw === '0s' ||
            raw === '0ms'
        ) {
            continue
        }
        return { value: m[0], reason: 'dimension ou duree sans token' }
    }

    return null
}

const ruleFunction = (primaryOption) => {
    return (root, result) => {
        if (!primaryOption) return

        const filePath = root.source?.input?.file
        if (isExemptFile(filePath)) {
            return
        }

        root.walkDecls((decl) => {
            const raw = findRawValue(decl.value)
            if (raw) {
                stylelint.utils.report({
                    message: messages.rejected(decl.prop, raw.value, raw.reason),
                    node: decl,
                    result,
                    ruleName,
                })
            }
        })
    }
}

ruleFunction.ruleName = ruleName
ruleFunction.messages = messages

export default stylelint.createPlugin(ruleName, ruleFunction)
