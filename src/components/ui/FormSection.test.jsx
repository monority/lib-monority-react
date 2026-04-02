import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'
import { FormSection } from './FormSection'
import { Input } from './Input'

describe('FormSection', () => {
    it('renders header content and body', () => {
        render(
            <FormSection
                title="Project settings"
                description="Configure the basics of your project."
                actions={<Button>Save</Button>}
            >
                <Input label="Project name" />
            </FormSection>,
        )

        expect(screen.getByRole('heading', { name: 'Project settings' })).toBeInTheDocument()
        expect(screen.getByText('Configure the basics of your project.')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
        expect(screen.getByLabelText('Project name')).toBeInTheDocument()
    })
})
