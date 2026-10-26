import { LocaleProvider } from '@/shared/i18n'
import { render, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ComponentPlayground } from './ComponentPlayground'
import { localizeDoc, type DocI18n, type DocMessagesOverlay } from './doc-messages'
import type { DocPageData } from './DocPage'

const baseDoc: DocPageData = {
    title: 'Button',
    description: 'Unified action component.',
    playground: (
        <ComponentPlayground
            componentName="Button"
            controls={[
                { name: 'variant', type: 'select', label: 'Variant', options: ['primary'] },
                { type: 'boolean', label: 'Disabled', defaultValue: false },
            ]}
            render={() => <button type="button">Trigger</button>}
        />
    ),
    examples: [
        { title: 'Variants', content: <div>Variants content</div> },
        { title: 'Sizes', content: <div>Sizes content</div> },
    ],
    props: [
        {
            name: 'variant',
            type: "'primary'",
            defaultValue: "'primary'",
            description: 'Visual intent.',
        },
        { name: 'size', type: "'sm'", defaultValue: "'sm'", description: 'Control density.' },
    ],
    keyboardNavigation: [
        { key: 'Space', action: 'Activates on release.', context: 'Focus on the button' },
        { key: 'Tab', action: 'Moves focus.', context: 'Global navigation' },
    ],
    a11y: ['Native semantics.', 'Visible focus ring.', 'Supports aria-busy.'],
}

const fullOverlay: DocMessagesOverlay = {
    description: 'Composant d’action unifié.',
    playgroundLabels: { variant: 'Variante', control_1: 'Désactivé' },
    examples: [{ title: 'Variantes' }, { title: 'Tailles' }],
    propDescriptions: { variant: 'Intention visuelle.', size: 'Densité du contrôle.' },
    keyboardNavigation: [
        { action: 'Active au relâchement de la touche.', context: 'Focus sur le bouton' },
        { action: 'Déplace le focus.', context: 'Navigation globale' },
    ],
    a11y: ['Sémantique native.'],
}

describe('localizeDoc', () => {
    it('returns the doc unchanged for English', () => {
        expect(localizeDoc(baseDoc, 'en')).toBe(baseDoc)
    })

    it('returns the doc unchanged when no FR overlay exists', () => {
        const doc: DocPageData = { ...baseDoc, i18n: {} satisfies DocI18n }
        const actual = localizeDoc(doc, 'fr')
        expect(actual.title).toBe(doc.title)
        expect(actual.description).toBe(doc.description)
        expect(actual.examples).toBe(doc.examples)
        expect(actual.props).toBe(doc.props)
        expect(actual.keyboardNavigation).toBe(doc.keyboardNavigation)
        expect(actual.a11y).toBe(doc.a11y)
    })

    it('applies the FR overlay over the English content', () => {
        const doc: DocPageData = { ...baseDoc, i18n: { fr: fullOverlay } }
        const localized = localizeDoc(doc, 'fr')

        expect(localized.description).toBe('Composant d’action unifié.')
        expect(localized.examples?.[0]?.title).toBe('Variantes')
        expect(localized.examples?.[1]?.title).toBe('Tailles')
        expect(localized.props?.[0]?.description).toBe('Intention visuelle.')
        expect(localized.keyboardNavigation?.[0]?.action).toBe(
            'Active au relâchement de la touche.'
        )
        expect(localized.keyboardNavigation?.[0]?.key).toBe('Space')
    })

    it('keeps the code snippet stable when playground labels are localized', () => {
        const doc: DocPageData = { ...baseDoc, i18n: { fr: fullOverlay } }
        const localized = localizeDoc(doc, 'fr')

        render(
            <MemoryRouter>
                <LocaleProvider>{localized.playground as ReactElement}</LocaleProvider>
            </MemoryRouter>
        )

        expect(screen.getByLabelText('Variante')).toBeInTheDocument()
        expect(screen.getByLabelText('Désactivé')).toBeInTheDocument()
    })

    it('falls back to English for positional lists shorter than the overlay', () => {
        const doc: DocPageData = { ...baseDoc, i18n: { fr: fullOverlay } }
        const localized = localizeDoc(doc, 'fr')

        expect(localized.a11y?.[0]).toBe('Sémantique native.')
        expect(localized.a11y?.[1]).toBe('Visible focus ring.')
        expect(localized.a11y?.[2]).toBe('Supports aria-busy.')
    })

    it('leaves children content untouched so previews stay identical', () => {
        const doc: DocPageData = { ...baseDoc, i18n: { fr: fullOverlay } }
        const localized = localizeDoc(doc, 'fr')

        render(
            <MemoryRouter>
                <LocaleProvider>{localized.playground as ReactElement}</LocaleProvider>
            </MemoryRouter>
        )

        expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
    })
})
