import assert from 'node:assert'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import stylelint from 'stylelint'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const configFile = path.resolve(__dirname, '../../.stylelintrc.js')

async function run() {
    console.log('Test Stylelint: monority/no-raw-values...')

    // 1. Prouver en negatif que la regle echoue sur une recette ou fichier hors tokens/themes avec valeurs brutes
    const invalidFixture = path.resolve(__dirname, '__fixtures__/invalid-raw-value.css')
    const resultInvalid = await stylelint.lint({
        files: invalidFixture,
        configFile,
    })

    assert.strictEqual(resultInvalid.errored, true, 'La fixture invalide DOIT etre en erreur')
    const warnings = resultInvalid.results[0]?.warnings ?? []
    assert(warnings.length >= 4, `Attendu au moins 4 avertissements, recu: ${warnings.length}`)

    const messages = warnings.map((w) => w.text)
    assert(
        messages.some((m) => m.includes('16px')),
        '16px doit etre detecte'
    )
    assert(
        messages.some((m) => m.includes('#ff0000')),
        '#ff0000 doit etre detecte'
    )
    assert(
        messages.some((m) => m.includes('oklch')),
        'oklch(...) doit etre detecte'
    )
    assert(
        messages.some((m) => m.includes('200ms')),
        '200ms doit etre detecte'
    )

    console.log('OK: Rejet negatif prouve sur recette invalide (4/4 violations detectees).')

    // 2. Prouver en positif que la regle passe sur une fixture valide
    const validFixture = path.resolve(__dirname, '__fixtures__/valid.css')
    const resultValid = await stylelint.lint({
        files: validFixture,
        configFile,
    })

    assert.strictEqual(resultValid.errored, false, 'La fixture valide NE DOIT PAS etre en erreur')
    const validWarnings = resultValid.results[0]?.warnings ?? []
    assert.strictEqual(validWarnings.length, 0, 'Aucun avertissement attendu sur fixture valide')

    console.log('OK: Validation positive confirmee sur fixture valide.')

    // 3. Prouver en positif que les valeurs brutes dans tokens/ ou themes/ sont autorisees (ADR-018)
    const codeWithRawValues = `
:root {
    --mr-space-4: 16px;
    --mr-accent-solid: oklch(0.50 0.084 200);
}
`
    const resultTokens = await stylelint.lint({
        code: codeWithRawValues,
        codeFilename: 'packages/styles/src/tokens/semantic.css',
        configFile,
    })
    assert.strictEqual(
        resultTokens.errored,
        false,
        'Les valeurs brutes dans tokens/semantic.css DOIVENT etre autorisees (ADR-018)'
    )

    const resultThemes = await stylelint.lint({
        code: codeWithRawValues,
        codeFilename: 'packages/styles/src/themes/dark.css',
        configFile,
    })
    assert.strictEqual(
        resultThemes.errored,
        false,
        'Les valeurs brutes dans themes/ DOIVENT etre autorisees (ADR-018)'
    )

    console.log('OK: Exemption positive confirmee pour tokens/ et themes/ (ADR-018).')

    // 4. Prouver en negatif que selector-max-specificity "0,2,0" echoue sur un selecteur 0,3,0
    const invalidSpecFixture = path.resolve(__dirname, '__fixtures__/invalid-specificity.css')
    const resultInvalidSpec = await stylelint.lint({
        files: invalidSpecFixture,
        configFile,
    })
    assert.strictEqual(
        resultInvalidSpec.errored,
        true,
        'La fixture invalid-specificity DOIT etre en erreur'
    )
    const specWarnings = resultInvalidSpec.results[0]?.warnings ?? []
    assert(
        specWarnings.some((w) => w.rule === 'selector-max-specificity'),
        'selector-max-specificity doit etre declenchee sur selecteur 0,3,0'
    )
    console.log(
        'OK: Rejet negatif prouve pour selector-max-specificity (selecteur 0,3,0 detecte et rejete).'
    )

    // 5. Prouver en positif que les recettes (button.css) respectent selector-max-specificity "0,2,0"
    const buttonCssPath = path.resolve(__dirname, '../../packages/styles/src/recipes/button.css')
    const resultButtonSpec = await stylelint.lint({
        files: buttonCssPath,
        configFile,
    })
    assert.strictEqual(
        resultButtonSpec.errored,
        false,
        'button.css DOIT respecter selector-max-specificity 0,2,0'
    )
    assert.strictEqual(
        resultButtonSpec.results[0]?.warnings?.length ?? 0,
        0,
        'Aucun avertissement de specificite attendu sur button.css'
    )
    console.log(
        'OK: Validation positive confirmee pour selector-max-specificity sur button.css (<= 0,2,0).'
    )

    // 6. Prouver en positif que checkbox.css respecte selector-max-specificity "0,2,0"
    const checkboxCssPath = path.resolve(
        __dirname,
        '../../packages/styles/src/recipes/checkbox.css'
    )
    const resultCheckboxSpec = await stylelint.lint({
        files: checkboxCssPath,
        configFile,
    })
    assert.strictEqual(
        resultCheckboxSpec.errored,
        false,
        'checkbox.css DOIT respecter selector-max-specificity 0,2,0'
    )
    assert.strictEqual(
        resultCheckboxSpec.results[0]?.warnings?.length ?? 0,
        0,
        'Aucun avertissement de specificite attendu sur checkbox.css'
    )
    console.log(
        'OK: Validation positive confirmee pour selector-max-specificity sur checkbox.css (<= 0,2,0).'
    )

    // 7. Prouver en positif que switch.css respecte selector-max-specificity "0,2,0"
    const switchCssPath = path.resolve(__dirname, '../../packages/styles/src/recipes/switch.css')
    const resultSwitchSpec = await stylelint.lint({
        files: switchCssPath,
        configFile,
    })
    assert.strictEqual(
        resultSwitchSpec.errored,
        false,
        'switch.css DOIT respecter selector-max-specificity 0,2,0'
    )
    assert.strictEqual(
        resultSwitchSpec.results[0]?.warnings?.length ?? 0,
        0,
        'Aucun avertissement de specificite attendu sur switch.css'
    )
    console.log(
        'OK: Validation positive confirmee pour selector-max-specificity sur switch.css (<= 0,2,0).'
    )

    // 8. Prouver en positif que radio-group.css respecte selector-max-specificity "0,2,0"
    const radioGroupCssPath = path.resolve(
        __dirname,
        '../../packages/styles/src/recipes/radio-group.css'
    )
    const resultRadioGroupSpec = await stylelint.lint({
        files: radioGroupCssPath,
        configFile,
    })
    assert.strictEqual(
        resultRadioGroupSpec.errored,
        false,
        'radio-group.css DOIT respecter selector-max-specificity 0,2,0'
    )
    assert.strictEqual(
        resultRadioGroupSpec.results[0]?.warnings?.length ?? 0,
        0,
        'Aucun avertissement de specificite attendu sur radio-group.css'
    )
    console.log(
        'OK: Validation positive confirmee pour selector-max-specificity sur radio-group.css (<= 0,2,0).'
    )

    // 9. Prouver en positif que slider.css respecte selector-max-specificity "0,2,0"
    const sliderCssPath = path.resolve(__dirname, '../../packages/styles/src/recipes/slider.css')
    const resultSliderSpec = await stylelint.lint({
        files: sliderCssPath,
        configFile,
    })
    assert.strictEqual(
        resultSliderSpec.errored,
        false,
        'slider.css DOIT respecter selector-max-specificity 0,2,0'
    )
    assert.strictEqual(
        resultSliderSpec.results[0]?.warnings?.length ?? 0,
        0,
        'Aucun avertissement de specificite attendu sur slider.css'
    )
    console.log(
        'OK: Validation positive confirmee pour selector-max-specificity sur slider.css (<= 0,2,0).'
    )

    // 10. Prouver en positif que number-input.css respecte selector-max-specificity "0,2,0"
    const numberInputCssPath = path.resolve(
        __dirname,
        '../../packages/styles/src/recipes/number-input.css'
    )
    const resultNumberInputSpec = await stylelint.lint({
        files: numberInputCssPath,
        configFile,
    })
    assert.strictEqual(
        resultNumberInputSpec.errored,
        false,
        'number-input.css DOIT respecter selector-max-specificity 0,2,0'
    )
    assert.strictEqual(
        resultNumberInputSpec.results[0]?.warnings?.length ?? 0,
        0,
        'Aucun avertissement de specificite attendu sur number-input.css'
    )
    console.log(
        'OK: Validation positive confirmee pour selector-max-specificity sur number-input.css (<= 0,2,0).'
    )

    // 11. Prouver en positif que date-picker.css respecte selector-max-specificity "0,2,0"
    const datePickerCssPath = path.resolve(
        __dirname,
        '../../packages/styles/src/recipes/date-picker.css'
    )
    const resultDatePickerSpec = await stylelint.lint({
        files: datePickerCssPath,
        configFile,
    })
    assert.strictEqual(
        resultDatePickerSpec.errored,
        false,
        'date-picker.css DOIT respecter selector-max-specificity 0,2,0'
    )
    assert.strictEqual(
        resultDatePickerSpec.results[0]?.warnings?.length ?? 0,
        0,
        'Aucun avertissement de specificite attendu sur date-picker.css'
    )
    console.log(
        'OK: Validation positive confirmee pour selector-max-specificity sur date-picker.css (<= 0,2,0).'
    )

    // 12. Prouver en positif que spinner.css respecte selector-max-specificity "0,2,0"
    const spinnerCssPath = path.resolve(__dirname, '../../packages/styles/src/recipes/spinner.css')
    const resultSpinnerSpec = await stylelint.lint({
        files: spinnerCssPath,
        configFile,
    })
    assert.strictEqual(
        resultSpinnerSpec.errored,
        false,
        'spinner.css DOIT respecter selector-max-specificity 0,2,0'
    )
    assert.strictEqual(
        resultSpinnerSpec.results[0]?.warnings?.length ?? 0,
        0,
        'Aucun avertissement de specificite attendu sur spinner.css'
    )
    console.log(
        'OK: Validation positive confirmee pour selector-max-specificity sur spinner.css (<= 0,2,0).'
    )
}

run().catch((err) => {
    console.error('ECHEC test stylelint:', err)
    process.exit(1)
})
