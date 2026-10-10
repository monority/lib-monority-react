import { screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ShowcasePage } from './ShowcasePage'
import { renderWithProviders } from '@/shared/test/test-utils'

describe('ShowcasePage', () => {
    it('renders the header and all curated sections', () => {
        renderWithProviders(<ShowcasePage />)

        expect(screen.getByRole('heading', { level: 1, name: 'Showcase' })).toBeInTheDocument()
        expect(
            screen.getAllByRole('heading', { level: 2, name: 'Workspace settings' })[0]
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 2, name: 'Pricing that converts' })
        ).toBeInTheDocument()
        expect(
            screen.getAllByRole('heading', { level: 2, name: 'Project overview' })[0]
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 2, name: 'Feedback and confirmation' })
        ).toBeInTheDocument()
    })

    it('interacts with the Sheet drawer inside settings composition', () => {
        renderWithProviders(<ShowcasePage />)

        const sheetTrigger = screen.getByRole('button', { name: /Securite & acces avances/i })
        expect(sheetTrigger).toBeInTheDocument()

        fireEvent.click(sheetTrigger)
        expect(
            screen.getByRole('dialog', { name: /Securite et autorisations/i })
        ).toBeInTheDocument()

        const closeBtn = screen.getByRole('button', { name: 'Fermer' })
        fireEvent.click(closeBtn)
        expect(
            screen.queryByRole('dialog', { name: /Securite et autorisations/i })
        ).not.toBeInTheDocument()
    })

    it('renders Timeline and BadgeDelta in activity composition', () => {
        renderWithProviders(<ShowcasePage />)

        expect(screen.getByText('Journal d activite & deploiement')).toBeInTheDocument()
        expect(screen.getByText('Deploiement v0.4.1 valide')).toBeInTheDocument()
        expect(screen.getByText('+3.2%')).toBeInTheDocument()
        expect(screen.getByText('-18ms')).toBeInTheDocument()
    })

    it('renders Rating and BadgeDelta in pricing composition', () => {
        renderWithProviders(<ShowcasePage />)

        expect(screen.getByText(/4.9 \/ 5 evalue par plus de 350 equipes/i)).toBeInTheDocument()
        expect(screen.getByText('2 mois offerts')).toBeInTheDocument()
    })

    it('opens confirmation modal with InputOTP in feedback composition', () => {
        renderWithProviders(<ShowcasePage />)

        const reviewBtn = screen.getByRole('button', { name: /Verifier & publier/i })
        fireEvent.click(reviewBtn)

        expect(
            screen.getByRole('dialog', { name: /Confirmer le deploiement 0.4.1/i })
        ).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Publier maintenant' })).toBeEnabled()

        fireEvent.click(screen.getByRole('button', { name: 'Publier maintenant' }))
        expect(screen.getByText('Publication validee avec succes')).toBeInTheDocument()
        expect(screen.getByText(/Evaluation de l experience de publication/i)).toBeInTheDocument()
    })
})
