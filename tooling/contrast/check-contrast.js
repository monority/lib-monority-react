import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
    clipRgb,
    getContrastRatio,
    inGamutRgb,
    marginRgb,
    oklchToRgbRaw,
    parseCssVariables,
    parseOklch,
    reduceChroma,
} from './contrast-checker.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')

// 1. Preuve en negatif : verifier qu'une paire invalide sous le seuil echoue
function testNegativeProof() {
    console.log('Preuve en negatif du test de contraste...')
    const invalidTextColor = [0.8, 0.8, 0.8] // gris clair
    const invalidBgColor = [1, 1, 1] // blanc
    const ratio = getContrastRatio(invalidTextColor, invalidBgColor)
    assert(
        ratio < 4.5,
        `Le ratio ${ratio.toFixed(2)} doit etre inferieur au seuil 4.5 pour la preuve negative`
    )
    console.log(
        `OK: Preuve en negatif reussie (ratio invalide ${ratio.toFixed(2)}:1 detecte < 4.5:1).`
    )
}

// 2. Verification des contrastes reels depuis les fichiers CSS
function run() {
    testNegativeProof()

    console.log(
        '\nVerification du contraste WCAG 2.2 AA (ecretage + reduction CSS Color 4 + balayage de marque)...'
    )

    const refPath = path.join(ROOT, 'packages/styles/src/tokens/ref.css')
    const semanticPath = path.join(ROOT, 'packages/styles/src/tokens/semantic.css')

    if (!fs.existsSync(semanticPath) || !fs.existsSync(refPath)) {
        console.error('Fichiers de tokens introuvables.')
        process.exit(1)
    }

    const refCss = fs.readFileSync(refPath, 'utf8')
    const refVars = parseCssVariables(refCss)

    const semanticCss = fs.readFileSync(semanticPath, 'utf8')
    const semanticVars = parseCssVariables(semanticCss)

    const context = { ...refVars, ...semanticVars }

    const accentSolidExpr = semanticVars['--mr-accent-solid']
    const accentOnSolidExpr = semanticVars['--mr-accent-on-solid']
    const bgCanvasExpr = semanticVars['--mr-bg-canvas']
    const focusRingExpr = semanticVars['--mr-focus-ring']

    if (!accentSolidExpr || !accentOnSolidExpr || !bgCanvasExpr || !focusRingExpr) {
        console.error('Tokens de couleurs requis manquants dans semantic.css.')
        process.exit(1)
    }

    const canvasOklch = parseOklch(bgCanvasExpr, context)
    const onSolidOklch = parseOklch(accentOnSolidExpr, context)

    const canvasRgb = clipRgb(oklchToRgbRaw(...canvasOklch))
    const onSolidRgb = clipRgb(oklchToRgbRaw(...onSolidOklch))

    // Balayage des teintes de marque H de 0 a 330 par pas de 30 deg
    const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
    const errors = []

    console.log('Balayage des teintes de marque (--mr-ref-brand-chroma * 0.70) :')

    for (const h of hues) {
        const testContext = { ...context, '--mr-ref-brand-hue': String(h) }
        const accentOklch = parseOklch(accentSolidExpr, testContext)
        const [l, c] = accentOklch

        const rawRgb = oklchToRgbRaw(l, c, h)
        const clippedRgb = clipRgb(rawRgb)
        const reducedRgb = inGamutRgb(rawRgb) ? rawRgb : reduceChroma(l, c, h)
        const margin = marginRgb(rawRgb)

        // Contraste texte blanc sur fond accent (seuil 4.5:1)
        const textRatioClipped = getContrastRatio(onSolidRgb, clippedRgb)
        const textRatioReduced = getContrastRatio(onSolidRgb, reducedRgb)

        // Contraste anneau focus sur canevas (seuil 3.0:1)
        const uiRatioClipped = getContrastRatio(clippedRgb, canvasRgb)
        const uiRatioReduced = getContrastRatio(reducedRgb, canvasRgb)

        const passText = textRatioClipped >= 4.5 && textRatioReduced >= 4.5
        const passUI = uiRatioClipped >= 3.0 && uiRatioReduced >= 3.0
        const passMargin = margin >= 0.01

        console.log(
            `H=${String(h).padStart(3)} | marge sRGB: ${margin.toFixed(4)} | ` +
                `Texte(clip: ${textRatioClipped.toFixed(2)}, red: ${textRatioReduced.toFixed(2)}) | ` +
                `Focus/UI(clip: ${uiRatioClipped.toFixed(2)}, red: ${uiRatioReduced.toFixed(2)}) -> ` +
                (passText && passUI && passMargin ? 'OK' : 'ECHEC')
        )

        if (!passText) {
            errors.push(`H=${h}: Contraste texte blanc sur accent insuffisant (< 4.5:1)`)
        }
        if (!passUI) {
            errors.push(`H=${h}: Contraste anneau de focus sur canevas insuffisant (< 3.0:1)`)
        }
        if (!passMargin) {
            errors.push(`H=${h}: Marge sRGB insuffisante (< 0.01)`)
        }
    }

    if (errors.length > 0) {
        console.error('\nECHEC DU TEST DE CONTRASTE :')
        for (const err of errors) console.error(`- ${err}`)
        process.exit(1)
    }

    console.log(
        '\nTous les balayages de teinte respectent WCAG AA (texte >= 4.5:1, UI >= 3.0:1, marge sRGB >= 0.01).'
    )
}

run()
