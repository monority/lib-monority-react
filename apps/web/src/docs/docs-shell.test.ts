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
const codeTheme = readFileSync(`${process.cwd()}/src/docs/code-theme.css`, 'utf8')

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

    it('keeps preview labels in normal document flow', () => {
        expect(css).toContain('.docs-preview-header')
        expect(css).toContain('.docs-preview-content')
        expect(css).not.toMatch(/\.docs-preview-label\s*\{[^}]*position:\s*absolute/)
    })

    it('wraps long code header titles instead of hiding them', () => {
        const rule = css.match(/\.docs-code-header\s*>\s*span\s*\{[^}]*\}/)?.[0] ?? ''
        expect(rule).toContain('overflow-wrap: anywhere')
        expect(rule).toContain('white-space: normal')
        expect(rule).not.toContain('text-overflow: ellipsis')
    })

    it('resets vendor code padding and uses text-safe semantic literals', () => {
        expect(codeTheme).toMatch(/\.mr-pre-code code\.hljs,[\s\S]*?padding:\s*0/)
        expect(codeTheme).toContain('var(--docs-code-literal, var(--mr-danger-text))')
        expect(codeTheme).toContain('var(--docs-code-deletion, var(--mr-danger-text))')
    })

    it('disables mobile navigation motion under reduced motion', () => {
        expect(css).toContain('.docs-mobile-nav__panel')
        expect(css).toMatch(/prefers-reduced-motion[^}]*animation:\s*none/)
    })
})
