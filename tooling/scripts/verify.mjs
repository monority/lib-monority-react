#!/usr/bin/env node
/**
 * `pnpm verify` — l'unique porte de preuve du dépôt.
 *
 * Toutes les vérifications de fin de commit passent par ici, dans cet ordre
 * fixe. L'ordre n'est pas arbitraire : du plus rapide et le moins dépendant au
 * plus lent et le plus dépendant. Un `format:check` raté en 2 s évite de lancer
 * un `typecheck` de 32 s.
 *
 *   format:check    mise en forme         ~2 s
 *   typecheck       types                  ~32 s
 *   lint:css        cliquet CSS            ~3 s
 *   test:stylelint  règles maison          ~1 s
 *   test:test-skips registre de skips      ~1 s
 *   test:audit-tokens cycles et niveaux    ~1 s
 *   test:scale-rules  pas et plafonds      ~1 s
 *   test            tokens, ui, web        ~30 s
 *   build           bundles                ~6 s
 *   check:test-skips garde des skips      ~1 s
 *   audit:tokens    graphe de tokens      ~2 s
 *   audit:scope     perimetre d'audit      ~1 s
 *
 * Chaque étape affiche son nom, son code de sortie et sa durée. En cas d'échec
 * le script s'arrête : les étapes suivantes dépendent de la précédente, et
 * enchaîner sur un dépôt cassé ne produit que du bruit.
 *
 *   pnpm verify              ordre fixe, s'arrête au premier échec
 *   pnpm verify -- --all     exécute tout, rapporte tous les échecs
 */
import { spawnSync } from 'node:child_process'

const ALL = process.argv.includes('--all')

const STEPS = [
    { name: 'format:check', cmd: 'format:check' },
    { name: 'typecheck', cmd: 'typecheck' },
    { name: 'lint:css', cmd: 'lint:css' },
    { name: 'test:stylelint', cmd: 'test:stylelint' },
    { name: 'test:audit-scope', cmd: 'test:audit-scope' },
    { name: 'test:test-skips', cmd: 'test:test-skips' },
    { name: 'test:audit-tokens', cmd: 'test:audit-tokens' },
    { name: 'test:scale-rules', cmd: 'test:scale-rules' },
    { name: 'test:tokens', cmd: '--filter @monority/tokens test' },
    { name: 'test:ui', cmd: '--filter @monority/ui test' },
    { name: 'test:web', cmd: '--filter @monority/web test' },
    { name: 'test:token-pattern', cmd: 'test:token-pattern' },
    { name: 'build', cmd: 'build' },
    { name: 'check:test-skips', cmd: 'check:test-skips' },
    { name: 'audit:tokens', cmd: 'audit:tokens' },
    { name: 'audit:scope', cmd: 'audit:scope' },
]

const results = []

for (const [index, step] of STEPS.entries()) {
    const started = Date.now()
    const proc = spawnSync('pnpm', ['run', ...step.cmd.split(' ')], {
        stdio: 'inherit',
        shell: process.platform === 'win32',
    })
    const seconds = ((Date.now() - started) / 1000).toFixed(1)
    const code = proc.status ?? 1
    results.push({ ...step, code, seconds })

    const mark = code === 0 ? 'OK  ' : 'FAIL'
    console.log(`── [${index + 1}/${STEPS.length}] ${step.name.padEnd(18)} ${mark} ${seconds}s`)

    if (code !== 0 && !ALL) {
        console.log(`\nverify ÉCHEC à l'étape « ${step.name} » — arrêt.`)
        console.log('Les étapes suivantes dépendent de celle-ci.')
        break
    }
}

const failed = results.filter((r) => r.code !== 0)
const ran = results.length

console.log('\n══ verify ══════════════════════════════════════')
for (const r of results) {
    console.log(
        `  ${r.code === 0 ? 'OK  ' : 'FAIL'} ${r.name.padEnd(18)} ${r.seconds.padStart(6)}s`
    )
}
console.log(
    `  ${failed.length === 0 ? `TOUT PASSE (${ran}/${STEPS.length} étapes)` : `${failed.length} ÉCHEC(S) sur ${ran} exécutée(s)`}`
)
process.exit(failed.length === 0 ? 0 : 1)
