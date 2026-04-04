import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Switch } from '@/components/ui/Switch'
import { renderWithProviders } from '@/test/test-utils'

describe('Switch', () => {
    it('rend un switch accessible avec son label', () => {
        renderWithProviders(<Switch label="Activer les notifications" />)

        expect(
            screen.getByRole('checkbox', { name: 'Activer les notifications' }),
        ).toBeInTheDocument()
    })

    it('rend un switch desactive par defaut', () => {
        renderWithProviders(<Switch label="Mode sombre" />)

        expect(screen.getByRole('checkbox', { name: 'Mode sombre' })).not.toBeChecked()
    })

    it('rend un switch active avec checked', () => {
        renderWithProviders(<Switch label="Mode sombre" checked onChange={() => {}} />)

        expect(screen.getByRole('checkbox', { name: 'Mode sombre' })).toBeChecked()
    })

    it('appelle onChange au changement', () => {
        const onChange = vi.fn()
        renderWithProviders(<Switch label="Mode sombre" onChange={onChange} />)

        screen.getByRole('checkbox', { name: 'Mode sombre' }).click()

        expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('rend un switch desactive avec disabled', () => {
        renderWithProviders(<Switch label="Option" disabled />)

        expect(screen.getByRole('checkbox', { name: 'Option' })).toBeDisabled()
    })
})
