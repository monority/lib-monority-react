import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'
import { Banner } from './Banner'

describe('Banner', () => {
    it('renders title and description', () => {
        render(
            <Banner
                eyebrow="Nouveau"
                title="UI kit mis a jour"
                description="Les composants prioritaires du starter sont maintenant en place."
            />,
        )

        expect(screen.getByText('Nouveau')).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'UI kit mis a jour' })).toBeInTheDocument()
        expect(
            screen.getByText('Les composants prioritaires du starter sont maintenant en place.'),
        ).toBeInTheDocument()
    })

    it('renders optional actions', () => {
        render(<Banner title="Release" actions={<Button>Voir</Button>} />)

        expect(screen.getByRole('button', { name: 'Voir' })).toBeInTheDocument()
    })
})
