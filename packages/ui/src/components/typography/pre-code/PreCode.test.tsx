import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { PreCode } from './PreCode'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    act(() => root?.render(ui))
    return container
}

afterEach(() => {
    act(() => root?.unmount())
    container?.remove()
    root = null
    container = null
})

describe('PreCode', () => {
    it('renders pre and code elements', () => {
        const view = render(<PreCode>npm install @monority/ui</PreCode>)
        const pre = view.querySelector('pre')
        const code = view.querySelector('code')

        expect(pre).toBeTruthy()
        expect(code).toBeTruthy()
        expect(code?.textContent).toBe('npm install @monority/ui')
    })

    it('applies language class to code', () => {
        const view = render(<PreCode language="tsx">const ok = true</PreCode>)
        expect(view.querySelector('code')?.className).toContain('language-tsx')
    })

    it('applies size and wrap variants', () => {
        const view = render(
            <PreCode size="sm" wrap>
                long line
            </PreCode>
        )
        const pre = view.querySelector('pre')

        expect(pre?.className).toContain('mr-pre-code--sm')
        expect(pre?.className).toContain('mr-pre-code--wrap')
        expect(pre?.getAttribute('data-wrap')).toBe('true')
    })

    it('forwards refs to pre and code', () => {
        const preRef = createRef<HTMLPreElement>()
        const codeRef = createRef<HTMLElement>()

        render(
            <PreCode ref={preRef} codeRef={codeRef}>
                ref check
            </PreCode>
        )

        expect(preRef.current?.tagName).toBe('PRE')
        expect(codeRef.current?.tagName).toBe('CODE')
    })

    it('keeps default long lines scrollable and wrap mode explicit', () => {
        const view = render(
            <>
                <PreCode>one very long line</PreCode>
                <PreCode wrap>one very long line</PreCode>
            </>
        )
        const views = view.querySelectorAll('pre')
        expect(views[0]?.getAttribute('data-wrap')).toBeNull()
        expect(views[1]?.getAttribute('data-wrap')).toBe('true')
    })

    it('spreads props and custom classes', () => {
        const view = render(
            <PreCode className="outer" codeClassName="inner" data-testid="snippet">
                code
            </PreCode>
        )

        expect(view.querySelector('pre')?.className).toContain('outer')
        expect(view.querySelector('pre')?.getAttribute('data-testid')).toBe('snippet')
        expect(view.querySelector('code')?.className).toContain('inner')
    })
})
