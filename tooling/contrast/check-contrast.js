import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
    checkThemePairs,
    getContrastRatio,
    oklchToRgb,
    parseCssVariables,
    parseOklch,
} from './contrast-checker.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')

// 1. Preuve en negatif : verifier qu'une paire invalide echoue
function testNegativeProof() {
    console.log('Preuve en negatif du test de contraste...')
    const invalidPair = [
        {
            name: 'Paire invalide test negatif',
            color1: [0.8, 0, 0], // gris clair
            color2: [1, 0, 0], // blanc
            threshold: 4.5,
        },
    ]
    const { errors, results } = checkThemePairs('test-fixture', invalidPair)
    assert.strictEqual(
        errors.length,
        1,
        'Le test negatif DOIT lever 1 erreur sur ratio insuffisant'
    )
    assert(errors[0].includes('Ratio'), 'Le message doit expliciter le ratio insuffisant')
    console.log(
        `OK: Preuve en negatif reussie (ratio ${results[0].ratio} < seuil 4.5 detecte et rejete).`
    )
}

// 2. Verification des paires des themes reels
function run() {
    testNegativeProof()

    console.log('\nVerification du contraste WCAG 2.2 AA sur les themes existants...')

    const refPath = path.join(ROOT, 'packages/styles/src/tokens/ref.css')
    const semanticPath = path.join(ROOT, 'packages/styles/src/tokens/semantic.css')
    const darkPath = path.join(ROOT, 'packages/styles/src/themes/dark.css')

    if (!fs.existsSync(semanticPath) || !fs.existsSync(refPath)) {
        console.error('Fichier de tokens introuvable.')
        process.exit(1)
    }

    const refCss = fs.readFileSync(refPath, 'utf8')
    const refVars = parseCssVariables(refCss)

    const semanticCss = fs.readFileSync(semanticPath, 'utf8')
    const semanticVars = parseCssVariables(semanticCss)
    const lightContext = { ...refVars, ...semanticVars }

    // Verifier si les tokens de Button sont definis
    if (!semanticVars['--mr-accent-solid'] || !semanticVars['--mr-text-primary']) {
        console.log('Tokens de couleurs non encore crees dans semantic.css. Verification reportee.')
        return
    }

    const lightAccentSolid = parseOklch(semanticVars['--mr-accent-solid'], lightContext)
    const lightAccentOnSolid = parseOklch(semanticVars['--mr-accent-on-solid'], lightContext)
    const lightTextPrimary = parseOklch(semanticVars['--mr-text-primary'], lightContext)
    const lightTextSecondary = parseOklch(semanticVars['--mr-text-secondary'], lightContext)
    const lightBgRaised = parseOklch(semanticVars['--mr-bg-raised'], lightContext)
    const lightBgCanvas = parseOklch(semanticVars['--mr-bg-canvas'], lightContext)
    const lightDangerSolid = parseOklch(semanticVars['--mr-danger-solid'], lightContext)
    const lightDangerOnSolid = parseOklch(semanticVars['--mr-danger-on-solid'], lightContext)
    const lightBorderControl = parseOklch(semanticVars['--mr-border-control'], lightContext)

    const lightPairs = [
        {
            name: 'Button secondary: text-primary sur bg-raised',
            color1: lightTextPrimary,
            color2: lightBgRaised,
            threshold: 4.5,
        },
        {
            name: 'Button ghost: text-secondary sur bg-canvas',
            color1: lightTextSecondary,
            color2: lightBgCanvas,
            threshold: 4.5,
        },
        {
            name: 'Button primary: accent-on-solid sur accent-solid',
            color1: lightAccentOnSolid,
            color2: lightAccentSolid,
            threshold: 4.5,
        },
        {
            name: 'Button danger: danger-on-solid sur danger-solid',
            color1: lightDangerOnSolid,
            color2: lightDangerSolid,
            threshold: 4.5,
        },
        {
            name: 'Button secondary border: border-control sur bg-canvas',
            color1: lightBorderControl,
            color2: lightBgCanvas,
            threshold: 3.0,
        },
    ].filter((p) => p.color1 && p.color2)

    const lightCheck = checkThemePairs('light', lightPairs)
    for (const res of lightCheck.results) {
        console.log(
            `[light] ${res.name} : ${res.ratio}:1 (seuil ${res.threshold}:1) -> ${res.passed ? 'OK' : 'ECHEC'}`
        )
    }

    let allErrors = [...lightCheck.errors]

    if (fs.existsSync(darkPath)) {
        const darkCss = fs.readFileSync(darkPath, 'utf8')
        const darkVars = parseCssVariables(darkCss)
        const darkContext = { ...refVars, ...semanticVars, ...darkVars }

        const darkAccentSolid = parseOklch(darkVars['--mr-accent-solid'], darkContext)
        const darkAccentOnSolid = parseOklch(darkVars['--mr-accent-on-solid'], darkContext)
        const darkTextPrimary = parseOklch(darkVars['--mr-text-primary'], darkContext)
        const darkTextSecondary = parseOklch(darkVars['--mr-text-secondary'], darkContext)
        const darkBgRaised = parseOklch(darkVars['--mr-bg-raised'], darkContext)
        const darkBgCanvas = parseOklch(darkVars['--mr-bg-canvas'], darkContext)
        const darkDangerSolid = parseOklch(darkVars['--mr-danger-solid'], darkContext)
        const darkDangerOnSolid = parseOklch(darkVars['--mr-danger-on-solid'], darkContext)
        const darkBorderControl = parseOklch(darkVars['--mr-border-control'], darkContext)

        const darkPairs = [
            {
                name: 'Button secondary: text-primary sur bg-raised',
                color1: darkTextPrimary,
                color2: darkBgRaised,
                threshold: 4.5,
            },
            {
                name: 'Button ghost: text-secondary sur bg-canvas',
                color1: darkTextSecondary,
                color2: darkBgCanvas,
                threshold: 4.5,
            },
            {
                name: 'Button primary: accent-on-solid sur accent-solid',
                color1: darkAccentOnSolid,
                color2: darkAccentSolid,
                threshold: 4.5,
            },
            {
                name: 'Button danger: danger-on-solid sur danger-solid',
                color1: darkDangerOnSolid,
                color2: darkDangerSolid,
                threshold: 4.5,
            },
            {
                name: 'Button secondary border: border-control sur bg-canvas',
                color1: darkBorderControl,
                color2: darkBgCanvas,
                threshold: 3.0,
            },
        ].filter((p) => p.color1 && p.color2)

        const darkCheck = checkThemePairs('dark', darkPairs)
        for (const res of darkCheck.results) {
            console.log(
                `[dark] ${res.name} : ${res.ratio}:1 (seuil ${res.threshold}:1) -> ${res.passed ? 'OK' : 'ECHEC'}`
            )
        }
        allErrors = [...allErrors, ...darkCheck.errors]
    }

    if (allErrors.length > 0) {
        console.error('\nECHEC CONTRASTE :')
        for (const err of allErrors) {
            console.error(`- ${err}`)
        }
        process.exit(1)
    }

    console.log('\nToutes les paires de contraste respectent les seuils WCAG AA.')
}

run()
