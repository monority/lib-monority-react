import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

declare const process: { cwd(): string }

const root = join(process.cwd(), '..', '..')
const styles = join(root, 'packages', 'styles', 'src')

function source(path: string) {
    return readFileSync(join(styles, path), 'utf8')
}

describe('Step 31 geometry contracts', () => {
    it('defines and imports shared geometry tokens', () => {
        const generated = source('tokens/generated/tokens.css')
        const deprecated = source('tokens/generated/deprecated.css')
        const index = source('index.css')
        for (const token of [
            '--mr-border-width',
            '--mr-focus-width',
            '--mr-control-padding-inline-md',
            '--mr-icon-size-md',
        ]) {
            expect(generated).toContain(token)
        }
        for (const token of [
            '--mr-overlay-width-dialog',
            '--mr-surface-padding-md',
            '--mr-surface-gap-lg',
        ]) {
            expect(deprecated).toContain(token)
        }
        expect(index).toContain("'./tokens/generated/tokens.css'")
    })

    it('keeps Card on the shared surface geometry', () => {
        const card = source('recipes/card.recipe.css')
        const statCard = source('recipes/stat-card.recipe.css')
        expect(card).not.toContain('min-height: var(--mr-card-min-height')
        expect(statCard).not.toContain('--mr-card-min-height')
        expect(card).toContain('var(--mr-card-radius')
        expect(card).toContain('var(--mr-card-current-gap')
        expect(card).toContain('var(--mr-card-padding-md')
        expect(card).toContain('var(--mr-elevation-surface)')
    })

    it('keeps Spinner variant geometry in component tokens', () => {
        const spinner = source('recipes/spinner.recipe.css')
        const tokens = source('tokens/generated/deprecated.css')
        expect(tokens).toContain('--mr-spinner-size-sm')
        for (const token of [
            '--mr-spinner-size-sm',
            '--mr-spinner-size-md',
            '--mr-spinner-size-lg',
            '--mr-spinner-ring-sm',
            '--mr-spinner-ring-md',
            '--mr-spinner-ring-lg',
        ]) {
            expect(tokens).toContain(token)
            expect(spinner).toContain(`var(${token})`)
        }
    })

    it('uses one control ladder for native input families', () => {
        const input = source('recipes/input-base.recipe.css')
        const select = source('recipes/select.recipe.css')
        const combobox = source('recipes/combobox.recipe.css')
        const datePicker = source('recipes/date-picker.recipe.css')
        const numberInput = source('recipes/number-input.recipe.css')
        const passwordInput = source('recipes/password-input.recipe.css')
        const toggle = source('recipes/toggle.recipe.css')
        for (const recipe of [
            input,
            select,
            combobox,
            datePicker,
            numberInput,
            passwordInput,
            toggle,
        ]) {
            expect(recipe).toContain('var(--mr-control-size-sm)')
            expect(recipe).toContain('var(--mr-control-size-md)')
            expect(recipe).toContain('var(--mr-control-size-lg)')
        }
    })

    it('removes known undefined geometry references', () => {
        const files = [
            'recipes/section.recipe.css',
            'recipes/file-trigger.recipe.css',
            'recipes/file-list.recipe.css',
            'recipes/scroll-area.recipe.css',
        ]
        for (const file of files) {
            const text = source(file)
            expect(text).not.toMatch(/--mr-(space-(10|12|16)|bg-danger-soft)/)
        }
    })

    it('keeps motion and stacking values tokenized', () => {
        const navigation = source('recipes/navigation-menu.recipe.css')
        const menubar = source('recipes/menubar.recipe.css')
        expect(navigation).not.toContain('var(--mr-z-dropdown, 50)')
        expect(menubar).not.toContain('var(--mr-z-dropdown, 50)')
        expect(source('recipes/skeleton.recipe.css')).toContain('var(--mr-duration-spin)')
        expect(source('recipes/progress.recipe.css')).toContain('var(--mr-duration-pulse)')
    })

    it('uses the corrected aspect ratio token', () => {
        const tokens = source('tokens/generated/deprecated.css')
        expect(tokens).toContain('--mr-aspect-landscape')
    })

    it('keeps Select, alignment, Card, and Carousel on shared Step 33 geometry', () => {
        const select = source('recipes/select.recipe.css')
        const switchRecipe = source('recipes/switch.recipe.css')
        const radio = source('recipes/radio-group.recipe.css')
        const card = source('recipes/card.recipe.css')
        const carousel = source('recipes/carousel.recipe.css')

        expect(select).toContain('var(--mr-icon-size-sm)')
        expect(select).toContain('var(--mr-icon-size-md)')
        expect(select).not.toContain('.mr-select option')
        expect(switchRecipe).toContain('.mr-switch__row')
        expect(switchRecipe).toContain('align-items: center')
        expect(switchRecipe).not.toContain('translateY')
        expect(radio).toContain('display: inline-grid')
        expect(radio).toContain('align-self: center')
        expect(radio).not.toMatch(/\btop\s*:/)
        expect(card).toContain('background: var(--mr-bg-surface)')
        expect(carousel).toContain('background: transparent')
        expect(carousel).not.toContain('transform: translateY(-50%)')
    })
})
