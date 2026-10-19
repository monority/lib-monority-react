import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { FormSection } from './FormSection'

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

describe('FormSection', () => {
    it('uses the shared Card surface and emits style hooks', () => {
        const view = render(<FormSection actions="Save">Content</FormSection>)
        const section = view.querySelector('.mr-form-section')
        expect(section?.className).toContain('mr-card')
        expect(section?.hasAttribute('data-mr-form-section')).toBe(true)
        expect(section?.getAttribute('data-has-actions')).toBe('true')
    })

    it('renders children', () => {
        const view = render(
            <FormSection>
                <input />
            </FormSection>
        )
        expect(view.querySelector('input')).toBeTruthy()
    })

    it('renders title and description', () => {
        const view = render(<FormSection title="Profile" description="Edit your info" />)
        expect(view.textContent).toContain('Profile')
        expect(view.textContent).toContain('Edit your info')
    })

    it('renders meta and actions', () => {
        const view = render(
            <FormSection meta="Optional" actions={<button type="button">Save</button>} />
        )
        expect(view.textContent).toContain('Optional')
        expect(view.querySelector('button')).toBeTruthy()
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>()
        render(<FormSection ref={ref} />)
        expect(ref.current?.tagName).toBe('DIV')
    })

    it('does not render header when title and description are empty', () => {
        const view = render(<FormSection>Content</FormSection>)
        expect(view.querySelector('h3')).toBeNull()
        expect(view.querySelector('.mr-form-section__header')).toBeNull()
    })

    it('preserves zero-valued ReactNode content', () => {
        const view = render(
            <FormSection title={0} description={0} meta={0} actions={0}>
                Body
            </FormSection>
        )
        expect(view.textContent).toContain('0')
        expect(view.querySelector('.mr-form-section__footer')).toBeTruthy()
    })

    it('passes className to the root', () => {
        const view = render(<FormSection className="custom">Content</FormSection>)
        const root = view.querySelector('.mr-form-section')
        expect(root?.className).toContain('custom')
    })

    it('supports declarative compound composition', () => {
        const view = render(
            <FormSection>
                <FormSection.Header>
                    <FormSection.Title>Account Settings</FormSection.Title>
                    <FormSection.Description>
                        Manage your workspace preferences
                    </FormSection.Description>
                    <FormSection.Meta>Beta</FormSection.Meta>
                </FormSection.Header>
                <FormSection.Body>
                    <input type="text" defaultValue="Workspace Name" />
                </FormSection.Body>
                <FormSection.Footer>
                    <button type="submit">Save</button>
                </FormSection.Footer>
            </FormSection>
        )
        expect(view.querySelector('.mr-form-section__header-title')?.textContent).toBe(
            'Account Settings'
        )
        expect(view.querySelector('.mr-form-section__header-description')?.textContent).toBe(
            'Manage your workspace preferences'
        )
        expect(view.querySelector('.mr-form-section__header-meta')?.textContent).toBe('Beta')
        expect(view.querySelector('.mr-form-section__body input')).toBeTruthy()
        expect(view.querySelector('.mr-form-section__footer button')).toBeTruthy()
    })
})
