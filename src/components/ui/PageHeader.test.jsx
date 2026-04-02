import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'
import { Badge } from './Badge'
import { PageHeader } from './PageHeader'

describe('PageHeader', () => {
    it('renders title, description and actions', () => {
        render(
            <PageHeader
                title="Design system"
                description="Vue d ensemble de la librairie"
                actions={<Button>Publier</Button>}
            />,
        )

        expect(screen.getByRole('heading', { name: 'Design system' })).toBeInTheDocument()
        expect(screen.getByText('Vue d ensemble de la librairie')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Publier' })).toBeInTheDocument()
    })

    it('renders meta content', () => {
        render(<PageHeader title="Showcase" meta={<Badge>Stable</Badge>} />)

        expect(screen.getByText('Stable')).toBeInTheDocument()
    })
})
