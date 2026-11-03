import { LocaleProvider } from '@/shared/i18n'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DocKeyboardTable } from './DocKeyboardTable'

function renderTable(shortcuts: Parameters<typeof DocKeyboardTable>[0]['shortcuts']) {
    return render(
        <MemoryRouter>
            <LocaleProvider>
                <DocKeyboardTable shortcuts={shortcuts} />
            </LocaleProvider>
        </MemoryRouter>
    )
}

describe('DocKeyboardTable', () => {
    it('returns null when shortcuts array is empty', () => {
        const { container } = renderTable([])
        expect(container.firstChild).toBeNull()
    })

    it('renders shortcuts, action descriptions and context', () => {
        renderTable([
            {
                key: ['Control', 'k'],
                action: 'Ouvre la palette',
                context: 'Raccourci global',
            },
            {
                key: 'Escape',
                action: 'Ferme la vue',
            },
        ])

        expect(screen.getByText('Control')).toBeInTheDocument()
        expect(screen.getByText('k')).toBeInTheDocument()
        expect(screen.getByText('Ouvre la palette')).toBeInTheDocument()
        expect(screen.getByText('Raccourci global')).toBeInTheDocument()

        expect(screen.getByText('Escape')).toBeInTheDocument()
        expect(screen.getByText('Ferme la vue')).toBeInTheDocument()
        expect(screen.getByText('Global')).toBeInTheDocument()
    })
})
