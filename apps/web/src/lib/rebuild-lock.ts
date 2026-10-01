/**
 * Skips conditionnels au verrou de reconstruction (PLAN.md 0.8).
 *
 * Un `it.skip` écrit en dur survit à la suppression de `packages/tokens/rebuild.json` :
 * le chantier se termine, les tests restent muets et plus rien ne prouve que le
 * système est revenu. Le skip doit être **conditionné au verrou**, pour qu'en
 * levant le verrou les tests reviennent et *échouent*. C'est la seule preuve
 * qu'on ne masque rien.
 *
 *   import { duringRebuild } from '../lib/rebuild-lock'
 *   const itRebuild = duringRebuild(it)
 *   itRebuild('nom du test', () => { … })
 *
 * Tant que le verrou est actif, le test est neutralisé et doit être déclaré
 * dans `packages/tokens/test-skips.json`, avec sa raison et ses phases de
 * réactivation. `pnpm check:test-skips` échoue sinon.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const LOCK = join(here, '..', '..', '..', '..', 'packages', 'tokens', 'rebuild.json')

/** Le verrou de reconstruction est-il actif ? */
export function isRebuilding() {
    if (!existsSync(LOCK)) return false
    try {
        return readFileSync(LOCK, 'utf8').includes('"active": true')
    } catch {
        return false
    }
}

/**
 * Retourne `it` si le verrou est levé (le test s'exécute et doit passer),
 * `it.skip` si le verrou est actif.
 *
 * `fn` est l'implémentation `it` fournie par le runner, pour ne pas dépendre
 * d'un runner en particulier : vitest expose la même forme.
 */
type Skipable = { skip: unknown }
export function duringRebuild<T extends Skipable>(fn: T): T {
    return isRebuilding() ? (fn.skip as T) : fn
}
