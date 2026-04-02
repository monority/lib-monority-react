import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { InlineAlert } from './InlineAlert'

describe('InlineAlert', () => {
    it('renders title and description', () => {
        render(
            <InlineAlert
                tone="info"
                title="Configuration incomplète"
                description="Ajoute une clé API pour activer les appels externes."
            />,
        )

        expect(screen.getByText('Configuration incomplète')).toBeInTheDocument()
        expect(screen.getByText('Ajoute une clé API pour activer les appels externes.')).toBeInTheDocument()
    })

    it('triggers the optional action', () => {
        const onAction = vi.fn()

        render(<InlineAlert title="Theme" actionLabel="Corriger" onAction={onAction} />)

        fireEvent.click(screen.getByRole('button', { name: 'Corriger' }))

        expect(onAction).toHaveBeenCalledTimes(1)
    })
})
