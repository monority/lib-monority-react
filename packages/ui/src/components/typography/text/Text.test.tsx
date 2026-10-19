import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { Text } from './Text'

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

describe('Text', () => {
    it('renders as p by default', () => {
        const view = render(<Text>Hello</Text>)
        const el = view.querySelector('p')
        expect(el?.textContent).toBe('Hello')
        expect(el?.getAttribute('data-tone')).toBe('base')
        expect(el?.getAttribute('data-size')).toBe('md')
    })

    it('renders as custom element', () => {
        const view = render(<Text as="span">Hello</Text>)
        expect(view.querySelector('span')).toBeTruthy()
    })

    it('applies tone and size', () => {
        const view = render(
            <Text tone="muted" size="sm">
                Small
            </Text>
        )
        const el = view.querySelector('p')
        expect(el?.getAttribute('data-tone')).toBe('muted')
        expect(el?.getAttribute('data-size')).toBe('sm')
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLParagraphElement>()
        render(<Text ref={ref}>Content</Text>)
        expect(ref.current?.tagName).toBe('P')
    })

    it('renders compound subcomponents correctly', () => {
        const view = render(
            <div>
                <Text.Strong>Bold</Text.Strong>
                <Text.Span>Inline</Text.Span>
                <Text.Muted>Faded</Text.Muted>
                <Text.Small>Tiny</Text.Small>
                <Text.Code>npm test</Text.Code>
            </div>
        )

        const strongEl = view.querySelector('strong.mr-text')
        expect(strongEl?.textContent).toBe('Bold')
        expect(strongEl?.getAttribute('data-tone')).toBe('strong')

        const spanEl = view.querySelector('span.mr-text')
        expect(spanEl?.textContent).toBe('Inline')

        const smallEl = view.querySelector('small.mr-text')
        expect(smallEl?.textContent).toBe('Tiny')
        expect(smallEl?.getAttribute('data-tone')).toBe('muted')
        expect(smallEl?.getAttribute('data-size')).toBe('sm')

        const codeEl = view.querySelector('code.mr-text')
        expect(codeEl?.textContent).toBe('npm test')
    })
})
