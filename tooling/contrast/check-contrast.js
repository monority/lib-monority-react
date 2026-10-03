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
    oklabToRgbRaw,
    oklchToRgbRaw,
    parseCssVariables,
    parseOklch,
    reduceChroma,
} from './contrast-checker.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const webRequire = createRequire(path.join(ROOT, 'apps/web/package.json'))
const { chromium } = webRequire('@playwright/test')

// Helper pour convertir une couleur (oklch, oklab, rgb, srgb, color(), transparent) retournee par le navigateur en RGB float 0..1
export function colorToRgb(str) {
    if (!str || typeof str !== 'string') {
        throw new Error(`Format de couleur non reconnu : ${str}`)
    }
    const s = str.trim()
    if (s.toLowerCase() === 'transparent') {
        return [0, 0, 0]
    }
    const oklch = parseOklch(s)
    if (oklch) {
        return clipRgb(oklchToRgbRaw(oklch[0], oklch[1], oklch[2]))
    }
    const oklabMatch = s.match(
        /oklab\(\s*([\d.]+)\s+([-\d.]+)\s+([-\d.]+)(?:\s*\/\s*[\d.]+%?)?\s*\)/i
    )
    if (oklabMatch) {
        return clipRgb(
            oklabToRgbRaw(
                parseFloat(oklabMatch[1]),
                parseFloat(oklabMatch[2]),
                parseFloat(oklabMatch[3])
            )
        )
    }
    const colorSrgbMatch = s.match(
        /color\(\s*srgb\s+([-\d.%]+)\s+([-\d.%]+)\s+([-\d.%]+)(?:\s*\/\s*[-\d.%]+)?\s*\)/i
    )
    if (colorSrgbMatch) {
        const parseChannel = (v) => (v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v))
        return clipRgb([
            parseChannel(colorSrgbMatch[1]),
            parseChannel(colorSrgbMatch[2]),
            parseChannel(colorSrgbMatch[3]),
        ])
    }
    const rgbCommaMatch = s.match(
        /rgba?\(\s*([\d.%]+)\s*,\s*([\d.%]+)\s*,\s*([\d.%]+)(?:\s*,\s*[\d.%]+)?\s*\)/i
    )
    if (rgbCommaMatch) {
        const parseChannel = (v) => (v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v) / 255)
        return clipRgb([
            parseChannel(rgbCommaMatch[1]),
            parseChannel(rgbCommaMatch[2]),
            parseChannel(rgbCommaMatch[3]),
        ])
    }
    const rgbSpaceMatch = s.match(
        /rgba?\(\s*([\d.%]+)\s+([\d.%]+)\s+([\d.%]+)(?:\s*\/\s*[\d.%]+)?\s*\)/i
    )
    if (rgbSpaceMatch) {
        const parseChannel = (v) => (v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v) / 255)
        return clipRgb([
            parseChannel(rgbSpaceMatch[1]),
            parseChannel(rgbSpaceMatch[2]),
            parseChannel(rgbSpaceMatch[3]),
        ])
    }

    throw new Error(`Format de couleur non reconnu : ${str}`)
}

// 1. Preuves en negatif et assertions de reference
async function testNegativeProof(browser) {
    console.log('Assertions de reference et preuve en negatif du test de contraste...')

    // Assertions de reference pour le parseur
    const rgbOklab = colorToRgb('oklab(0.5 0 0)').map((v) => Math.round(v * 255))
    assert(
        Math.abs(rgbOklab[0] - 99) <= 1 &&
            Math.abs(rgbOklab[1] - 99) <= 1 &&
            Math.abs(rgbOklab[2] - 99) <= 1,
        `Parseur oklab(0.5 0 0) attendu a rgb(99, 99, 99) +/- 1, obtenu: rgb(${rgbOklab.join(', ')})`
    )

    const rgbOklch = colorToRgb('oklch(1 0 0)').map((v) => Math.round(v * 255))
    assert.deepStrictEqual(
        rgbOklch,
        [255, 255, 255],
        `Parseur oklch(1 0 0) attendu a rgb(255, 255, 255), obtenu: rgb(${rgbOklch.join(', ')})`
    )

    // Preuve en negatif : chaine non reconnue fait echouer
    assert.throws(
        () => colorToRgb('formatInconnu(1, 2, 3)'),
        /Format de couleur non reconnu/,
        'Une chaine non reconnue doit lever une erreur explicite'
    )

    // Assertions de reference sur valeurs connues
    const refBlack = [0, 0, 0]
    const refWhite = [1, 1, 1]
    const refBwRatio = getContrastRatio(refBlack, refWhite)
    assert.strictEqual(
        refBwRatio.toFixed(2),
        '21.00',
        `Reference noir sur blanc attendue a 21.00:1, obtenu: ${refBwRatio.toFixed(2)}:1`
    )

    const refGrayText = colorToRgb('oklch(0.6 0 215)')
    const refGrayBg = colorToRgb('oklch(0.8374 0 215)')
    const refGrayRatio = getContrastRatio(refGrayText, refGrayBg)
    assert.strictEqual(
        refGrayRatio.toFixed(2),
        '2.40',
        `Reference gris desactive attendue a 2.40:1, obtenu: ${refGrayRatio.toFixed(2)}:1`
    )
    console.log(
        `OK: Assertions de reference reussies (noir sur blanc = ${refBwRatio.toFixed(2)}:1, gris sur gris = ${refGrayRatio.toFixed(2)}:1).`
    )

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
    const pageHover = await browser.newPage()
    await pageHover.setContent(`
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
    const badBg = await pageHover.$eval(
        '#bad-btn',
        (el) => window.getComputedStyle(el).backgroundColor
    )
    const badText = await pageHover.$eval('#bad-btn', (el) => window.getComputedStyle(el).color)
    const badRatio = getContrastRatio(colorToRgb(badText), colorToRgb(badBg))
    assert(
        badRatio < 4.5,
        `Le survol avec melange 90% doit echouer sous 4.5:1 (ratio obtenu: ${badRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative survol reussie (melange a 90% detecte insuffisant a ${badRatio.toFixed(2)}:1 < 4.5:1).`
    )
    await pageHover.close()

    // Fixture negative specifique au sombre : texte sombre defaillant L=0.35 sur canevas L=0.22
    const pageDark = await browser.newPage()
    await pageDark.setContent(`
        <style>
            [data-theme='dark'] {
                --mr-bg-canvas: oklch(0.22 0 215);
                --mr-text-primary: oklch(0.35 0 215);
            }
            .bad-dark {
                background-color: var(--mr-bg-canvas);
                color: var(--mr-text-primary);
            }
        </style>
        <div data-theme="dark">
            <button class="bad-dark" id="bad-dark-btn">Dark Invalide</button>
        </div>
    `)
    const badDarkBg = await pageDark.$eval(
        '#bad-dark-btn',
        (el) => window.getComputedStyle(el).backgroundColor
    )
    const badDarkText = await pageDark.$eval(
        '#bad-dark-btn',
        (el) => window.getComputedStyle(el).color
    )
    const badDarkRatio = getContrastRatio(colorToRgb(badDarkText), colorToRgb(badDarkBg))
    assert(
        badDarkRatio < 4.5,
        `Le texte sombre defaillant doit echouer sous 4.5:1 (ratio obtenu: ${badDarkRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative sombre reussie (texte defaillant detecte insuffisant a ${badDarkRatio.toFixed(2)}:1 < 4.5:1).`
    )
    await pageDark.close()

    // Fixture negative specifique a la bordure de controle : bordure defaillante L=0.85 sur canevas clair L=0.955
    const pageBorder = await browser.newPage()
    await pageBorder.setContent(`
        <style>
            body {
                background-color: oklch(0.955 0 215);
            }
            .bad-border-btn {
                background-color: oklch(0.955 0 215);
                border: 1px solid oklch(0.85 0 215);
            }
        </style>
        <button class="bad-border-btn" id="bad-border-btn">Bordure Faible</button>
    `)
    const badBorderColor = await pageBorder.$eval(
        '#bad-border-btn',
        (el) => window.getComputedStyle(el).borderColor
    )
    const badCanvasBg = await pageBorder.$eval(
        'body',
        (el) => window.getComputedStyle(el).backgroundColor
    )
    const badBorderRatio = getContrastRatio(colorToRgb(badBorderColor), colorToRgb(badCanvasBg))
    assert(
        badBorderRatio < 3.0,
        `La bordure defaillante doit echouer sous 3.0:1 (ratio obtenu: ${badBorderRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative bordure reussie (bordure defaillante detectee insuffisante a ${badBorderRatio.toFixed(2)}:1 < 3.0:1).`
    )
    await pageBorder.close()

    // Fixture negative specifique au danger : luminosite defaillante L=0.75 sur canevas clair L=0.955
    const pageDangerBad = await browser.newPage()
    await pageDangerBad.setContent(`
        <style>
            :root {
                --mr-bg-canvas: oklch(0.955 0 215);
                --mr-danger-solid-bad: oklch(0.75 0.20 25);
                --mr-danger-on-solid-bad: var(--mr-bg-canvas);
            }
            .bad-danger-btn {
                background-color: var(--mr-danger-solid-bad);
                color: var(--mr-danger-on-solid-bad);
            }
        </style>
        <button class="bad-danger-btn" id="bad-danger-btn">Danger Faible</button>
    `)
    const badDangerBg = await pageDangerBad.$eval(
        '#bad-danger-btn',
        (el) => window.getComputedStyle(el).backgroundColor
    )
    const badDangerText = await pageDangerBad.$eval(
        '#bad-danger-btn',
        (el) => window.getComputedStyle(el).color
    )
    const badDangerRatio = getContrastRatio(colorToRgb(badDangerText), colorToRgb(badDangerBg))
    assert(
        badDangerRatio < 4.5,
        `Le danger avec luminosite defaillante doit echouer sous 4.5:1 (ratio obtenu: ${badDangerRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative danger reussie (luminosite defaillante detectee insuffisante a ${badDangerRatio.toFixed(2)}:1 < 4.5:1).`
    )
    await pageDangerBad.close()

    // Fixture negative specifique au placeholder : luminosite defaillante L=0.60 en clair sur canevas clair L=0.955
    const pagePlaceholderBad = await browser.newPage()
    await pagePlaceholderBad.setContent(`
        <style>
            :root {
                --mr-bg-canvas: oklch(0.955 0 215);
                --mr-text-secondary-bad: oklch(0.60 0 215);
            }
            .bad-input::placeholder {
                color: var(--mr-text-secondary-bad);
            }
        </style>
        <input class="bad-input" id="bad-input" placeholder="Placeholder Faible" />
    `)
    const badPhColor = await pagePlaceholderBad.$eval(
        '#bad-input',
        (el) => window.getComputedStyle(el, '::placeholder').color
    )
    const badPhRatio = getContrastRatio(colorToRgb(badPhColor), colorToRgb('oklch(0.955 0 215)'))
    assert(
        badPhRatio < 4.5,
        `Le placeholder defaillant doit echouer sous 4.5:1 (ratio obtenu: ${badPhRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative placeholder reussie (L=0.60 detecte insuffisant a ${badPhRatio.toFixed(2)}:1 < 4.5:1).`
    )
    // Fixture negative survol bordure Input : melange vers le canevas (au lieu du texte)
    const pageBorderHoverBad = await browser.newPage()
    await pageBorderHoverBad.setContent(`
        <style>
            :root {
                --mr-bg-canvas: oklch(0.955 0 215);
                --mr-border-control: oklch(0.61 0 215);
                --mr-state-hover-mix: 12%;
            }
            .bad-border-hover {
                border: 1px solid color-mix(in oklch, var(--mr-border-control), var(--mr-bg-canvas) var(--mr-state-hover-mix));
            }
        </style>
        <input class="bad-border-hover" id="bad-input-hover" />
    `)
    const badInputBorder = await pageBorderHoverBad.$eval(
        '#bad-input-hover',
        (el) => window.getComputedStyle(el).borderColor
    )
    const badInputHoverRatio = getContrastRatio(
        colorToRgb(badInputBorder),
        colorToRgb('oklch(0.955 0 215)')
    )
    assert(
        badInputHoverRatio < 3.0,
        `Le survol de bordure vers le canevas doit echouer sous 3.0:1 (ratio obtenu: ${badInputHoverRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative survol bordure Input reussie (melange vers canevas detecte insuffisant a ${badInputHoverRatio.toFixed(2)}:1 < 3.0:1).`
    )
    await pageBorderHoverBad.close()
}

// 2. Verification des contrastes reels depuis les fichiers CSS et dans Chromium
async function run() {
    const browser = await chromium.launch({ headless: true })

    try {
        await testNegativeProof(browser)

        console.log(
            '\nVerification du contraste WCAG 2.2 AA (etats Chromium + focus de marque + cascade)...'
        )

        const layersPath = path.join(ROOT, 'packages/styles/src/layers.css')
        const colorSchemePath = path.join(ROOT, 'packages/styles/src/base/color-scheme.css')
        const refPath = path.join(ROOT, 'packages/styles/src/tokens/ref.css')
        const semanticPath = path.join(ROOT, 'packages/styles/src/tokens/semantic.css')
        const darkPath = path.join(ROOT, 'packages/styles/src/themes/dark.css')
        const buttonPath = path.join(ROOT, 'packages/styles/src/recipes/button.css')
        const inputPath = path.join(ROOT, 'packages/styles/src/recipes/input.css')

        if (
            !fs.existsSync(layersPath) ||
            !fs.existsSync(colorSchemePath) ||
            !fs.existsSync(semanticPath) ||
            !fs.existsSync(refPath) ||
            !fs.existsSync(darkPath) ||
            !fs.existsSync(buttonPath) ||
            !fs.existsSync(inputPath)
        ) {
            console.error('Fichiers CSS requis introuvables.')
            process.exit(1)
        }

        const layersCss = fs.readFileSync(layersPath, 'utf8')
        const colorSchemeCss = fs.readFileSync(colorSchemePath, 'utf8')

        const refCss = fs.readFileSync(refPath, 'utf8')
        const refVars = parseCssVariables(refCss)

        const semanticCss = fs.readFileSync(semanticPath, 'utf8')
        const semanticVars = parseCssVariables(semanticCss)

        const darkCss = fs.readFileSync(darkPath, 'utf8')
        const darkVars = parseCssVariables(darkCss)

        const buttonCss = fs.readFileSync(buttonPath, 'utf8')
        const inputCss = fs.readFileSync(inputPath, 'utf8')

        // Verification des regles de portee pour conteneur decale et theme
        assert(
            semanticCss.includes(':where(:root, [data-theme])'),
            'semantic.css doit declarer les neutres et echelles sous :where(:root, [data-theme])'
        )
        assert(
            semanticCss.includes(':where(:root, [data-theme], [data-brand])'),
            'semantic.css doit declarer la marque et le focus sous :where(:root, [data-theme], [data-brand])'
        )
        assert(
            refCss.includes('--mr-ref-accent-lightness'),
            'ref.css doit declarer le levier --mr-ref-accent-lightness'
        )
        assert(
            darkCss.includes(":where([data-theme='dark'], [data-theme='dim'])"),
            "dark.css doit utiliser le selecteur groupe :where([data-theme='dark'], [data-theme='dim'])"
        )
        console.log(
            'OK: Declarations de portee et selecteurs conformes dans semantic.css, ref.css et dark.css.'
        )

        const fullCss = `
            ${layersCss}
            ${colorSchemeCss}
            ${refCss}
            ${semanticCss}
            ${darkCss}
            ${buttonCss}
            ${inputCss}
        `

        // Evaluation des etats du bouton dans les deux themes
        const themes = [
            { name: 'light', attr: 'data-theme="light"' },
            { name: 'dark', attr: 'data-theme="dark"' },
        ]

        for (const t of themes) {
            console.log(
                `\nMesure reelle des etats du Button principal en theme ${t.name.toUpperCase()} :`
            )
            const page = await browser.newPage()
            await page.setContent(`
                <!DOCTYPE html>
                <html>
                <head>
                <style>
                    ${fullCss}
                </style>
                </head>
                <body ${t.attr}>
                    <button class="mr-btn" id="btn-idle">Enregistrer</button>
                    <button class="mr-btn" id="btn-hover">Enregistrer</button>
                    <button class="mr-btn" id="btn-active">Enregistrer</button>
                    <button class="mr-btn" id="btn-disabled" disabled>Enregistrer</button>

                    <button class="mr-btn" data-variant="secondary" id="btn-sec-idle">Secondaire</button>
                    <button class="mr-btn" data-variant="secondary" id="btn-sec-hover">Secondaire</button>
                    <button class="mr-btn" data-variant="secondary" id="btn-sec-active">Secondaire</button>
                    <button class="mr-btn" data-variant="secondary" id="btn-sec-disabled" disabled>Secondaire</button>

                    <button class="mr-btn" data-variant="ghost" id="btn-ghost-idle">Discret</button>

                    <button class="mr-btn" data-variant="danger" id="btn-danger-idle">Supprimer</button>
                    <button class="mr-btn" data-variant="danger" id="btn-danger-hover">Supprimer</button>
                    <button class="mr-btn" data-variant="danger" id="btn-danger-active">Supprimer</button>
                    <button class="mr-btn" data-variant="danger" id="btn-danger-disabled" disabled>Supprimer</button>
                    ${t.name === 'light' ? '<div id="dark-surface-in-light" style="background-color: oklch(0.22 0 215); padding: 1rem; display: inline-block;"><button class="mr-btn" data-variant="danger" id="btn-danger-dark-surface">Supprimer</button></div>' : ''}
                    <div style="margin-top: 1rem; width: 300px;">
                        <input class="mr-input" id="input-idle" value="Texte saisi" placeholder="Placeholder exemple" />
                        <input class="mr-input" id="input-placeholder" placeholder="Placeholder exemple" />
                        <input class="mr-input" id="input-hover" value="Survol" />
                        <input class="mr-input" id="input-focus" value="Focus" />
                        <input class="mr-input" id="input-invalid" aria-invalid="true" value="Texte invalide" placeholder="Placeholder invalide" />
                        <input class="mr-input" id="input-invalid-focus" aria-invalid="true" value="Focus invalide" />
                        <input class="mr-input" id="input-disabled" disabled value="Texte desactive" placeholder="Placeholder desactive" />
                        <input class="mr-input" id="input-readonly" readonly value="Lecture seule" />
                    </div>
                </body>
                </html>
            `)

            // Repos
            const idleBgRaw = await page.$eval(
                '#btn-idle',
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const idleTextRaw = await page.$eval(
                '#btn-idle',
                (el) => window.getComputedStyle(el).color
            )
            const idleRatio = getContrastRatio(colorToRgb(idleTextRaw), colorToRgb(idleBgRaw))
            console.log(
                `- Repos      : bg = ${idleBgRaw}, text = ${idleTextRaw}, ratio = ${idleRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            assert(
                idleRatio >= 4.5,
                `Theme ${t.name} - Contraste au repos insuffisant: ${idleRatio.toFixed(2)}:1 < 4.5:1`
            )

            // Survol
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
                `Theme ${t.name} - Contraste au survol insuffisant: ${hoverRatio.toFixed(2)}:1 < 4.5:1`
            )

            // Actif
            const activeBox = await page.locator('#btn-active').boundingBox()
            await page.mouse.move(
                activeBox.x + activeBox.width / 2,
                activeBox.y + activeBox.height / 2
            )
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
                `Theme ${t.name} - Contraste actif insuffisant: ${activeRatio.toFixed(2)}:1 < 4.5:1`
            )

            // Desactive
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

            // Contraste bg-inverse sur canevas
            const canvasBgRaw = await page.$eval('body', (el) =>
                window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
            )
            const inverseOnCanvasRatio = getContrastRatio(
                colorToRgb(idleBgRaw),
                colorToRgb(canvasBgRaw)
            )
            console.log(
                `- bg-inverse sur canevas : ${inverseOnCanvasRatio.toFixed(2)}:1 (seuil composant UI >= 3.0:1)`
            )
            assert(
                inverseOnCanvasRatio >= 3.0,
                `Theme ${t.name} - bg-inverse sur canevas insuffisant: ${inverseOnCanvasRatio.toFixed(2)}:1 < 3.0:1`
            )

            // Mesures de la variante secondaire
            console.log(
                `Mesure de la variante Button secondaire en theme ${t.name.toUpperCase()} :`
            )
            const secBorderColorRaw = await page.$eval(
                '#btn-sec-idle',
                (el) => window.getComputedStyle(el).borderColor
            )
            const secBgRaw = await page.$eval(
                '#btn-sec-idle',
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const secTextRaw = await page.$eval(
                '#btn-sec-idle',
                (el) => window.getComputedStyle(el).color
            )
            const secBorderRatio = getContrastRatio(
                colorToRgb(secBorderColorRaw),
                colorToRgb(canvasBgRaw)
            )
            console.log(
                `- Bordure sur canevas : border = ${secBorderColorRaw}, canevas = ${canvasBgRaw}, ratio = ${secBorderRatio.toFixed(2)}:1 (seuil UI >= 3.0:1)`
            )
            assert(
                secBorderRatio >= 3.0,
                `Theme ${t.name} - Bordure de controle insuffisante: ${secBorderRatio.toFixed(2)}:1 < 3.0:1`
            )

            const secIdleRatio = getContrastRatio(colorToRgb(secTextRaw), colorToRgb(secBgRaw))
            console.log(
                `- Secondaire Repos    : text = ${secTextRaw}, bg = ${secBgRaw}, ratio = ${secIdleRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            assert(
                secIdleRatio >= 4.5,
                `Theme ${t.name} - Secondaire au repos insuffisant: ${secIdleRatio.toFixed(2)}:1 < 4.5:1`
            )

            // Secondaire survol
            await page.hover('#btn-sec-hover')
            await page.waitForTimeout(200)
            const secHoverBgRaw = await page.$eval(
                '#btn-sec-hover',
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const secHoverRatio = getContrastRatio(
                colorToRgb(secTextRaw),
                colorToRgb(secHoverBgRaw)
            )
            console.log(
                `- Secondaire Survol   : text = ${secTextRaw}, bg = ${secHoverBgRaw}, ratio = ${secHoverRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            assert(
                secHoverRatio >= 4.5,
                `Theme ${t.name} - Secondaire au survol insuffisant: ${secHoverRatio.toFixed(2)}:1 < 4.5:1`
            )

            // Secondaire actif
            const secActiveBox = await page.locator('#btn-sec-active').boundingBox()
            await page.mouse.move(
                secActiveBox.x + secActiveBox.width / 2,
                secActiveBox.y + secActiveBox.height / 2
            )
            await page.mouse.down()
            await page.waitForTimeout(200)
            const secActiveBgRaw = await page.$eval(
                '#btn-sec-active',
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const secActiveRatio = getContrastRatio(
                colorToRgb(secTextRaw),
                colorToRgb(secActiveBgRaw)
            )
            await page.mouse.up()
            console.log(
                `- Secondaire Actif    : text = ${secTextRaw}, bg = ${secActiveBgRaw}, ratio = ${secActiveRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            assert(
                secActiveRatio >= 4.5,
                `Theme ${t.name} - Secondaire actif insuffisant: ${secActiveRatio.toFixed(2)}:1 < 4.5:1`
            )

            // Secondaire desactive
            const secDisText = await page.$eval(
                '#btn-sec-disabled',
                (el) => window.getComputedStyle(el).color
            )
            const secDisRatio = getContrastRatio(colorToRgb(secDisText), colorToRgb(secBgRaw))
            console.log(
                `- Secondaire Desactive: text = ${secDisText}, bg = ${secBgRaw}, ratio = ${secDisRatio.toFixed(2)}:1 (exempte WCAG 1.4.3)`
            )

            // Mesure de la variante discrete (ghost)
            console.log(`Mesure de la variante Button ghost en theme ${t.name.toUpperCase()} :`)
            const ghostTextRaw = await page.$eval(
                '#btn-ghost-idle',
                (el) => window.getComputedStyle(el).color
            )
            const ghostRatio = getContrastRatio(colorToRgb(ghostTextRaw), colorToRgb(canvasBgRaw))
            console.log(
                `- Ghost Repos         : text = ${ghostTextRaw}, canevas = ${canvasBgRaw}, ratio = ${ghostRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            assert(
                ghostRatio >= 4.5,
                `Theme ${t.name} - Ghost au repos insuffisant: ${ghostRatio.toFixed(2)}:1 < 4.5:1`
            )

            // Mesures de la variante danger
            console.log(`Mesure de la variante Button danger en theme ${t.name.toUpperCase()} :`)
            const dangerBgRaw = await page.$eval(
                '#btn-danger-idle',
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const dangerTextRaw = await page.$eval(
                '#btn-danger-idle',
                (el) => window.getComputedStyle(el).color
            )
            const dangerTextRatio = getContrastRatio(
                colorToRgb(dangerTextRaw),
                colorToRgb(dangerBgRaw)
            )
            const dangerUiRatio = getContrastRatio(colorToRgb(dangerBgRaw), colorToRgb(canvasBgRaw))
            console.log(
                `- Danger Repos       : text = ${dangerTextRaw}, bg = ${dangerBgRaw}, ratio = ${dangerTextRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            console.log(
                `- Danger sur canevas : bg = ${dangerBgRaw}, canevas = ${canvasBgRaw}, ratio = ${dangerUiRatio.toFixed(2)}:1 (seuil UI >= 3.0:1)`
            )
            assert(
                dangerTextRatio >= 4.5,
                `Theme ${t.name} - Danger texte au repos insuffisant: ${dangerTextRatio.toFixed(2)}:1 < 4.5:1`
            )
            assert(
                dangerUiRatio >= 3.0,
                `Theme ${t.name} - Danger sur canevas insuffisant: ${dangerUiRatio.toFixed(2)}:1 < 3.0:1`
            )

            // Danger survol
            await page.hover('#btn-danger-hover')
            await page.waitForTimeout(200)
            const dangerHoverBgRaw = await page.$eval(
                '#btn-danger-hover',
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const dangerHoverTextRaw = await page.$eval(
                '#btn-danger-hover',
                (el) => window.getComputedStyle(el).color
            )
            const dangerHoverRatio = getContrastRatio(
                colorToRgb(dangerHoverTextRaw),
                colorToRgb(dangerHoverBgRaw)
            )
            console.log(
                `- Danger Survol      : text = ${dangerHoverTextRaw}, bg = ${dangerHoverBgRaw}, ratio = ${dangerHoverRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            assert(
                dangerHoverRatio >= 4.5,
                `Theme ${t.name} - Danger au survol insuffisant: ${dangerHoverRatio.toFixed(2)}:1 < 4.5:1`
            )

            // Danger actif
            const dangerActiveBox = await page.locator('#btn-danger-active').boundingBox()
            await page.mouse.move(
                dangerActiveBox.x + dangerActiveBox.width / 2,
                dangerActiveBox.y + dangerActiveBox.height / 2
            )
            await page.mouse.down()
            await page.waitForTimeout(200)
            const dangerActiveBgRaw = await page.$eval(
                '#btn-danger-active',
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const dangerActiveTextRaw = await page.$eval(
                '#btn-danger-active',
                (el) => window.getComputedStyle(el).color
            )
            const dangerActiveRatio = getContrastRatio(
                colorToRgb(dangerActiveTextRaw),
                colorToRgb(dangerActiveBgRaw)
            )
            await page.mouse.up()
            console.log(
                `- Danger Actif       : text = ${dangerActiveTextRaw}, bg = ${dangerActiveBgRaw}, ratio = ${dangerActiveRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            assert(
                dangerActiveRatio >= 4.5,
                `Theme ${t.name} - Danger actif insuffisant: ${dangerActiveRatio.toFixed(2)}:1 < 4.5:1`
            )

            // Danger desactive
            const dangerDisBgRaw = await page.$eval(
                '#btn-danger-disabled',
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const dangerDisTextRaw = await page.$eval(
                '#btn-danger-disabled',
                (el) => window.getComputedStyle(el).color
            )
            const dangerDisRatio = getContrastRatio(
                colorToRgb(dangerDisTextRaw),
                colorToRgb(dangerDisBgRaw)
            )
            console.log(
                `- Danger Desactive   : text = ${dangerDisTextRaw}, bg = ${dangerDisBgRaw}, ratio = ${dangerDisRatio.toFixed(2)}:1 (exempte WCAG 1.4.3)`
            )

            // Mesures du composant Input (micro-etape I1)
            console.log(`\nMesure du composant Input (I1) en theme ${t.name.toUpperCase()} :`)

            // 1. Texte saisi sur fond du champ
            const inputBgRaw = await page.$eval(
                '#input-idle',
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const inputTextRaw = await page.$eval(
                '#input-idle',
                (el) => window.getComputedStyle(el).color
            )
            const inputTextRatio = getContrastRatio(
                colorToRgb(inputTextRaw),
                colorToRgb(inputBgRaw)
            )
            console.log(
                `- Texte saisi sur fond champ : fg = ${inputTextRaw}, bg = ${inputBgRaw}, ratio = ${inputTextRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            assert(
                inputTextRatio >= 4.5,
                `Theme ${t.name} - Contraste texte saisi Input insuffisant: ${inputTextRatio.toFixed(2)}:1 < 4.5:1`
            )

            // 2. Placeholder sur fond du champ
            const phColorRaw = await page.$eval(
                '#input-placeholder',
                (el) => window.getComputedStyle(el, '::placeholder').color
            )
            const phBgRaw = await page.$eval(
                '#input-placeholder',
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const phRatio = getContrastRatio(colorToRgb(phColorRaw), colorToRgb(phBgRaw))
            console.log(
                `- Placeholder sur fond champ : fg = ${phColorRaw}, bg = ${phBgRaw}, ratio = ${phRatio.toFixed(2)}:1 (seuil >= 4.5:1, vise 4.8:1)`
            )
            assert(
                phRatio >= 4.5,
                `Theme ${t.name} - Contraste placeholder Input insuffisant: ${phRatio.toFixed(2)}:1 < 4.5:1`
            )

            // 3. Bordure de controle sur canevas
            const inputBorderRaw = await page.$eval(
                '#input-idle',
                (el) => window.getComputedStyle(el).borderColor
            )
            const inputBorderRatio = getContrastRatio(
                colorToRgb(inputBorderRaw),
                colorToRgb(canvasBgRaw)
            )
            console.log(
                `- Bordure controle sur canevas : fg = ${inputBorderRaw}, bg = ${canvasBgRaw}, ratio = ${inputBorderRatio.toFixed(2)}:1 (seuil UI >= 3.0:1)`
            )
            assert(
                inputBorderRatio >= 3.0,
                `Theme ${t.name} - Bordure Input sur canevas insuffisante: ${inputBorderRatio.toFixed(2)}:1 < 3.0:1`
            )

            // 4. Bordure survolee sur canevas (bloquante >= 3.0:1, marge visee 3.3)
            await page.hover('#input-hover')
            await page.waitForTimeout(50)
            const inputBorderHoverRaw = await page.$eval(
                '#input-hover',
                (el) => window.getComputedStyle(el).borderColor
            )
            const inputBorderHoverRatio = getContrastRatio(
                colorToRgb(inputBorderHoverRaw),
                colorToRgb(canvasBgRaw)
            )
            console.log(
                `- Bordure survolee sur canevas : fg = ${inputBorderHoverRaw}, bg = ${canvasBgRaw}, ratio = ${inputBorderHoverRatio.toFixed(2)}:1 (seuil UI >= 3.0:1, vise 3.3)`
            )
            assert(
                inputBorderHoverRatio >= 3.0,
                `Theme ${t.name} - Bordure survolee Input sur canevas insuffisante: ${inputBorderHoverRatio.toFixed(2)}:1 < 3.0:1`
            )

            // 5. Anneau de focus sur canevas
            await page.focus('#input-focus')
            await page.waitForTimeout(100)
            const focusOutlineColorRaw = await page.$eval(
                '#input-focus',
                (el) => window.getComputedStyle(el).outlineColor
            )
            const focusRingRatio = getContrastRatio(
                colorToRgb(focusOutlineColorRaw),
                colorToRgb(canvasBgRaw)
            )
            console.log(
                `- Anneau focus sur canevas : fg = ${focusOutlineColorRaw}, bg = ${canvasBgRaw}, ratio = ${focusRingRatio.toFixed(2)}:1 (seuil UI >= 3.0:1)`
            )
            assert(
                focusRingRatio >= 3.0,
                `Theme ${t.name} - Anneau focus Input sur canevas insuffisant: ${focusRingRatio.toFixed(2)}:1 < 3.0:1`
            )

            // 6. Bordure invalide sur canevas (bloquante >= 3.0:1)
            const inputBorderInvalidRaw = await page.$eval(
                '#input-invalid',
                (el) => window.getComputedStyle(el).borderColor
            )
            const inputBorderInvalidRatio = getContrastRatio(
                colorToRgb(inputBorderInvalidRaw),
                colorToRgb(canvasBgRaw)
            )
            console.log(
                `- Bordure invalide sur canevas : fg = ${inputBorderInvalidRaw}, bg = ${canvasBgRaw}, ratio = ${inputBorderInvalidRatio.toFixed(2)}:1 (seuil UI >= 3.0:1)`
            )
            assert(
                inputBorderInvalidRatio >= 3.0,
                `Theme ${t.name} - Bordure invalide Input sur canevas insuffisante: ${inputBorderInvalidRatio.toFixed(2)}:1 < 3.0:1`
            )

            // 7. Anneau de focus invalide sur canevas (bloquante >= 3.0:1)
            await page.focus('#input-invalid-focus')
            await page.waitForTimeout(100)
            const invalidFocusOutlineRaw = await page.$eval(
                '#input-invalid-focus',
                (el) => window.getComputedStyle(el).outlineColor
            )
            const invalidFocusOutlineRatio = getContrastRatio(
                colorToRgb(invalidFocusOutlineRaw),
                colorToRgb(canvasBgRaw)
            )
            console.log(
                `- Anneau focus invalide sur canevas : fg = ${invalidFocusOutlineRaw}, bg = ${canvasBgRaw}, ratio = ${invalidFocusOutlineRatio.toFixed(2)}:1 (seuil UI >= 3.0:1)`
            )
            assert(
                invalidFocusOutlineRatio >= 3.0,
                `Theme ${t.name} - Anneau focus invalide Input sur canevas insuffisant: ${invalidFocusOutlineRatio.toFixed(2)}:1 < 3.0:1`
            )

            // 8. Texte saisi en etat invalide sur fond champ (bloquante >= 4.5:1)
            const invalidTextRaw = await page.$eval(
                '#input-invalid',
                (el) => window.getComputedStyle(el).color
            )
            const invalidTextRatio = getContrastRatio(
                colorToRgb(invalidTextRaw),
                colorToRgb(inputBgRaw)
            )
            console.log(
                `- Texte saisi invalide sur fond champ : fg = ${invalidTextRaw}, bg = ${inputBgRaw}, ratio = ${invalidTextRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            assert(
                invalidTextRatio >= 4.5,
                `Theme ${t.name} - Contraste texte saisi invalide Input insuffisant: ${invalidTextRatio.toFixed(2)}:1 < 4.5:1`
            )

            // 9. Placeholder en etat invalide sur fond champ (bloquante >= 4.5:1)
            const invalidPhRaw = await page.$eval(
                '#input-invalid',
                (el) => window.getComputedStyle(el, '::placeholder').color
            )
            const invalidPhRatio = getContrastRatio(
                colorToRgb(invalidPhRaw),
                colorToRgb(inputBgRaw)
            )
            console.log(
                `- Placeholder invalide sur fond champ : fg = ${invalidPhRaw}, bg = ${inputBgRaw}, ratio = ${invalidPhRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
            )
            assert(
                invalidPhRatio >= 4.5,
                `Theme ${t.name} - Contraste placeholder invalide Input insuffisant: ${invalidPhRatio.toFixed(2)}:1 < 4.5:1`
            )

            // 10. Rapportes, non bloquants : desactive (texte, placeholder, bordure)
            const inputDisabledTextRaw = await page.$eval(
                '#input-disabled',
                (el) => window.getComputedStyle(el).color
            )
            const inputDisabledTextRatio = getContrastRatio(
                colorToRgb(inputDisabledTextRaw),
                colorToRgb(inputBgRaw)
            )
            console.log(
                `- [Rapporte] Texte desactive sur fond champ : fg = ${inputDisabledTextRaw}, bg = ${inputBgRaw}, ratio = ${inputDisabledTextRatio.toFixed(2)}:1`
            )

            const inputDisabledPhRaw = await page.$eval(
                '#input-disabled',
                (el) => window.getComputedStyle(el, '::placeholder').color
            )
            const inputDisabledPhRatio = getContrastRatio(
                colorToRgb(inputDisabledPhRaw),
                colorToRgb(inputBgRaw)
            )
            console.log(
                `- [Rapporte] Placeholder desactive sur fond champ : fg = ${inputDisabledPhRaw}, bg = ${inputBgRaw}, ratio = ${inputDisabledPhRatio.toFixed(2)}:1`
            )

            const inputDisabledBorderRaw = await page.$eval(
                '#input-disabled',
                (el) => window.getComputedStyle(el).borderColor
            )
            const inputDisabledBorderRatio = getContrastRatio(
                colorToRgb(inputDisabledBorderRaw),
                colorToRgb(canvasBgRaw)
            )
            console.log(
                `- [Rapporte] Bordure desactivee sur canevas : fg = ${inputDisabledBorderRaw}, bg = ${canvasBgRaw}, ratio = ${inputDisabledBorderRatio.toFixed(2)}:1`
            )

            await page.close()
        }

        // Balayage des 12 teintes pour l'anneau de focus sur canevas dans les deux themes
        for (const t of themes) {
            console.log(
                `\nBalayage teintes de marque pour focus sur canevas en theme ${t.name.toUpperCase()} :`
            )
            const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
            const pageFocus = await browser.newPage()
            await pageFocus.setContent(`
                <!DOCTYPE html>
                <html>
                <head><style>${fullCss}</style></head>
                <body ${t.attr}>
                    <div id="target">Focus Ring Target</div>
                </body>
                </html>
            `)

            const canvasRaw = await pageFocus.$eval('#target', (el) =>
                window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
            )
            const canvasRgb = colorToRgb(canvasRaw)
            const accentLightness = t.name === 'dark' ? 0.635 : 0.5

            for (const h of hues) {
                const rawRgb = oklchToRgbRaw(accentLightness, 0.12 * 0.7, h)
                const clippedRgb = clipRgb(rawRgb)
                const reducedRgb = inGamutRgb(rawRgb)
                    ? rawRgb
                    : reduceChroma(accentLightness, 0.12 * 0.7, h)
                const margin = marginRgb(rawRgb)
                const ratio = getContrastRatio(reducedRgb, canvasRgb)

                console.log(
                    `H=${String(h).padStart(3)} | marge sRGB: ${margin.toFixed(4)} | ` +
                        `Focus/UI(clip: ${getContrastRatio(clippedRgb, canvasRgb).toFixed(2)}, red: ${ratio.toFixed(2)}) -> ` +
                        (ratio >= 3.0 && margin >= 0.01 ? 'OK' : 'ECHEC')
                )
                assert(
                    ratio >= 3.0,
                    `Theme ${t.name} H=${h}: Contraste focus insuffisant: ${ratio.toFixed(2)}:1 < 3.0:1`
                )
                assert(
                    margin >= 0.01,
                    `Theme ${t.name} H=${h}: Marge sRGB insuffisante: ${margin.toFixed(4)} < 0.01`
                )
            }
            await pageFocus.close()
        }

        // Test des portees imbriquees (Correction 3)
        console.log('\nTest des portees imbriquees (dark > light, light > dark, dim) :')
        const pageNesting = await browser.newPage()
        await pageNesting.setContent(`
            <!DOCTYPE html>
            <html>
            <head><style>${fullCss}</style></head>
            <body>
                <div id="scope-dark-parent" data-theme="dark">
                    <div id="nested-light" data-theme="light">
                        <button class="mr-btn" id="btn-nested-light">Bouton Light dans Dark</button>
                    </div>
                </div>
                <div id="scope-light-parent" data-theme="light">
                    <div id="nested-dark" data-theme="dark">
                        <button class="mr-btn" id="btn-nested-dark">Bouton Dark dans Light</button>
                    </div>
                </div>
                <div id="scope-dim" data-theme="dim">
                    <button class="mr-btn" id="btn-dim">Bouton Dim</button>
                </div>
            </body>
            </html>
        `)

        // 1. Light dans Dark
        const nlCs = await pageNesting.$eval(
            '#nested-light',
            (el) => window.getComputedStyle(el).colorScheme
        )
        const nlCanvas = await pageNesting.$eval('#nested-light', (el) =>
            window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
        )
        const nlInverse = await pageNesting.$eval('#nested-light', (el) =>
            window.getComputedStyle(el).getPropertyValue('--mr-bg-inverse').trim()
        )
        const nlOnInverse = await pageNesting.$eval('#nested-light', (el) =>
            window.getComputedStyle(el).getPropertyValue('--mr-text-on-inverse').trim()
        )
        console.log(
            `- nested-light: color-scheme = ${nlCs}, canvas = ${nlCanvas}, bg-inverse = ${nlInverse}, text-on-inverse = ${nlOnInverse}`
        )
        assert.strictEqual(nlCs, 'light', 'nested-light doit avoir color-scheme: light')
        assert(nlCanvas.includes('0.955'), 'nested-light canvas doit valoir 0.955 (clair)')
        assert(nlInverse.includes('0.22'), 'nested-light bg-inverse doit valoir 0.22 (clair)')
        assert(
            nlOnInverse.includes('0.955'),
            'nested-light text-on-inverse doit valoir 0.955 (clair)'
        )

        // 2. Dark dans Light
        const ndCs = await pageNesting.$eval(
            '#nested-dark',
            (el) => window.getComputedStyle(el).colorScheme
        )
        const ndCanvas = await pageNesting.$eval('#nested-dark', (el) =>
            window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
        )
        const ndInverse = await pageNesting.$eval('#nested-dark', (el) =>
            window.getComputedStyle(el).getPropertyValue('--mr-bg-inverse').trim()
        )
        const ndOnInverse = await pageNesting.$eval('#nested-dark', (el) =>
            window.getComputedStyle(el).getPropertyValue('--mr-text-on-inverse').trim()
        )
        console.log(
            `- nested-dark : color-scheme = ${ndCs}, canvas = ${ndCanvas}, bg-inverse = ${ndInverse}, text-on-inverse = ${ndOnInverse}`
        )
        assert.strictEqual(ndCs, 'dark', 'nested-dark doit avoir color-scheme: dark')
        assert(ndCanvas.includes('0.22'), 'nested-dark canvas doit valoir 0.22 (sombre)')
        assert(ndInverse.includes('0.955'), 'nested-dark bg-inverse doit valoir 0.955 (sombre)')
        assert(
            ndOnInverse.includes('0.22'),
            'nested-dark text-on-inverse doit valoir 0.22 (sombre)'
        )

        // 3. Dim alias
        const dimCs = await pageNesting.$eval(
            '#scope-dim',
            (el) => window.getComputedStyle(el).colorScheme
        )
        const dimCanvas = await pageNesting.$eval('#scope-dim', (el) =>
            window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
        )
        const dimInverse = await pageNesting.$eval('#scope-dim', (el) =>
            window.getComputedStyle(el).getPropertyValue('--mr-bg-inverse').trim()
        )
        const dimOnInverse = await pageNesting.$eval('#scope-dim', (el) =>
            window.getComputedStyle(el).getPropertyValue('--mr-text-on-inverse').trim()
        )
        console.log(
            `- dim-alias   : color-scheme = ${dimCs}, canvas = ${dimCanvas}, bg-inverse = ${dimInverse}, text-on-inverse = ${dimOnInverse}`
        )
        assert.strictEqual(dimCs, 'dark', 'dim doit resoudre color-scheme: dark')
        assert.strictEqual(dimCanvas, ndCanvas, 'dim canvas doit etre identique a dark')
        assert.strictEqual(dimInverse, ndInverse, 'dim bg-inverse doit etre identique a dark')
        assert.strictEqual(
            dimOnInverse,
            ndOnInverse,
            'dim text-on-inverse doit etre identique a dark'
        )

        await pageNesting.close()

        console.log('\nTous les contrastes respectent WCAG AA sur les deux themes (light et dark).')
    } finally {
        await browser.close()
    }
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
