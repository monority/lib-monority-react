import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/test-utils'
import { DocsPage } from './DocsPage'

describe('DocsPage', () => {
    it('affiche le titre principal', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/docs']}>
                <DocsPage />
            </MemoryRouter>,
        )
        expect(screen.getByText("Documentation d usage de la librairie UI")).toBeInTheDocument()
    })
})
