import assert from 'node:assert'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import stylelint from 'stylelint'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const configFile = path.resolve(__dirname, '../../.stylelintrc.js')

async function run() {
    console.log('Test negatif Stylelint: monority/no-raw-values...')

    // 1. Prouver en negatif que la regle echoue sur une fixture avec des valeurs brutes
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

    console.log('OK: Rejet negatif prouve sur fixture invalide (4/4 violations detectees).')

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
}

run().catch((err) => {
    console.error('ECHEC test negatif stylelint:', err)
    process.exit(1)
})
