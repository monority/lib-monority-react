import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from '@/components/ui/Checkbox'
import { renderWithProviders } from '@/test/test-utils'

describe('Checkbox', () => {
    it('rend une checkbox accessible avec son label', () => {
        renderWithProviders(<Checkbox label="Accepter les CGU" />)

        expect(screen.getByRole('checkbox', { name: 'Accepter les CGU' })).toBeInTheDocument()
    })

    it('rend une checkbox non cochee par defaut', () => {
        renderWithProviders(<Checkbox label="Option" />)

        expect(screen.getByRole('checkbox', { name: 'Option' })).not.toBeChecked()
    })

    it('rend une checkbox cochee avec checked', () => {
        renderWithProviders(<Checkbox label="Option" checked onChange={() => {}} />)

        expect(screen.getByRole('checkbox', { name: 'Option' })).toBeChecked()
    })

    it('rend une checkbox desactivee', () => {
        renderWithProviders(<Checkbox label="Option" disabled />)

        expect(screen.getByRole('checkbox', { name: 'Option' })).toBeDisabled()
    })

    it('appelle onChange au changement', () => {
        const onChange = vi.fn()
        renderWithProviders(<Checkbox label="Option" onChange={onChange} />)

        screen.getByRole('checkbox', { name: 'Option' }).click()

        expect(onChange).toHaveBeenCalledTimes(1)
    })
})
