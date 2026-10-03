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

// 1. Preuves en negatif et assertions de reference
async function testNegativeProof(browser) {
    console.log('Assertions de reference et preuve en negatif du test de contraste...')

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

        if (
            !fs.existsSync(layersPath) ||
            !fs.existsSync(colorSchemePath) ||
            !fs.existsSync(semanticPath) ||
            !fs.existsSync(refPath) ||
            !fs.existsSync(darkPath) ||
            !fs.existsSync(buttonPath)
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
