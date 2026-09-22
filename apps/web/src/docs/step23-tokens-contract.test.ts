import { describe, expect, it } from 'vitest'
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
    it('defines the shared space scale consumed by recipes', () => {
        const spacing = tokenFile('tokens/core/spacing.css')
        expect(spacing).toContain('--mr-space-2: 0.375rem')
    })

    it('defines the shared duration scale consumed by recipes', () => {
        const durations = tokenFile('tokens/core/durations.css')
        expect(durations).toContain('--mr-dur-150: 150ms')
        expect(durations).toContain('--mr-dur-200: 200ms')
    })

    it('drives drawer motion through duration and easing tokens', () => {
        const drawer = recipe('drawer.recipe.css')
        expect(drawer).not.toMatch(/animation:[^;]*\b200ms\b/)
        expect(drawer).toContain('var(--mr-dur-200)')
        expect(drawer).toContain('var(--mr-ease-out)')
        expect(drawer).toContain('var(--mr-ease-in)')
    })

    it('uses radius tokens for circular spinners instead of raw 50%', () => {
        expect(recipe('spinner.recipe.css')).not.toContain('border-radius: 50%')
        expect(recipe('spinner.recipe.css')).toContain('var(--mr-radius-full)')
    })

    it('routes menu item density through the space scale', () => {
        for (const name of ['context-menu.recipe.css', 'dropdown-menu.recipe.css']) {
            expect(recipe(name)).toContain('var(--mr-space-2)')
            expect(recipe(name)).not.toMatch(/padding:\s*0\.375rem/)
        }
    })

    it('routes file-trigger motion through the duration scale', () => {
        expect(recipe('file-trigger.recipe.css')).not.toMatch(/0\.15s/)
        expect(recipe('file-trigger.recipe.css')).toContain('var(--mr-dur-150)')
    })
})
