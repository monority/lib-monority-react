#!/usr/bin/env node
/**
 * Phase 2a — build en chaine tokens -> @monority/ui.
 *
 * Pourquoi : `@monority/ui` embarque le CSS (tsup) et `apps/web` consomme
 * `packages/ui/dist/index.css`. Un `pnpm --filter @monority/tokens build`
 * seul regenere `packages/styles/src/tokens/generated/*.css` sans toucher au
 * bundle consomme : le rendu ne bouge pas, sans avertissement.
 *
 * Ce script enchaîne donc les deux etats :
 *   1. packages/tokens        -> packages/styles/src/tokens/generated/*.css
 *   2. packages/ui (tsup)      -> packages/ui/dist/index.css  (consomme par l'app)
 *
 *   node packages/tokens/scripts/build-downstream.mjs
 *   [--web]  construit aussi apps/web (plus lent, pour les captures)
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const withWeb = process.argv.includes('--web')

function run(label, filter) {
    process.stdout.write(`\n[build:downstream] ${label}\n`)
    const r = spawnSync('pnpm', ['--filter', filter, 'build'], {
        cwd: repoRoot,
        stdio: 'inherit',
        shell: true,
    })
    if (r.status !== 0) {
        console.error(`[build:downstream] ECHEC sur ${label} (${filter})`)
        process.exit(r.status ?? 1)
    }
}

run('tokens  -> styles/src/tokens/generated', '@monority/tokens')
run('tokens  -> ui/dist (CSS embarque)', '@monority/ui')
if (withWeb) run('ui     -> apps/web/dist', '@monority/web')

console.log(
    `\n[build:downstream] OK${withWeb ? ' (tokens + ui + web)' : ' (tokens + ui)'}. ` +
        'Le bundle consomme par apps/web est a jour.'
)
