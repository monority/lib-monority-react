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

// Helper pour attendre la fin complete de toutes les animations et transitions CSS en cours
async function waitForAnimations(page) {
    await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)))
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

    // Fixture negative : inversion d'ordre entre regles invalide et desactive
    const pageInverted = await browser.newPage()
    await pageInverted.setContent(`
        <style>
            :root {
                --mr-border-control: oklch(0.61 0 215);
                --mr-bg-canvas: oklch(0.955 0 215);
                --mr-danger-solid: oklch(0.52 0.2 25);
            }
            .bad-order:disabled {
                border-color: oklch(0.8998 0 215);
            }
            .bad-order[aria-invalid='true'] {
                border-color: var(--mr-danger-solid);
            }
        </style>
        <input class="bad-order" id="bad-order-input" disabled aria-invalid="true" />
    `)
    const badOrderBorder = await pageInverted.$eval(
        '#bad-order-input',
        (el) => window.getComputedStyle(el).borderColor
    )
    await pageInverted.close()
    assert.notStrictEqual(
        badOrderBorder,
        'oklch(0.8998 0 215)',
        'Preuve negative : lordre inverse doit produire la bordure invalide au lieu de la bordure desactivee'
    )
    console.log(
        'OK: Preuve en negatif reussie (inversion de priorite desactive/invalide detectee avec succes).'
    )
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
                        <input class="mr-input" id="input-comb-dis-inv" disabled aria-invalid="true" value="Desactive et Invalide" />
                        <input class="mr-input" id="input-comb-ro-inv" readonly aria-invalid="true" value="Lecture seule et Invalide" />
                        <input class="mr-input" id="input-comb-inv-hover" aria-invalid="true" value="Invalide survole" />
                        <input class="mr-input" id="input-comb-ro-hover" readonly value="Lecture seule survolee" />
                        <input class="mr-input" id="input-comb-dis-hover" disabled value="Desactive survole" />
                        <input class="mr-input" id="input-comb-inv-focus" aria-invalid="true" value="Invalide focus" />
                        <input class="mr-input" id="input-comb-ro-focus" readonly value="Lecture seule focus" />
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
            await waitForAnimations(page)
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
            await waitForAnimations(page)
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
            await waitForAnimations(page)
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
            await waitForAnimations(page)
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
            await waitForAnimations(page)
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
            await waitForAnimations(page)
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
            await waitForAnimations(page)
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
            await waitForAnimations(page)
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
            await waitForAnimations(page)
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

            // 11. Verification des 7 combinaisons d'etats et ordre de priorite
            console.log(
                `\nVerification des etats combines Input en theme ${t.name.toUpperCase()} :`
            )

            // 1. desactive et invalide : desactive l'emporte (curseur, bordure, texte)
            const c1Border = await page.$eval(
                '#input-comb-dis-inv',
                (el) => window.getComputedStyle(el).borderColor
            )
            const c1Cursor = await page.$eval(
                '#input-comb-dis-inv',
                (el) => window.getComputedStyle(el).cursor
            )
            const c1Text = await page.$eval(
                '#input-comb-dis-inv',
                (el) => window.getComputedStyle(el).color
            )
            assert.strictEqual(
                c1Border,
                inputDisabledBorderRaw,
                `Theme ${t.name} - comb 1: bordure attendue ${inputDisabledBorderRaw}, obtenu: ${c1Border}`
            )
            assert.strictEqual(
                c1Cursor,
                'not-allowed',
                `Theme ${t.name} - comb 1: curseur not-allowed attendu, obtenu: ${c1Cursor}`
            )
            assert.strictEqual(
                c1Text,
                inputDisabledTextRaw,
                `Theme ${t.name} - comb 1: texte attendu ${inputDisabledTextRaw}, obtenu: ${c1Text}`
            )
            console.log(
                `- 1. Desactive et Invalide       : bordure = ${c1Border}, curseur = ${c1Cursor}, texte = ${c1Text}`
            )

            // 2. lecture seule et invalide : curseur default, bordure invalide
            const c2Border = await page.$eval(
                '#input-comb-ro-inv',
                (el) => window.getComputedStyle(el).borderColor
            )
            const c2Cursor = await page.$eval(
                '#input-comb-ro-inv',
                (el) => window.getComputedStyle(el).cursor
            )
            const c2Text = await page.$eval(
                '#input-comb-ro-inv',
                (el) => window.getComputedStyle(el).color
            )
            assert.strictEqual(
                c2Border,
                inputBorderInvalidRaw,
                `Theme ${t.name} - comb 2: bordure attendue ${inputBorderInvalidRaw}, obtenu: ${c2Border}`
            )
            assert.strictEqual(
                c2Cursor,
                'default',
                `Theme ${t.name} - comb 2: curseur default attendu, obtenu: ${c2Cursor}`
            )
            assert.strictEqual(
                c2Text,
                inputTextRaw,
                `Theme ${t.name} - comb 2: texte attendu ${inputTextRaw}, obtenu: ${c2Text}`
            )
            console.log(
                `- 2. Lecture seule et Invalide   : bordure = ${c2Border}, curseur = ${c2Cursor}, texte = ${c2Text}`
            )

            // 3. invalide survole : la bordure invalide ne change pas au survol
            await page.hover('#input-comb-inv-hover')
            await waitForAnimations(page)
            const c3Border = await page.$eval(
                '#input-comb-inv-hover',
                (el) => window.getComputedStyle(el).borderColor
            )
            const c3Cursor = await page.$eval(
                '#input-comb-inv-hover',
                (el) => window.getComputedStyle(el).cursor
            )
            assert.strictEqual(
                c3Border,
                inputBorderInvalidRaw,
                `Theme ${t.name} - comb 3: bordure invalide inchangee attendue, obtenu: ${c3Border}`
            )
            assert.strictEqual(
                c3Cursor,
                'text',
                `Theme ${t.name} - comb 3: curseur text attendu, obtenu: ${c3Cursor}`
            )
            console.log(
                `- 3. Invalide survole            : bordure = ${c3Border}, curseur = ${c3Cursor}`
            )

            // 4. lecture seule survolee : aucun survol, bordure de repos
            await page.hover('#input-comb-ro-hover')
            await waitForAnimations(page)
            const c4Border = await page.$eval(
                '#input-comb-ro-hover',
                (el) => window.getComputedStyle(el).borderColor
            )
            const c4Cursor = await page.$eval(
                '#input-comb-ro-hover',
                (el) => window.getComputedStyle(el).cursor
            )
            assert.strictEqual(
                c4Border,
                inputBorderRaw,
                `Theme ${t.name} - comb 4: bordure repos inchangee attendue, obtenu: ${c4Border}`
            )
            assert.strictEqual(
                c4Cursor,
                'default',
                `Theme ${t.name} - comb 4: curseur default attendu, obtenu: ${c4Cursor}`
            )
            console.log(
                `- 4. Lecture seule survolee      : bordure = ${c4Border}, curseur = ${c4Cursor}`
            )

            // 5. desactive survole : aucun survol, bordure et curseur desactives
            await page.hover('#input-comb-dis-hover', { force: true })
            await waitForAnimations(page)
            const c5Border = await page.$eval(
                '#input-comb-dis-hover',
                (el) => window.getComputedStyle(el).borderColor
            )
            const c5Cursor = await page.$eval(
                '#input-comb-dis-hover',
                (el) => window.getComputedStyle(el).cursor
            )
            assert.strictEqual(
                c5Border,
                inputDisabledBorderRaw,
                `Theme ${t.name} - comb 5: bordure desactivee inchangee attendue, obtenu: ${c5Border}`
            )
            assert.strictEqual(
                c5Cursor,
                'not-allowed',
                `Theme ${t.name} - comb 5: curseur not-allowed attendu, obtenu: ${c5Cursor}`
            )
            console.log(
                `- 5. Desactive survole           : bordure = ${c5Border}, curseur = ${c5Cursor}`
            )

            // 6. invalide avec focus clavier : bordure et anneau danger
            await page.focus('#input-comb-inv-focus')
            await waitForAnimations(page)
            const c6Border = await page.$eval(
                '#input-comb-inv-focus',
                (el) => window.getComputedStyle(el).borderColor
            )
            const c6Outline = await page.$eval(
                '#input-comb-inv-focus',
                (el) => window.getComputedStyle(el).outlineColor
            )
            const c6OutlineWidth = await page.$eval(
                '#input-comb-inv-focus',
                (el) => window.getComputedStyle(el).outlineWidth
            )
            assert.strictEqual(
                c6Border,
                inputBorderInvalidRaw,
                `Theme ${t.name} - comb 6: bordure attendue ${inputBorderInvalidRaw}, obtenu: ${c6Border}`
            )
            assert.strictEqual(
                c6Outline,
                invalidFocusOutlineRaw,
                `Theme ${t.name} - comb 6: anneau attendu ${invalidFocusOutlineRaw}, obtenu: ${c6Outline}`
            )
            assert.strictEqual(
                c6OutlineWidth,
                '2px',
                `Theme ${t.name} - comb 6: epaisseur anneau 2px attendue, obtenu: ${c6OutlineWidth}`
            )
            console.log(
                `- 6. Invalide avec focus clavier : bordure = ${c6Border}, anneau = ${c6Outline}, largeur = ${c6OutlineWidth}`
            )

            // 7. lecture seule avec focus clavier : bordure et anneau focus normal, curseur default
            await page.focus('#input-comb-ro-focus')
            await waitForAnimations(page)
            const c7Border = await page.$eval(
                '#input-comb-ro-focus',
                (el) => window.getComputedStyle(el).borderColor
            )
            const c7Outline = await page.$eval(
                '#input-comb-ro-focus',
                (el) => window.getComputedStyle(el).outlineColor
            )
            const c7OutlineWidth = await page.$eval(
                '#input-comb-ro-focus',
                (el) => window.getComputedStyle(el).outlineWidth
            )
            const c7Cursor = await page.$eval(
                '#input-comb-ro-focus',
                (el) => window.getComputedStyle(el).cursor
            )
            assert.strictEqual(
                c7Border,
                focusOutlineColorRaw,
                `Theme ${t.name} - comb 7: bordure attendue ${focusOutlineColorRaw}, obtenu: ${c7Border}`
            )
            assert.strictEqual(
                c7Outline,
                focusOutlineColorRaw,
                `Theme ${t.name} - comb 7: anneau attendu ${focusOutlineColorRaw}, obtenu: ${c7Outline}`
            )
            assert.strictEqual(
                c7OutlineWidth,
                '2px',
                `Theme ${t.name} - comb 7: epaisseur anneau 2px attendue, obtenu: ${c7OutlineWidth}`
            )
            assert.strictEqual(
                c7Cursor,
                'default',
                `Theme ${t.name} - comb 7: curseur default attendu, obtenu: ${c7Cursor}`
            )
            console.log(
                `- 7. Lecture seule avec focus    : bordure = ${c7Border}, anneau = ${c7Outline}, curseur = ${c7Cursor}`
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

        // ─── Tests permanents : non-imposition a l'hote et echelle racine (ADR-025) ───
        console.log(
            "\nVerification de la non-imposition a l'hote et de l'echelle racine (ADR-025)..."
        )

        const distCssPath = path.join(ROOT, 'packages/ui/dist/index.css')
        assert(
            fs.existsSync(distCssPath),
            "dist/index.css doit exister pour les tests d'imposition a l'hote"
        )
        const distCss = fs.readFileSync(distCssPath, 'utf8')

        // 1. Fixture negative : verification qu'une regle fautive sur :root est bien detectee
        const pageNeg = await browser.newPage()
        await pageNeg.setContent(`
            <!DOCTYPE html><html><body><p id="p">Texte</p></body></html>
        `)
        await pageNeg.addStyleTag({
            content: ':root { font-size: 14px; color: oklch(0.22 0 215); }',
        })
        const negFs = await pageNeg.$eval('html', (el) => window.getComputedStyle(el).fontSize)
        const negColor = await pageNeg.$eval('#p', (el) => window.getComputedStyle(el).color)
        assert(
            negFs === '14px' && negColor !== 'rgb(0, 0, 0)',
            "La fixture negative doit detecter l'imposition fautive sur :root"
        )
        await pageNeg.close()
        console.log("OK: Fixture negative d'imposition reussie (regle fautive sur :root detectee).")

        // 2. Page sans data-theme : aucune difference entre page nue et page avec le CSS publie
        const pageBare = await browser.newPage()
        const pageWithLib = await browser.newPage()
        const bareHtml = `
            <!DOCTYPE html>
            <html>
              <head></head>
              <body>
                <p id="p">Paragraph</p>
                <h1 id="h1">Heading</h1>
                <ul id="ul"><li>List</li></ul>
                <a id="a" href="#">Link</a>
                <button id="button">Button</button>
                <input id="input" />
                <table id="table"><tr><td>Cell</td></tr></table>
              </body>
            </html>
        `
        await pageBare.setContent(bareHtml)
        await pageWithLib.setContent(bareHtml)
        await pageWithLib.addStyleTag({ content: distCss })

        const probeElements = [
            'html',
            'body',
            '#p',
            '#h1',
            '#ul',
            '#a',
            '#button',
            '#input',
            '#table',
        ]
        const probeProps = [
            'color',
            'backgroundColor',
            'fontFamily',
            'fontSize',
            'lineHeight',
            'margin',
            'padding',
            'boxSizing',
            'colorScheme',
        ]

        let hostDiffCount = 0
        for (const sel of probeElements) {
            const csBare = await pageBare.$eval(
                sel === 'html' ? 'html' : sel === 'body' ? 'body' : sel,
                (el, props) => {
                    const cs = window.getComputedStyle(el)
                    const res = {}
                    props.forEach((p) => (res[p] = cs[p]))
                    return res
                },
                probeProps
            )

            const csLib = await pageWithLib.$eval(
                sel === 'html' ? 'html' : sel === 'body' ? 'body' : sel,
                (el, props) => {
                    const cs = window.getComputedStyle(el)
                    const res = {}
                    props.forEach((p) => (res[p] = cs[p]))
                    return res
                },
                probeProps
            )

            probeProps.forEach((p) => {
                if (csBare[p] !== csLib[p]) {
                    hostDiffCount++
                }
            })
        }
        await pageBare.close()
        await pageWithLib.close()
        assert.strictEqual(
            hostDiffCount,
            0,
            `Le CSS publie ne doit imposer aucun style sur une page sans data-theme (trouve ${hostDiffCount} differences)`
        )
        console.log(
            "OK: Non-imposition a l'hote confirmee (0 difference sur elements nus sans data-theme)."
        )

        // 3. Fixture negative racine 14px vs test reel data-theme="light"
        const pageNegThemed = await browser.newPage()
        await pageNegThemed.setContent(`
            <!DOCTYPE html>
            <html data-theme="light">
              <head><style>:root { font-size: 14px; }</style></head>
              <body></body>
            </html>
        `)
        const badThemedFs = await pageNegThemed.$eval(
            'html',
            (el) => window.getComputedStyle(el).fontSize
        )
        assert.strictEqual(
            badThemedFs,
            '14px',
            'La fixture negative doit detecter la racine abaissee a 14px'
        )
        await pageNegThemed.close()
        console.log('OK: Fixture negative echelle racine reussie (racine fautive a 14px detectee).')

        // Page avec data-theme="light" sur html : documentElement a 16px, jamais 14px
        const pageThemed = await browser.newPage()
        await pageThemed.setContent(`
            <!DOCTYPE html>
            <html data-theme="light">
              <head><style>${distCss}</style></head>
              <body>
                <button class="mr-btn" data-size="sm" id="btn-sm">sm</button>
                <button class="mr-btn" data-size="md" id="btn-md">md</button>
                <button class="mr-btn" data-size="lg" id="btn-lg">lg</button>
                <input class="mr-input" data-size="sm" id="input-sm" value="sm" />
                <input class="mr-input" data-size="md" id="input-md" value="md" />
                <input class="mr-input" data-size="lg" id="input-lg" value="lg" />
              </body>
            </html>
        `)
        const themedRootFs = await pageThemed.$eval(
            'html',
            (el) => window.getComputedStyle(el).fontSize
        )
        assert.strictEqual(
            themedRootFs,
            '16px',
            `La taille racine sous data-theme="light" doit etre 16px, obtenu: ${themedRootFs}`
        )
        assert.notStrictEqual(
            themedRootFs,
            '14px',
            'La taille racine ne doit jamais etre abaissee a 14px'
        )

        // 4. Fixture negative hauteurs de controles vs test reel 28/32/40 px
        const pageNegHeights = await browser.newPage()
        await pageNegHeights.setContent(`
            <!DOCTYPE html>
            <html style="font-size: 14px;">
              <head><style>${distCss}</style></head>
              <body>
                <button class="mr-btn" data-size="sm" id="btn-bad">sm</button>
              </body>
            </html>
        `)
        const badBtnH = await pageNegHeights.$eval(
            '#btn-bad',
            (el) => el.getBoundingClientRect().height
        )
        assert.strictEqual(
            badBtnH,
            24.5,
            'La fixture negative doit detecter le bouton sm reduit a 24.5px sous racine 14px'
        )
        await pageNegHeights.close()
        console.log(
            'OK: Fixture negative hauteurs reussie (hauteur reduite a 24.5px detectee sous racine 14px).'
        )

        // Hauteurs de controles a la racine par defaut (16px), sans surcharge : Button et Input sm=28, md=32, lg=40
        const cHeights = await pageThemed.evaluate(() => {
            const getH = (id) => document.getElementById(id).getBoundingClientRect().height
            return {
                btnSm: getH('btn-sm'),
                btnMd: getH('btn-md'),
                btnLg: getH('btn-lg'),
                inputSm: getH('input-sm'),
                inputMd: getH('input-md'),
                inputLg: getH('input-lg'),
            }
        })
        await pageThemed.close()

        assert.strictEqual(
            cHeights.btnSm,
            28,
            `Button sm attendu a 28px, obtenu: ${cHeights.btnSm}px`
        )
        assert.strictEqual(
            cHeights.btnMd,
            32,
            `Button md attendu a 32px, obtenu: ${cHeights.btnMd}px`
        )
        assert.strictEqual(
            cHeights.btnLg,
            40,
            `Button lg attendu a 40px, obtenu: ${cHeights.btnLg}px`
        )
        assert.strictEqual(
            cHeights.inputSm,
            28,
            `Input sm attendu a 28px, obtenu: ${cHeights.inputSm}px`
        )
        assert.strictEqual(
            cHeights.inputMd,
            32,
            `Input md attendu a 32px, obtenu: ${cHeights.inputMd}px`
        )
        assert.strictEqual(
            cHeights.inputLg,
            40,
            `Input lg attendu a 40px, obtenu: ${cHeights.inputLg}px`
        )
        console.log(
            `OK: Hauteurs de controles conformes sans surcharge (Button: 28/32/40px, Input: 28/32/40px, racine: 16px).`
        )

        console.log('\nTous les contrastes respectent WCAG AA sur les deux themes (light et dark).')
    } finally {
        await browser.close()
    }
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
