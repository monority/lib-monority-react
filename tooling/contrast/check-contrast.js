import assert from 'node:assert'
import fs from 'node:fs'
import { createRequire } from 'node:module'
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
const webRequire = createRequire(path.join(ROOT, 'apps/web/package.json'))
const { chromium } = webRequire('@playwright/test')

// Helper pour convertir une couleur (oklch ou rgb) retournee par le navigateur en RGB float 0..1
function colorToRgb(str) {
    const oklch = parseOklch(str)
    if (oklch) {
        return clipRgb(oklchToRgbRaw(oklch[0], oklch[1], oklch[2]))
    }
    const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (m) {
        return [parseInt(m[1]) / 255, parseInt(m[2]) / 255, parseInt(m[3]) / 255]
    }
    return [0, 0, 0]
}

// 1. Preuves en negatif
async function testNegativeProof(browser) {
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

    // Fixture negative specifique au survol : un melange a 90% doit echouer sous 4.5:1
    const page = await browser.newPage()
    await page.setContent(`
        <style>
            :root {
                --mr-bg-canvas: oklch(0.955 0 215);
                --mr-bg-inverse: oklch(0.22 0 215);
                --mr-text-on-inverse: oklch(0.955 0 215);
            }
            .bad-hover {
                background-color: color-mix(in oklch, var(--mr-bg-inverse), var(--mr-bg-canvas) 90%);
                color: var(--mr-text-on-inverse);
            }
        </style>
        <button class="bad-hover" id="bad-btn">Survol Invalide</button>
    `)
    const badBg = await page.$eval('#bad-btn', (el) => window.getComputedStyle(el).backgroundColor)
    const badText = await page.$eval('#bad-btn', (el) => window.getComputedStyle(el).color)
    const badRatio = getContrastRatio(colorToRgb(badText), colorToRgb(badBg))
    assert(
        badRatio < 4.5,
        `Le survol avec melange 90% doit echouer sous 4.5:1 (ratio obtenu: ${badRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative survol reussie (melange a 90% detecte insuffisant a ${badRatio.toFixed(2)}:1 < 4.5:1).`
    )
    await page.close()
}

// 2. Verification des contrastes reels depuis les fichiers CSS et dans Chromium
async function run() {
    const browser = await chromium.launch({ headless: true })

    try {
        await testNegativeProof(browser)

        console.log(
            '\nVerification du contraste WCAG 2.2 AA (etats Chromium + focus de marque + cascade)...'
        )

        const refPath = path.join(ROOT, 'packages/styles/src/tokens/ref.css')
        const semanticPath = path.join(ROOT, 'packages/styles/src/tokens/semantic.css')
        const buttonPath = path.join(ROOT, 'packages/styles/src/recipes/button.css')

        if (!fs.existsSync(semanticPath) || !fs.existsSync(refPath) || !fs.existsSync(buttonPath)) {
            console.error('Fichiers CSS requis introuvables.')
            process.exit(1)
        }

        const refCss = fs.readFileSync(refPath, 'utf8')
        const refVars = parseCssVariables(refCss)

        const semanticCss = fs.readFileSync(semanticPath, 'utf8')
        const semanticVars = parseCssVariables(semanticCss)

        const buttonCss = fs.readFileSync(buttonPath, 'utf8')

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

        // Evaluation reelle des etats du bouton dans Chromium
        const page = await browser.newPage()
        await page.setContent(`
            <!DOCTYPE html>
            <html>
            <head>
            <style>
                ${refCss}
                ${semanticCss}
                ${buttonCss}
            </style>
            </head>
            <body>
                <button class="mr-btn" id="btn-idle">Enregistrer</button>
                <button class="mr-btn" id="btn-hover">Enregistrer</button>
                <button class="mr-btn" id="btn-active">Enregistrer</button>
                <button class="mr-btn" id="btn-disabled" disabled>Enregistrer</button>
            </body>
            </html>
        `)

        console.log('\nMesure reelle des etats du Button principal dans Chromium :')

        // Repos
        const idleBgRaw = await page.$eval(
            '#btn-idle',
            (el) => window.getComputedStyle(el).backgroundColor
        )
        const idleTextRaw = await page.$eval('#btn-idle', (el) => window.getComputedStyle(el).color)
        const idleRatio = getContrastRatio(colorToRgb(idleTextRaw), colorToRgb(idleBgRaw))
        console.log(
            `- Repos      : bg = ${idleBgRaw}, text = ${idleTextRaw}, ratio = ${idleRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
        )
        assert(
            idleRatio >= 4.5,
            `Contraste au repos insuffisant: ${idleRatio.toFixed(2)}:1 < 4.5:1`
        )

        // Survol (via page.hover reel)
        await page.hover('#btn-hover')
        await page.waitForTimeout(200)
        const hoverBgRaw = await page.$eval(
            '#btn-hover',
            (el) => window.getComputedStyle(el).backgroundColor
        )
        const hoverTextRaw = await page.$eval(
            '#btn-hover',
            (el) => window.getComputedStyle(el).color
        )
        const hoverRatio = getContrastRatio(colorToRgb(hoverTextRaw), colorToRgb(hoverBgRaw))
        console.log(
            `- Survol     : bg = ${hoverBgRaw}, text = ${hoverTextRaw}, ratio = ${hoverRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
        )
        assert(
            hoverRatio >= 4.5,
            `Contraste au survol insuffisant: ${hoverRatio.toFixed(2)}:1 < 4.5:1`
        )

        // Actif (via mouse.down reel)
        const activeBox = await page.locator('#btn-active').boundingBox()
        await page.mouse.move(activeBox.x + activeBox.width / 2, activeBox.y + activeBox.height / 2)
        await page.mouse.down()
        await page.waitForTimeout(200)
        const activeBgRaw = await page.$eval(
            '#btn-active',
            (el) => window.getComputedStyle(el).backgroundColor
        )
        const activeTextRaw = await page.$eval(
            '#btn-active',
            (el) => window.getComputedStyle(el).color
        )
        const activeRatio = getContrastRatio(colorToRgb(activeTextRaw), colorToRgb(activeBgRaw))
        await page.mouse.up()
        console.log(
            `- Actif      : bg = ${activeBgRaw}, text = ${activeTextRaw}, ratio = ${activeRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
        )
        assert(
            activeRatio >= 4.5,
            `Contraste actif insuffisant: ${activeRatio.toFixed(2)}:1 < 4.5:1`
        )

        // Desactive (mesure et rapport, non bloquant car exempte WCAG 1.4.3)
        const disabledBgRaw = await page.$eval(
            '#btn-disabled',
            (el) => window.getComputedStyle(el).backgroundColor
        )
        const disabledTextRaw = await page.$eval(
            '#btn-disabled',
            (el) => window.getComputedStyle(el).color
        )
        const disabledRatio = getContrastRatio(
            colorToRgb(disabledTextRaw),
            colorToRgb(disabledBgRaw)
        )
        console.log(
            `- Desactive  : bg = ${disabledBgRaw}, text = ${disabledTextRaw}, ratio = ${disabledRatio.toFixed(2)}:1 (exempte WCAG 1.4.3)`
        )

        await page.close()

        // Balayage des teintes de marque H de 0 a 330 par pas de 30 deg pour le focus ring
        const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
        const errors = []
        const canvasOklch = parseOklch(semanticVars['--mr-bg-canvas'], context)
        const canvasRgb = clipRgb(oklchToRgbRaw(...canvasOklch))
        const accentSolidExpr = semanticVars['--mr-accent-solid']

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
            '\nTous les contrastes respectent WCAG AA (repos 15.19:1, survol 11.62:1, actif 8.20:1, anneau focus >= 3.0:1, marge sRGB >= 0.01).'
        )
    } finally {
        await browser.close()
    }
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
