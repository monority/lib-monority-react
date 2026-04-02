import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Avatar } from './Avatar'

describe('Avatar', () => {
    it('renders initials fallback from name', () => {
        render(<Avatar name="Alice Martin" />)

        expect(screen.getByLabelText('Alice Martin')).toHaveTextContent('AM')
    })

    it('renders an image when src is provided', () => {
        render(<Avatar src="https://example.com/avatar.png" alt="Alice Martin" />)

        expect(screen.getByRole('img', { name: 'Alice Martin' })).toBeInTheDocument()
    })
})
