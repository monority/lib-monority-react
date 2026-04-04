import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Pagination } from '@/components/ui/Pagination'
import { renderWithProviders } from '@/test/test-utils'

describe('Pagination', () => {
    it('rend la navigation de pagination', () => {
        renderWithProviders(<Pagination page={1} totalPages={5} onPageChange={() => {}} />)

        expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
    })

    it('desactive le bouton Precedent sur la premiere page', () => {
        renderWithProviders(<Pagination page={1} totalPages={5} onPageChange={() => {}} />)

        expect(screen.getByRole('button', { name: 'Precedent' })).toBeDisabled()
    })

    it('desactive le bouton Suivant sur la derniere page', () => {
        renderWithProviders(<Pagination page={5} totalPages={5} onPageChange={() => {}} />)

        expect(screen.getByRole('button', { name: 'Suivant' })).toBeDisabled()
    })

    it('appelle onPageChange avec la page suivante', () => {
        const onPageChange = vi.fn()
        renderWithProviders(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />)

        screen.getByRole('button', { name: 'Suivant' }).click()

        expect(onPageChange).toHaveBeenCalledWith(3)
    })

    it('appelle onPageChange avec la page precedente', () => {
        const onPageChange = vi.fn()
        renderWithProviders(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />)

        screen.getByRole('button', { name: 'Precedent' }).click()

        expect(onPageChange).toHaveBeenCalledWith(2)
    })

    it('marque la page courante avec aria-current', () => {
        renderWithProviders(<Pagination page={2} totalPages={5} onPageChange={() => {}} />)

        const pageButton = screen.getByText('2').closest('button')
        expect(pageButton).toHaveAttribute('aria-current', 'page')
    })
})
