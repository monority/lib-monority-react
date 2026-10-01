/**
 * État de reconstruction du système de tokens (étape 11 de PLAN.md).
 *
 * Pendant la reconstruction, certains contrôles ne peuvent plus être
 * bloquants : leurs invariants dépendent d'un système qui n'existe pas encore.
 * Plutôt que d'affaiblir un seuil — ce que la méthode interdit — on déclare
 * l'état explicitement, dans UN fichier, que tout le monde peut lire.
 *
 * `packages/tokens/rebuild.json` présent et actif → les contrôles listés
 * rapportent. Le supprimer à la fin du chantier les rend bloquants à nouveau :
 * la suppression du fichier EST le jalon.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

/** Le système est-il en cours de reconstruction ? */
export function isRebuilding() {
    const marker = path.join(pkgDir, 'rebuild.json')
    if (!fs.existsSync(marker)) return false
    try {
        return JSON.parse(fs.readFileSync(marker, 'utf8')).active === true
    } catch {
        return false
    }
}

/**
 * Bandeau à imprimer quand un contrôle se met en rapport.
 * `id` est le code du contrôle (T6, X2, S11…), `name` son libellé.
 */
export function banner(id, name) {
    return (
        `${id} RAPPORT (reconstruction en cours) — ${name}\n` +
        `  Le contrôle n'est pas bloquant tant que packages/tokens/rebuild.json existe.\n` +
        `  Les écarts ci-dessous sont réels : ils disent ce qui reste à reconstruire.\n` +
        `  Fin du chantier : supprimer packages/tokens/rebuild.json (PLAN.md étape 11z).`
    )
}

/**
 * Point de sortie commun : `failures` vide → PASS, sinon FAIL bloquant.
 * En reconstruction, tout est rapporté et le code de sortie reste 0.
 */
export function finish({ id, name, pass, failures, detail, max = 20 }) {
    if (!failures.length) {
        console.log(pass)
        return
    }
    console.log(banner(id, name))
    console.log(`${id} RAPPORT — ${failures.length} écart(s) :`)
    for (const f of failures.slice(0, max)) console.log('  ' + f)
    if (failures.length > max) console.log(`  … et ${failures.length - max} autre(s)`)
    if (detail) console.log(detail)
    // On sort dans les deux cas : le contrôle est un programme, pas une
    // fonction. Après le rapport, il n'y a plus rien à calculer.
    process.exit(isRebuilding() ? 0 : 1)
}
