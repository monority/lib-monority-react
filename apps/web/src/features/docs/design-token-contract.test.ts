import { describe, expect, it } from 'vitest'
import { duringRebuild } from '../../lib/rebuild-lock'
// @ts-ignore - node builtins unavailable in the web tsconfig types; vitest runs on node
import { readFileSync } from 'node:fs'
// @ts-ignore - process unavailable in the web tsconfig types
import { join } from 'node:path'

declare const process: { cwd(): string }

// Step 23 — design token regression guards.
// These pin zero-visual-change migrations: raw values that now resolve through
// the shared scale must keep resolving through it. They intentionally assert
// source structure (jsdom cannot compute real layout).
const stylesRoot = join(process.cwd(), '..', '..', 'packages', 'styles', 'src')

function recipe(name: string) {
    return readFileSync(join(stylesRoot, 'recipes', name), 'utf8')
}

function tokenFile(path: string) {
    return readFileSync(join(stylesRoot, path), 'utf8')
}

describe('step23 design token contracts', () => {
    // Neutralisé TANT QUE le verrou de reconstruction est actif (PLAN.md 0.8).
    // Lever le verrou remet ces tests en service : ils doivent alors passer.
    const itRebuild = duringRebuild(it)
    // Bloqué par PLAN.md 0.8 : attend --mr-spacing-1-5 / --mr-spacing-2 (11b2),
    // supprimés par la table rase.
    // Registre : packages/tokens/test-skips.json
    itRebuild('defines the shared space scale consumed by recipes', () => {
        // L'echelle space-* (progression 1.4x) a cede la place a la grille 4px
        // spacing-*. Les recettes consomment desormais spacing-* et l'echelle
        // space-* ne doit plus etre declaree.
        const generated = tokenFile('tokens/generated/tokens.css')
        expect(generated).toContain('--mr-spacing-1-5: 6px')
        expect(generated).toContain('--mr-spacing-2: 8px')
        expect(generated).not.toMatch(/--mr-space-\d/)
    })

    // Bloqué par PLAN.md 0.8 : attend --mr-duration-fast-alt / --mr-duration-slow-alt
    // (11b4). Suffixes ad hoc, à trancher dans le tableau des échelles avant 11b1.
    // Registre : packages/tokens/test-skips.json
    itRebuild('defines the shared duration scale consumed by recipes', () => {
        // dur-150 / dur-200 sont promus en tokens modernes (duration-fast-alt /
        // duration-slow-alt) : le contrat verifie desormais tokens.css.
        const tokens = tokenFile('tokens/generated/tokens.css')
        expect(tokens).toContain('--mr-duration-fast-alt: 150ms')
        expect(tokens).toContain('--mr-duration-slow-alt: 200ms')
    })

    it('drives drawer motion through duration and easing tokens', () => {
        const drawer = recipe('drawer.recipe.css')
        expect(drawer).not.toMatch(/animation:[^;]*\b200ms\b/)
        expect(drawer).toContain('var(--mr-duration-slow-alt)')
        expect(drawer).toContain('var(--mr-ease-enter)')
        expect(drawer).toContain('var(--mr-ease-exit)')
    })

    it('uses radius tokens for circular spinners instead of raw 50%', () => {
        expect(recipe('spinner.recipe.css')).not.toContain('border-radius: 50%')
        expect(recipe('spinner.recipe.css')).toContain('var(--mr-radius-full)')
    })

    it('routes menu item density through the space scale', () => {
        for (const name of ['context-menu.recipe.css', 'dropdown-menu.recipe.css']) {
            expect(recipe(name)).toContain('var(--mr-spacing-1-5)')
            expect(recipe(name)).not.toMatch(/padding:\s*0\.375rem/)
        }
    })

    it('routes file-trigger motion through the duration scale', () => {
        expect(recipe('file-trigger.recipe.css')).not.toMatch(/0\.15s/)
        expect(recipe('file-trigger.recipe.css')).toContain('var(--mr-duration-fast-alt)')
    })
})

/**
 * Un octet de contrôle inséré par erreur rend un fichier de texte binaire pour
 * `git grep` : plus aucun motif ne correspond, plus aucun diff n'est lisible, et
 * `pnpm verify` passe quand même. C'est arrivé sur l'ADR D23 : un NUL écrit à la
 * place d'un backtick.
 */
describe('intégrité des fichiers de décision', () => {
    const CIBLES = ['PLAN.md', 'DECISIONS.md', 'ROADMAP.md']

    function controlCaracteres(contenu: string): number[] {
        const positions: number[] = []
        ;[...contenu].forEach((caractere, index) => {
            const code = caractere.codePointAt(0) as number
            // Tabulation, saut de ligne et retour chariot sont les seuls blancs
            // autorisés. Tout autre caractère de contrôle est un défaut.
            if (code < 0x20 && code !== 9 && code !== 10 && code !== 13) positions.push(index)
            if (code === 0x7f) positions.push(index)
        })
        return positions
    }

    function lireCible(nom: string): string {
        const racine = join(process.cwd(), '..', '..')
        return readFileSync(join(racine, nom), 'utf8')
    }

    it.each(CIBLES)('%s ne contient aucun octet de contrôle', (nom) => {
        const positions = controlCaracteres(lireCible(nom))
        expect(
            positions,
            `${nom} contient ${positions.length} caractère(s) de contrôle : le fichier devient binaire pour git grep`
        ).toEqual([])
    })

    it('le contrôle détecte bien un octet de contrôle', () => {
        expect(controlCaracteres('texte normal')).toEqual([])
        expect(controlCaracteres('texte\nligne\ttabulée')).toEqual([])
        expect(controlCaracteres('texte\rcr')).toEqual([])
        expect(controlCaracteres('texte\u0000nul')).toEqual([5])
        expect(controlCaracteres('texte\u0007bell')).toEqual([5])
        expect(controlCaracteres('texte\u007fdel')).toEqual([5])
    })
})
