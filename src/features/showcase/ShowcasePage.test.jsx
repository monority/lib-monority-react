import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/test-utils'
import { ShowcasePage } from './ShowcasePage'

describe('ShowcasePage', () => {
    it('affiche le titre principal', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/showcase']}>
                <ShowcasePage />
            </MemoryRouter>,
        )
        expect(screen.getByText('Showcase des composants UI')).toBeInTheDocument()
    })
})
