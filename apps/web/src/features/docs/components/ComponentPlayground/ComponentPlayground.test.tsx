import { LocaleProvider } from '@/shared/i18n'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ComponentPlayground } from './ComponentPlayground'

function renderPlayground(ui: ReactElement) {
    return render(
        <MemoryRouter>
            <LocaleProvider>{ui}</LocaleProvider>
        </MemoryRouter>
    )
}

describe('ComponentPlayground', () => {
    it('renders stage, controls and generated code snippet', () => {
        renderPlayground(
            <ComponentPlayground<{ variant: string; disabled: boolean }>
                componentName="Button"
                importCode="import { Button } from '@monority/ui/button'"
                controls={[
                    {
                        name: 'variant',
                        type: 'select',
                        label: 'Variant',
                        options: ['primary', 'secondary'],
                        defaultValue: 'primary',
                    },
                    {
                        name: 'disabled',
                        type: 'boolean',
                        label: 'Disabled',
                        defaultValue: false,
                    },
                ]}
                render={(props) => (
                    <button data-testid="mock-btn" disabled={props.disabled}>
                        {props.variant}
                    </button>
                )}
            />
        )

        // Stage & rendered component
        const btn = screen.getByTestId('mock-btn')
        expect(btn).toBeInTheDocument()
        expect(btn).toHaveTextContent('primary')

        // Controls
        expect(screen.getByLabelText('Variant')).toHaveValue('primary')
        expect(screen.getByLabelText('Disabled')).not.toBeChecked()

        // Code snippet filename and content
        expect(screen.getByText('Button.snippet.tsx')).toBeInTheDocument()
        const codeBody = document.querySelector('.code-viewer__body')
        expect(codeBody?.textContent).toContain("import { Button } from '@monority/ui/button'")
        expect(codeBody?.textContent).toContain('<Button variant="primary" />')
    })

    it('updates component rendering and code when controls change', () => {
        renderPlayground(
            <ComponentPlayground<{ variant: string; disabled: boolean }>
                componentName="Button"
                controls={[
                    {
                        name: 'variant',
                        type: 'select',
                        label: 'Variant',
                        options: ['primary', 'secondary'],
                        defaultValue: 'primary',
                    },
                    {
                        name: 'disabled',
                        type: 'boolean',
                        label: 'Disabled',
                        defaultValue: false,
                    },
                ]}
                render={(props) => (
                    <button data-testid="mock-btn" disabled={props.disabled}>
                        {props.variant}
                    </button>
                )}
            />
        )

        const select = screen.getByLabelText('Variant')
        fireEvent.change(select, { target: { value: 'secondary' } })

        const btn = screen.getByTestId('mock-btn')
        expect(btn).toHaveTextContent('secondary')

        const checkbox = screen.getByLabelText('Disabled')
        fireEvent.click(checkbox)
        expect(btn).toBeDisabled()

        const codeBody = document.querySelector('.code-viewer__body')
        expect(codeBody?.textContent).toContain('<Button variant="secondary" disabled />')
    })

    it('resets controls to default when reset button is clicked', () => {
        renderPlayground(
            <ComponentPlayground<{ variant: string }>
                componentName="Button"
                controls={[
                    {
                        name: 'variant',
                        type: 'select',
                        label: 'Variant',
                        options: ['primary', 'secondary'],
                        defaultValue: 'primary',
                    },
                ]}
                render={(props) => <span data-testid="val">{props.variant}</span>}
            />
        )

        const select = screen.getByLabelText('Variant')
        fireEvent.change(select, { target: { value: 'secondary' } })
        expect(screen.getByTestId('val')).toHaveTextContent('secondary')

        const resetBtn = screen.getByRole('button', { name: /reset/i })
        fireEvent.click(resetBtn)

        expect(screen.getByTestId('val')).toHaveTextContent('primary')
    })

    it('resets controlled controls and triggers onReset callback', () => {
        let externalState = 'active'
        const handleChange = (v: string) => {
            externalState = v
        }
        let resetCalled = false
        const handleReset = () => {
            resetCalled = true
        }

        renderPlayground(
            <ComponentPlayground
                componentName="Controlled"
                onReset={handleReset}
                controls={[
                    {
                        type: 'select',
                        label: 'Status',
                        value: externalState,
                        options: ['active', 'inactive'],
                        onChange: handleChange,
                    },
                ]}
                render={() => <div>Test</div>}
            />
        )

        const select = screen.getByLabelText('Status')
        fireEvent.change(select, { target: { value: 'inactive' } })
        expect(externalState).toBe('inactive')

        const resetBtn = screen.getByRole('button', { name: /reset/i })
        fireEvent.click(resetBtn)

        expect(resetCalled).toBe(true)
        expect(externalState).toBe('active')
    })
})
