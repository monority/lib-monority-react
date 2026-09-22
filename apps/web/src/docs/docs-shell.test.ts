import { describe, expect, it } from 'vitest'
// @ts-ignore - node builtins unavailable in the web tsconfig types; vitest runs on node
import { readFileSync } from 'node:fs'

declare const process: { cwd(): string }

// Regression guard for the Step 06 /docs ~390px horizontal overflow.
// jsdom cannot measure real layout, so this test pins the structural CSS
// rules that fixed it: the mobile grid track must be minmax(0, 1fr) — a bare
// 1fr (= minmax(auto, 1fr)) lets wide min-content children force the track
// past the viewport — and grid children must be allowed to shrink.
const css = readFileSync(`${process.cwd()}/src/docs/index.css`, 'utf8')

describe('docs shell responsive guards', () => {
    it('keeps the mobile docs layout track clamped to the viewport', () => {
        expect(css).toContain('grid-template-columns: minmax(0, 1fr)')
    })

    it('allows the docs content column to shrink below min-content', () => {
        expect(css).toMatch(/\.docs-content\s*\{[^}]*min-width:\s*0/)
    })

    it('hides the desktop sidebar on mobile viewports', () => {
        expect(css).toMatch(/\.docs-sidebar--desktop\s*\{[^}]*display:\s*none/)
    })

    it('keeps the mobile navigation hidden on desktop', () => {
        expect(css).toMatch(/\.docs-mobile-bar,\s*\n?\.docs-mobile-nav\s*\{[^}]*display:\s*none/)
    })

    it('disables mobile navigation motion under reduced motion', () => {
        expect(css).toContain('.docs-mobile-nav__panel')
        expect(css).toMatch(/prefers-reduced-motion[^}]*animation:\s*none/)
    })
})
