import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'
import { Topbar } from './Topbar'

describe('Topbar', () => {
    it('renders brand, navigation and actions', () => {
        render(
            <Topbar
                brand={<span>Model App</span>}
                navigation={<a href="#showcase">Showcase</a>}
                actions={<Button>Nouvelle page</Button>}
            />,
        )

        expect(screen.getByText('Model App')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Showcase' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Nouvelle page' })).toBeInTheDocument()
    })

    it('renders meta content when provided', () => {
        render(<Topbar brand={<span>Model App</span>} meta={<span>Workspace pro</span>} />)

        expect(screen.getByText('Workspace pro')).toBeInTheDocument()
    })
})
