import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import {
    ROOT,
    colorToRgb,
    getContrastRatio,
    inGamutRgb,
    marginRgb,
    parseCssVariables,
    reduceChroma,
    waitForAnimations,
} from './common.js'

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
    const failingRatio = getContrastRatio(invalidTextColor, invalidBgColor)
    assert(
        failingRatio < 4.5,
        `La paire invalide doit echouer sous 4.5:1 (ratio obtenu: ${failingRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative reussie (contraste insuffisant detecte a ${failingRatio.toFixed(2)}:1 < 4.5:1).`
    )

    // Fixture negative : verification d'un composant button defaillant
    const pageBad = await browser.newPage()
    await pageBad.setContent(`
        <style>
            :root {
                --mr-bg-bad: oklch(0.90 0 215);
                --mr-text-bad: oklch(0.85 0 215);
            }
            .bad-btn {
                background-color: var(--mr-bg-bad);
                color: var(--mr-text-bad);
            }
        </style>
        <button class="bad-btn" id="bad-btn">Bouton Defaillant</button>
    `)
    const badBg = await pageBad.$eval(
        '#bad-btn',
        (el) => window.getComputedStyle(el).backgroundColor
    )
    const badText = await pageBad.$eval('#bad-btn', (el) => window.getComputedStyle(el).color)
    const badRatio = getContrastRatio(colorToRgb(badText), colorToRgb(badBg))
    assert(
        badRatio < 4.5,
        `Le bouton defaillant doit echouer sous 4.5:1 (ratio obtenu: ${badRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative bouton reussie (composant defaillant detecte insuffisant a ${badRatio.toFixed(2)}:1 < 4.5:1).`
    )
    await pageBad.close()

    // Fixture negative : verification d'une bordure defaillante
    const pageBorder = await browser.newPage()
    await pageBorder.setContent(`
        <style>
            :root {
                --mr-bg-canvas: oklch(0.955 0 215);
                --mr-border-bad: oklch(0.88 0 215);
            }
            .bad-border {
                background-color: var(--mr-bg-canvas);
                border: 1px solid var(--mr-border-bad);
            }
        </style>
        <div class="bad-border" id="bad-border">Bordure Faible</div>
    `)
    const badBorderColor = await pageBorder.$eval(
        '#bad-border',
        (el) => window.getComputedStyle(el).borderColor
    )
    const badBorderRatio = getContrastRatio(
        colorToRgb(badBorderColor),
        colorToRgb('oklch(0.955 0 215)')
    )
    assert(
        badBorderRatio < 1.8,
        `La bordure defaillante doit echouer sous 1.8:1 (ratio obtenu: ${badBorderRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative bordure reussie (bordure defaillante detectee insuffisante a ${badBorderRatio.toFixed(2)}:1 < 1.8:1).`
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
    await pagePlaceholderBad.close()

    // Fixture negative specifique a l'erreur de Field (danger-solid sur canevas)
    const pageFieldErrorBad = await browser.newPage()
    await pageFieldErrorBad.setContent(`
        <style>
            :root {
                --mr-bg-canvas: oklch(0.955 0 215);
                --mr-danger-solid-bad: oklch(0.75 0.20 25);
            }
            .bad-field-error {
                color: var(--mr-danger-solid-bad);
            }
        </style>
        <p class="bad-field-error" id="bad-field-error">Message d'erreur defaillant</p>
    `)
    const badFieldErrorColor = await pageFieldErrorBad.$eval(
        '#bad-field-error',
        (el) => window.getComputedStyle(el).color
    )
    const badFieldErrorRatio = getContrastRatio(
        colorToRgb(badFieldErrorColor),
        colorToRgb('oklch(0.955 0 215)')
    )
    assert(
        badFieldErrorRatio < 4.5,
        `L'erreur Field defaillante doit echouer sous 4.5:1 (ratio obtenu: ${badFieldErrorRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative erreur Field reussie (luminosite defaillante detectee insuffisante a ${badFieldErrorRatio.toFixed(2)}:1 < 4.5:1).`
    )
    await pageFieldErrorBad.close()

    // Fixture negative survol bordure Input : melange vers le canevas (au lieu du texte)
    const pageBorderHoverBad = await browser.newPage()
    await pageBorderHoverBad.setContent(`
        <style>
            :root {
                --mr-bg-canvas: oklch(0.955 0 215);
                --mr-border-control: oklch(0.75 0 215);
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
        badInputHoverRatio < 1.8,
        `Le survol de bordure vers le canevas doit echouer sous 1.8:1 (ratio obtenu: ${badInputHoverRatio.toFixed(2)}:1)`
    )
    console.log(
        `OK: Fixture negative survol bordure Input reussie (melange vers canevas detecte insuffisant a ${badInputHoverRatio.toFixed(2)}:1 < 1.8:1).`
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

export async function testContrast(browser) {
    await testNegativeProof(browser)

    console.log(
        '\nVerification du contraste WCAG 2.2 AA (etats Chromium + focus de marque + cascade)...'
    )

    const layersPath = path.join(ROOT, 'packages/styles/src/layers.css')
    const colorSchemePath = path.join(ROOT, 'packages/styles/src/base/color-scheme.css')
    const refPath = path.join(ROOT, 'packages/styles/src/tokens/ref.css')
    const semanticPath = path.join(ROOT, 'packages/styles/src/tokens/semantic.css')
    const themesDir = path.join(ROOT, 'packages/styles/src/themes')
    const buttonPath = path.join(ROOT, 'packages/styles/src/recipes/button.css')
    const inputPath = path.join(ROOT, 'packages/styles/src/recipes/input.css')
    const fieldPath = path.join(ROOT, 'packages/styles/src/recipes/field.css')

    if (
        !fs.existsSync(layersPath) ||
        !fs.existsSync(colorSchemePath) ||
        !fs.existsSync(semanticPath) ||
        !fs.existsSync(refPath) ||
        !fs.existsSync(themesDir) ||
        !fs.existsSync(buttonPath) ||
        !fs.existsSync(inputPath) ||
        !fs.existsSync(fieldPath)
    ) {
        console.error('Fichiers CSS requis introuvables.')
        process.exit(1)
    }

    const layersCss = fs.readFileSync(layersPath, 'utf8')
    const colorSchemeCss = fs.readFileSync(colorSchemePath, 'utf8')

    const refCss = fs.readFileSync(refPath, 'utf8')
    const semanticCss = fs.readFileSync(semanticPath, 'utf8')
    const themeFiles = fs
        .readdirSync(themesDir)
        .filter((f) => f.endsWith('.css'))
        .sort()
    const themeCssMap = new Map()
    for (const f of themeFiles) {
        themeCssMap.set(f, fs.readFileSync(path.join(themesDir, f), 'utf8'))
    }
    const buttonCss = fs.readFileSync(buttonPath, 'utf8')
    const inputCss = fs.readFileSync(inputPath, 'utf8')
    const fieldCss = fs.readFileSync(fieldPath, 'utf8')

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
    const darkCss = themeCssMap.get('dark.css') ?? ''
    assert(
        darkCss.includes(":where([data-theme='dark'], [data-theme='dim'])"),
        "dark.css doit utiliser le selecteur groupe :where([data-theme='dark'], [data-theme='dim'])"
    )
    const oledCss = themeCssMap.get('oled.css')
    if (oledCss) {
        assert(
            oledCss.includes(":where([data-theme='oled'])"),
            "oled.css doit utiliser le selecteur :where([data-theme='oled'])"
        )
    }
    const slateCss = themeCssMap.get('slate.css')
    if (slateCss) {
        assert(
            slateCss.includes(":where([data-theme='slate'])"),
            "slate.css doit utiliser le selecteur :where([data-theme='slate'])"
        )
    }
    console.log(
        'OK: Declarations de portee et selecteurs conformes dans semantic.css, ref.css et themes/.'
    )

    const themesCss = Array.from(themeCssMap.values()).join('\n')
    const fullCss = `
        ${layersCss}
        ${colorSchemeCss}
        ${refCss}
        ${semanticCss}
        ${themesCss}
        ${buttonCss}
        ${inputCss}
        ${fieldCss}
    `

    // Decouverte dynamique des themes du dossier themes/ (AGENTS.md section 3.3)
    const themes = [
        { name: 'light', attr: 'data-theme="light"' },
        ...themeFiles.map((f) => {
            const name = f.replace('.css', '')
            return { name, attr: `data-theme="${name}"` }
        }),
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
                <div class="mr-field" id="field-sample" style="margin-top: 1rem; width: 300px;">
                    <label class="mr-field__label" id="field-label-sample">Etiquette Field</label>
                    <p class="mr-field__hint" id="field-hint-sample">Texte d'aide</p>
                    <p class="mr-field__error" id="field-error-sample">Message d'erreur</p>
                </div>
            </body>
            </html>
        `)

        const canvasBgRaw = await page.$eval('body', (el) =>
            window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
        )

        // 1. Repos
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
            `Theme ${t.name} - Contraste au repos insuffisant: ${idleRatio.toFixed(2)}:1 < 4.5:1`
        )

        // 2. Survol
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

        // 3. Actif
        const btnActive = page.locator('#btn-active')
        const box = await btnActive.boundingBox()
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
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

        // 4. Desactive
        const disBgRaw = await page.$eval(
            '#btn-disabled',
            (el) => window.getComputedStyle(el).backgroundColor
        )
        const disTextRaw = await page.$eval(
            '#btn-disabled',
            (el) => window.getComputedStyle(el).color
        )
        const disRatio = getContrastRatio(colorToRgb(disTextRaw), colorToRgb(disBgRaw))
        console.log(
            `- Desactive  : bg = ${disBgRaw}, text = ${disTextRaw}, ratio = ${disRatio.toFixed(2)}:1 (exempte WCAG 1.4.3)`
        )

        // Contraste bg-inverse sur canevas
        const bgInverseCanvasRatio = getContrastRatio(
            colorToRgb(idleBgRaw),
            colorToRgb(canvasBgRaw)
        )
        console.log(
            `- bg-inverse sur canevas : ${bgInverseCanvasRatio.toFixed(2)}:1 (seuil composant UI >= 3.0:1)`
        )
        assert(
            bgInverseCanvasRatio >= 3.0,
            `Theme ${t.name} - bg-inverse insuffisant sur canevas: ${bgInverseCanvasRatio.toFixed(2)}:1 < 3.0:1`
        )

        // Mesure de la variante Button secondaire
        console.log(`Mesure de la variante Button secondaire en theme ${t.name.toUpperCase()} :`)
        const secBorderRaw = await page.$eval(
            '#btn-sec-idle',
            (el) => window.getComputedStyle(el).borderColor
        )
        const secBorderRatio = getContrastRatio(colorToRgb(secBorderRaw), colorToRgb(canvasBgRaw))
        console.log(
            `- Bordure sur canevas : border = ${secBorderRaw}, canevas = ${canvasBgRaw}, ratio = ${secBorderRatio.toFixed(2)}:1 (seuil UI au repos >= 1.8:1, ADR-026)`
        )
        assert(
            secBorderRatio >= 1.8,
            `Theme ${t.name} - Bordure bouton secondaire insuffisante: ${secBorderRatio.toFixed(2)}:1 < 1.8:1`
        )

        const secIdleBgRaw = await page.$eval(
            '#btn-sec-idle',
            (el) => window.getComputedStyle(el).backgroundColor
        )
        const secIdleTextRaw = await page.$eval(
            '#btn-sec-idle',
            (el) => window.getComputedStyle(el).color
        )
        const secIdleRatio = getContrastRatio(colorToRgb(secIdleTextRaw), colorToRgb(secIdleBgRaw))
        console.log(
            `- Secondaire Repos    : text = ${secIdleTextRaw}, bg = ${secIdleBgRaw}, ratio = ${secIdleRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
        )
        assert(
            secIdleRatio >= 4.5,
            `Theme ${t.name} - Contraste secondaire repos insuffisant: ${secIdleRatio.toFixed(2)}:1 < 4.5:1`
        )

        await page.hover('#btn-sec-hover')
        await waitForAnimations(page)
        const secHoverBgRaw = await page.$eval(
            '#btn-sec-hover',
            (el) => window.getComputedStyle(el).backgroundColor
        )
        const secHoverTextRaw = await page.$eval(
            '#btn-sec-hover',
            (el) => window.getComputedStyle(el).color
        )
        const secHoverRatio = getContrastRatio(
            colorToRgb(secHoverTextRaw),
            colorToRgb(secHoverBgRaw)
        )
        console.log(
            `- Secondaire Survol   : text = ${secHoverTextRaw}, bg = ${secHoverBgRaw}, ratio = ${secHoverRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
        )
        assert(
            secHoverRatio >= 4.5,
            `Theme ${t.name} - Contraste secondaire survol insuffisant: ${secHoverRatio.toFixed(2)}:1 < 4.5:1`
        )

        const btnSecActive = page.locator('#btn-sec-active')
        const secBox = await btnSecActive.boundingBox()
        await page.mouse.move(secBox.x + secBox.width / 2, secBox.y + secBox.height / 2)
        await page.mouse.down()
        await waitForAnimations(page)
        const secActiveBgRaw = await page.$eval(
            '#btn-sec-active',
            (el) => window.getComputedStyle(el).backgroundColor
        )
        const secActiveTextRaw = await page.$eval(
            '#btn-sec-active',
            (el) => window.getComputedStyle(el).color
        )
        const secActiveRatio = getContrastRatio(
            colorToRgb(secActiveTextRaw),
            colorToRgb(secActiveBgRaw)
        )
        await page.mouse.up()
        console.log(
            `- Secondaire Actif    : text = ${secActiveTextRaw}, bg = ${secActiveBgRaw}, ratio = ${secActiveRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
        )
        assert(
            secActiveRatio >= 4.5,
            `Theme ${t.name} - Contraste secondaire actif insuffisant: ${secActiveRatio.toFixed(2)}:1 < 4.5:1`
        )

        const secDisBgRaw = await page.$eval(
            '#btn-sec-disabled',
            (el) => window.getComputedStyle(el).backgroundColor
        )
        const secDisTextRaw = await page.$eval(
            '#btn-sec-disabled',
            (el) => window.getComputedStyle(el).color
        )
        const secDisRatio = getContrastRatio(colorToRgb(secDisTextRaw), colorToRgb(secDisBgRaw))
        console.log(
            `- Secondaire Desactive: text = ${secDisTextRaw}, bg = ${secDisBgRaw}, ratio = ${secDisRatio.toFixed(2)}:1 (exempte WCAG 1.4.3)`
        )

        // Mesure de la variante Button ghost
        console.log(`Mesure de la variante Button ghost en theme ${t.name.toUpperCase()} :`)
        const ghostIdleTextRaw = await page.$eval(
            '#btn-ghost-idle',
            (el) => window.getComputedStyle(el).color
        )
        const ghostIdleRatio = getContrastRatio(
            colorToRgb(ghostIdleTextRaw),
            colorToRgb(canvasBgRaw)
        )
        console.log(
            `- Ghost Repos         : text = ${ghostIdleTextRaw}, canevas = ${canvasBgRaw}, ratio = ${ghostIdleRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
        )
        assert(
            ghostIdleRatio >= 4.5,
            `Theme ${t.name} - Contraste ghost repos insuffisant: ${ghostIdleRatio.toFixed(2)}:1 < 4.5:1`
        )

        // Mesure de la variante Button danger
        console.log(`Mesure de la variante Button danger en theme ${t.name.toUpperCase()} :`)
        const dangerIdleBgRaw = await page.$eval(
            '#btn-danger-idle',
            (el) => window.getComputedStyle(el).backgroundColor
        )
        const dangerIdleTextRaw = await page.$eval(
            '#btn-danger-idle',
            (el) => window.getComputedStyle(el).color
        )
        const dangerIdleRatio = getContrastRatio(
            colorToRgb(dangerIdleTextRaw),
            colorToRgb(dangerIdleBgRaw)
        )
        console.log(
            `- Danger Repos       : text = ${dangerIdleTextRaw}, bg = ${dangerIdleBgRaw}, ratio = ${dangerIdleRatio.toFixed(2)}:1 (seuil >= 4.5:1)`
        )
        assert(
            dangerIdleRatio >= 4.5,
            `Theme ${t.name} - Contraste danger repos insuffisant: ${dangerIdleRatio.toFixed(2)}:1 < 4.5:1`
        )

        const dangerCanvasRatio = getContrastRatio(
            colorToRgb(dangerIdleBgRaw),
            colorToRgb(canvasBgRaw)
        )
        console.log(
            `- Danger sur canevas : bg = ${dangerIdleBgRaw}, canevas = ${canvasBgRaw}, ratio = ${dangerCanvasRatio.toFixed(2)}:1 (seuil UI >= 3.0:1)`
        )
        assert(
            dangerCanvasRatio >= 3.0,
            `Theme ${t.name} - Fond danger insuffisant sur canevas: ${dangerCanvasRatio.toFixed(2)}:1 < 3.0:1`
        )

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
            `Theme ${t.name} - Contraste danger survol insuffisant: ${dangerHoverRatio.toFixed(2)}:1 < 4.5:1`
        )

        const btnDangerActive = page.locator('#btn-danger-active')
        const dangerBox = await btnDangerActive.boundingBox()
        await page.mouse.move(dangerBox.x + dangerBox.width / 2, dangerBox.y + dangerBox.height / 2)
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
            `Theme ${t.name} - Contraste danger actif insuffisant: ${dangerActiveRatio.toFixed(2)}:1 < 4.5:1`
        )

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
        const inputTextRatio = getContrastRatio(colorToRgb(inputTextRaw), colorToRgb(inputBgRaw))
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
            `- Bordure controle sur canevas : fg = ${inputBorderRaw}, bg = ${canvasBgRaw}, ratio = ${inputBorderRatio.toFixed(2)}:1 (seuil UI au repos >= 1.8:1, ADR-026)`
        )
        assert(
            inputBorderRatio >= 1.8,
            `Theme ${t.name} - Bordure Input sur canevas insuffisante: ${inputBorderRatio.toFixed(2)}:1 < 1.8:1`
        )

        // 4. Bordure survolee sur canevas (bloquante >= 2.0:1)
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
            `- Bordure survolee sur canevas : fg = ${inputBorderHoverRaw}, bg = ${canvasBgRaw}, ratio = ${inputBorderHoverRatio.toFixed(2)}:1 (seuil UI >= 2.0:1)`
        )
        assert(
            inputBorderHoverRatio >= 2.0,
            `Theme ${t.name} - Bordure survolee Input sur canevas insuffisante: ${inputBorderHoverRatio.toFixed(2)}:1 < 2.0:1`
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
        const focusRingRgb = colorToRgb(focusOutlineColorRaw).map((v) => Math.round(v * 255))
        if (['light', 'dark', 'dim', 'oled'].includes(t.name)) {
            assert(
                Math.abs(focusRingRgb[0] - focusRingRgb[1]) <= 2 &&
                    Math.abs(focusRingRgb[1] - focusRingRgb[2]) <= 2,
                `Theme ${t.name} - Anneau focus Input doit etre neutre (chroma nulle, sans teinte cyan): rgb(${focusRingRgb.join(', ')})`
            )
        }

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
        const invalidPhRatio = getContrastRatio(colorToRgb(invalidPhRaw), colorToRgb(inputBgRaw))
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
        console.log(`\nVerification des etats combines Input en theme ${t.name.toUpperCase()} :`)

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
            `Theme ${t.name} - comb 3: bordure invalide attendue ${inputBorderInvalidRaw}, obtenu: ${c3Border}`
        )
        assert.strictEqual(
            c3Cursor,
            'text',
            `Theme ${t.name} - comb 3: curseur text attendu, obtenu: ${c3Cursor}`
        )
        console.log(
            `- 3. Invalide survole            : bordure = ${c3Border}, curseur = ${c3Cursor}`
        )

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
            `Theme ${t.name} - comb 4: bordure repos attendue ${inputBorderRaw}, obtenu: ${c4Border}`
        )
        assert.strictEqual(
            c4Cursor,
            'default',
            `Theme ${t.name} - comb 4: curseur default attendu, obtenu: ${c4Cursor}`
        )
        console.log(
            `- 4. Lecture seule survolee      : bordure = ${c4Border}, curseur = ${c4Cursor}`
        )

        await page.hover('#input-comb-dis-hover')
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
            `Theme ${t.name} - comb 5: bordure desactivee attendue ${inputDisabledBorderRaw}, obtenu: ${c5Border}`
        )
        assert.strictEqual(
            c5Cursor,
            'not-allowed',
            `Theme ${t.name} - comb 5: curseur not-allowed attendu, obtenu: ${c5Cursor}`
        )
        console.log(
            `- 5. Desactive survole           : bordure = ${c5Border}, curseur = ${c5Cursor}`
        )

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
        const c6Width = await page.$eval(
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
            inputBorderInvalidRaw,
            `Theme ${t.name} - comb 6: anneau attendu ${inputBorderInvalidRaw}, obtenu: ${c6Outline}`
        )
        assert.strictEqual(
            c6Width,
            '2px',
            `Theme ${t.name} - comb 6: largeur anneau attendue 2px, obtenu: ${c6Width}`
        )
        console.log(
            `- 6. Invalide avec focus clavier : bordure = ${c6Border}, anneau = ${c6Outline}, largeur = ${c6Width}`
        )

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
        const c7Cursor = await page.$eval(
            '#input-comb-ro-focus',
            (el) => window.getComputedStyle(el).cursor
        )
        assert.strictEqual(
            c7Border,
            focusOutlineColorRaw,
            `Theme ${t.name} - comb 7: bordure focus attendue ${focusOutlineColorRaw}, obtenu: ${c7Border}`
        )
        assert.strictEqual(
            c7Outline,
            focusOutlineColorRaw,
            `Theme ${t.name} - comb 7: anneau focus attendu ${focusOutlineColorRaw}, obtenu: ${c7Outline}`
        )
        assert.strictEqual(
            c7Cursor,
            'default',
            `Theme ${t.name} - comb 7: curseur default attendu, obtenu: ${c7Cursor}`
        )
        console.log(
            `- 7. Lecture seule avec focus    : bordure = ${c7Border}, anneau = ${c7Outline}, curseur = ${c7Cursor}`
        )

        // 12. Mesures du composant Field (F2 et F3)
        console.log(`\nMesure du composant Field (F2/F3) en theme ${t.name.toUpperCase()} :`)

        // 1. Texte d'aide (text-secondary) sur canevas (F2)
        const fieldHintRaw = await page.$eval(
            '#field-hint-sample',
            (el) => window.getComputedStyle(el).color
        )
        const fieldHintRatio = getContrastRatio(colorToRgb(fieldHintRaw), colorToRgb(canvasBgRaw))
        console.log(
            `- Texte aide sur canevas : fg = ${fieldHintRaw}, bg = ${canvasBgRaw}, ratio = ${fieldHintRatio.toFixed(2)}:1 (seuil >= 4.5:1, vise 4.8:1)`
        )
        assert(
            fieldHintRatio >= 4.5,
            `Theme ${t.name} - Contraste texte aide Field insuffisant: ${fieldHintRatio.toFixed(2)}:1 < 4.5:1`
        )

        // 2. Texte d'erreur (danger-solid) sur canevas (F3)
        const fieldErrorRaw = await page.$eval(
            '#field-error-sample',
            (el) => window.getComputedStyle(el).color
        )
        const fieldErrorRatio = getContrastRatio(colorToRgb(fieldErrorRaw), colorToRgb(canvasBgRaw))
        console.log(
            `- Texte erreur sur canevas : fg = ${fieldErrorRaw}, bg = ${canvasBgRaw}, ratio = ${fieldErrorRatio.toFixed(2)}:1 (seuil >= 4.5:1, vise 4.8:1)`
        )
        assert(
            fieldErrorRatio >= 4.5,
            `Theme ${t.name} - Contraste texte erreur Field insuffisant: ${fieldErrorRatio.toFixed(2)}:1 < 4.5:1`
        )

        await page.close()
    }

    // Balayage teintes de marque (Light & Dark)
    for (const t of themes) {
        console.log(
            `\nBalayage teintes de marque pour focus sur canevas en theme ${t.name.toUpperCase()} :`
        )
        const pageBrand = await browser.newPage()
        for (let h = 0; h < 360; h += 30) {
            await pageBrand.setContent(`
                <style>
                    ${fullCss}
                    :root { --mr-ref-brand-hue: ${h}; }
                </style>
                <div ${t.attr} style="padding: 10px;">
                    <button class="mr-btn" id="btn-brand">Focus</button>
                </div>
            `)
            await pageBrand.focus('#btn-brand')
            await waitForAnimations(pageBrand)
            const canvasBg = await pageBrand.$eval(
                `[${t.attr.replace(/"/g, '')}]`,
                (el) => window.getComputedStyle(el).backgroundColor
            )
            const outlineColor = await pageBrand.$eval(
                '#btn-brand',
                (el) => window.getComputedStyle(el).outlineColor
            )
            const ratio = getContrastRatio(colorToRgb(outlineColor), colorToRgb(canvasBg))
            assert(
                ratio >= 3.0,
                `Theme ${t.name} H=${h}: Contraste focus insuffisant: ${ratio.toFixed(2)}:1 < 3.0:1`
            )
            const margin = marginRgb(colorToRgb(outlineColor))
            console.log(
                `H=${String(h).padStart(3)} | marge sRGB: ${margin.toFixed(4)} | Focus/UI(clip: ${ratio.toFixed(2)}, red: ${ratio.toFixed(2)}) -> OK`
            )
        }
        await pageBrand.close()
    }

    // Test des portees imbriquees (dark > light, light > dark, dim)
    console.log('\nTest des portees imbriquees (dark > light, light > dark, dim) :')
    const pageNested = await browser.newPage()
    await pageNested.setContent(`
        <style>
            ${fullCss}
        </style>
        <div data-theme="dark" id="dark-root">
            <div data-theme="light" id="nested-light">
                <button class="mr-btn" id="btn-nested-light">Light in Dark</button>
            </div>
        </div>
        <div data-theme="light" id="light-root">
            <div data-theme="dark" id="nested-dark">
                <button class="mr-btn" id="btn-nested-dark">Dark in Light</button>
            </div>
        </div>
        <div data-theme="dim" id="dim-root">
            <button class="mr-btn" id="btn-dim">Dim</button>
        </div>
        <div data-theme="oled" id="oled-root">
            <button class="mr-btn" id="btn-oled">OLED</button>
        </div>
        <div data-theme="slate" id="slate-root">
            <button class="mr-btn" id="btn-slate">Slate</button>
        </div>
        <div data-theme="ocean" id="ocean-root">
            <button class="mr-btn" id="btn-ocean">Ocean</button>
        </div>
        <div data-theme="night" id="night-root">
            <button class="mr-btn" id="btn-night">Night</button>
        </div>
    `)

    // 1. Light dans Dark
    const nlCs = await pageNested.$eval(
        '#nested-light',
        (el) => window.getComputedStyle(el).colorScheme
    )
    const nlCanvas = await pageNested.$eval('#nested-light', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
    )
    const nlInverse = await pageNested.$eval('#nested-light', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-inverse').trim()
    )
    const nlOnInverse = await pageNested.$eval('#nested-light', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-text-on-inverse').trim()
    )
    console.log(
        `- nested-light: color-scheme = ${nlCs}, canvas = ${nlCanvas}, bg-inverse = ${nlInverse}, text-on-inverse = ${nlOnInverse}`
    )
    assert.strictEqual(nlCs, 'light', 'nested-light doit avoir color-scheme: light')
    assert(nlCanvas.includes('0.955'), 'nested-light canvas doit valoir 0.955 (clair)')
    assert(nlInverse.includes('0.22'), 'nested-light bg-inverse doit valoir 0.22 (clair)')
    assert(nlOnInverse.includes('0.955'), 'nested-light text-on-inverse doit valoir 0.955 (clair)')

    // 2. Dark dans Light
    const ndCs = await pageNested.$eval(
        '#nested-dark',
        (el) => window.getComputedStyle(el).colorScheme
    )
    const ndCanvas = await pageNested.$eval('#nested-dark', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
    )
    const ndInverse = await pageNested.$eval('#nested-dark', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-inverse').trim()
    )
    const ndOnInverse = await pageNested.$eval('#nested-dark', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-text-on-inverse').trim()
    )
    console.log(
        `- nested-dark : color-scheme = ${ndCs}, canvas = ${ndCanvas}, bg-inverse = ${ndInverse}, text-on-inverse = ${ndOnInverse}`
    )
    assert.strictEqual(ndCs, 'dark', 'nested-dark doit avoir color-scheme: dark')
    assert(ndCanvas.includes('0.17'), 'nested-dark canvas doit valoir 0.17 (sombre)')
    assert(ndInverse.includes('0.955'), 'nested-dark bg-inverse doit valoir 0.955 (sombre)')
    assert(ndOnInverse.includes('0.17'), 'nested-dark text-on-inverse doit valoir 0.17 (sombre)')

    // 3. Dim alias
    const dimCs = await pageNested.$eval(
        '#dim-root',
        (el) => window.getComputedStyle(el).colorScheme
    )
    const dimCanvas = await pageNested.$eval('#dim-root', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
    )
    const dimInverse = await pageNested.$eval('#dim-root', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-inverse').trim()
    )
    const dimOnInverse = await pageNested.$eval('#dim-root', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-text-on-inverse').trim()
    )
    console.log(
        `- dim-alias   : color-scheme = ${dimCs}, canvas = ${dimCanvas}, bg-inverse = ${dimInverse}, text-on-inverse = ${dimOnInverse}`
    )
    assert.strictEqual(dimCs, 'dark', 'dim doit resoudre color-scheme: dark')
    assert(dimCanvas.includes('0.17'), 'dim canvas doit valoir 0.17 (sombre)')
    assert(dimInverse.includes('0.955'), 'dim bg-inverse doit valoir 0.955 (sombre)')
    assert(dimOnInverse.includes('0.17'), 'dim text-on-inverse doit valoir 0.17 (sombre)')

    // 4. OLED theme
    const oledCs = await pageNested.$eval(
        '#oled-root',
        (el) => window.getComputedStyle(el).colorScheme
    )
    const oledCanvas = await pageNested.$eval('#oled-root', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
    )
    const oledSunken = await pageNested.$eval('#oled-root', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-sunken').trim()
    )
    console.log(
        `- oled-theme  : color-scheme = ${oledCs}, canvas = ${oledCanvas}, bg-sunken = ${oledSunken}`
    )
    assert.strictEqual(oledCs, 'dark', 'oled doit resoudre color-scheme: dark')
    assert(
        oledCanvas.includes('0 0 0') || oledCanvas === 'oklch(0 0 0)',
        'oled canvas doit valoir noir absolu oklch(0 0 0)'
    )
    assert(oledSunken.includes('0.12'), 'oled bg-sunken doit valoir oklch(0.12 ...)')

    // 5. Slate theme
    const slateCs = await pageNested.$eval(
        '#slate-root',
        (el) => window.getComputedStyle(el).colorScheme
    )
    const slateCanvas = await pageNested.$eval('#slate-root', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
    )
    console.log(`- slate-theme : color-scheme = ${slateCs}, canvas = ${slateCanvas}`)
    assert.strictEqual(slateCs, 'dark', 'slate doit resoudre color-scheme: dark')
    assert(slateCanvas.includes('0.18'), 'slate canvas doit valoir 0.18 (ardoise acier)')

    // 6. Ocean theme
    const oceanCs = await pageNested.$eval(
        '#ocean-root',
        (el) => window.getComputedStyle(el).colorScheme
    )
    const oceanCanvas = await pageNested.$eval('#ocean-root', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
    )
    console.log(`- ocean-theme : color-scheme = ${oceanCs}, canvas = ${oceanCanvas}`)
    assert.strictEqual(oceanCs, 'dark', 'ocean doit resoudre color-scheme: dark')
    assert(oceanCanvas.includes('0.18'), 'ocean canvas doit valoir 0.18 (bleu marine profond)')

    // 7. Night theme (Tokyo Night)
    const nightCs = await pageNested.$eval(
        '#night-root',
        (el) => window.getComputedStyle(el).colorScheme
    )
    const nightCanvas = await pageNested.$eval('#night-root', (el) =>
        window.getComputedStyle(el).getPropertyValue('--mr-bg-canvas').trim()
    )
    console.log(`- night-theme : color-scheme = ${nightCs}, canvas = ${nightCanvas}`)
    assert.strictEqual(nightCs, 'dark', 'night doit resoudre color-scheme: dark')
    assert(nightCanvas.includes('0.18'), 'night canvas doit valoir 0.18 (Tokyo Night indigo)')

    await pageNested.close()
}
