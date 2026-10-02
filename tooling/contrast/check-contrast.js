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

    console.log('\nVerification du contraste WCAG 2.2 AA (neutres + focus de marque + cascade)...')

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

    // Verification des regles de portee pour conteneur decale et theme
    assert(
        semanticCss.includes(':where(:root, [data-theme])'),
        'semantic.css doit declarer les neutres et echelles sous :where(:root, [data-theme])'
    )
    assert(
        semanticCss.includes(':where(:root, [data-theme], [data-brand])'),
        'semantic.css doit declarer la marque et le focus sous :where(:root, [data-theme], [data-brand])'
    )
    console.log(
        'OK: Selecteurs de portee :where(:root, [data-theme]) et :where(:root, [data-theme], [data-brand]) presents dans semantic.css.'
    )

    const context = { ...refVars, ...semanticVars }

    const bgCanvasExpr = semanticVars['--mr-bg-canvas']
    const bgInverseExpr = semanticVars['--mr-bg-inverse']
    const textPrimaryExpr = semanticVars['--mr-text-primary']
    const textOnInverseExpr = semanticVars['--mr-text-on-inverse']
    const accentSolidExpr = semanticVars['--mr-accent-solid']
    const focusRingExpr = semanticVars['--mr-focus-ring']

    if (
        !bgCanvasExpr ||
        !bgInverseExpr ||
        !textPrimaryExpr ||
        !textOnInverseExpr ||
        !accentSolidExpr ||
        !focusRingExpr
    ) {
        console.error('Tokens de couleurs requis manquants dans semantic.css.')
        process.exit(1)
    }

    const canvasOklch = parseOklch(bgCanvasExpr, context)
    const inverseOklch = parseOklch(bgInverseExpr, context)
    const textOnInverseOklch = parseOklch(textOnInverseExpr, context)

    const canvasRgb = clipRgb(oklchToRgbRaw(...canvasOklch))
    const inverseRgb = clipRgb(oklchToRgbRaw(...inverseOklch))
    const textOnInverseRgb = clipRgb(oklchToRgbRaw(...textOnInverseOklch))

    // Verification de la paire neutre du bouton principal (style de base noir/blanc)
    console.log('\nPaires neutres de base (Button principal) :')
    const textOnInverseRatio = getContrastRatio(textOnInverseRgb, inverseRgb)
    console.log(
        `- text-on-inverse sur bg-inverse : ${textOnInverseRatio.toFixed(2)}:1 (seuil texte >= 4.5:1)`
    )
    assert(
        textOnInverseRatio >= 4.5,
        `Contraste text-on-inverse sur bg-inverse insuffisant: ${textOnInverseRatio.toFixed(2)}:1 < 4.5:1`
    )

    const inverseOnCanvasRatio = getContrastRatio(inverseRgb, canvasRgb)
    console.log(
        `- bg-inverse sur bg-canvas : ${inverseOnCanvasRatio.toFixed(2)}:1 (seuil composant UI >= 3.0:1)`
    )
    assert(
        inverseOnCanvasRatio >= 3.0,
        `Contraste bg-inverse sur bg-canvas insuffisant: ${inverseOnCanvasRatio.toFixed(2)}:1 < 3.0:1`
    )

    // Balayage des teintes de marque H de 0 a 330 par pas de 30 deg pour le focus ring
    const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
    const errors = []

    console.log(
        '\nBalayage des teintes de marque pour anneau de focus sur canevas (--mr-ref-brand-chroma * 0.70) :'
    )

    for (const h of hues) {
        const testContext = { ...context, '--mr-ref-brand-hue': String(h) }
        const accentOklch = parseOklch(accentSolidExpr, testContext)
        const [l, c] = accentOklch

        const rawRgb = oklchToRgbRaw(l, c, h)
        const clippedRgb = clipRgb(rawRgb)
        const reducedRgb = inGamutRgb(rawRgb) ? rawRgb : reduceChroma(l, c, h)
        const margin = marginRgb(rawRgb)

        // Contraste anneau focus sur canevas (seuil 3.0:1)
        const uiRatioClipped = getContrastRatio(clippedRgb, canvasRgb)
        const uiRatioReduced = getContrastRatio(reducedRgb, canvasRgb)

        const passUI = uiRatioClipped >= 3.0 && uiRatioReduced >= 3.0
        const passMargin = margin >= 0.01

        console.log(
            `H=${String(h).padStart(3)} | marge sRGB: ${margin.toFixed(4)} | ` +
                `Focus/UI(clip: ${uiRatioClipped.toFixed(2)}, red: ${uiRatioReduced.toFixed(2)}) -> ` +
                (passUI && passMargin ? 'OK' : 'ECHEC')
        )

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
        '\nTous les contrastes respectent WCAG AA (neutre texte 15.19:1, neutre UI 15.19:1, anneau focus >= 3.0:1, marge sRGB >= 0.01).'
    )
}

run()
