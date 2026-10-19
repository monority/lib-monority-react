import { fireEvent } from '@testing-library/dom'
import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Combobox } from './Combobox'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    act(() => {
        root?.render(ui)
    })
    return container
}

afterEach(() => {
    act(() => {
        root?.unmount()
    })
    container?.remove()
    root = null
    container = null
})

const sampleItems = [
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'es', label: 'Spain' },
]

describe('Combobox', () => {
    it('renders with default neutral tone and md size', () => {
        const view = render(<Combobox label="Country" items={sampleItems} />)
        const wrapper = view.querySelector('.mr-combobox')
        expect(wrapper?.getAttribute('data-tone')).toBe('neutral')
        expect(wrapper?.getAttribute('data-size')).toBe('md')
        expect(wrapper?.getAttribute('data-open')).toBeNull()
        expect(wrapper?.getAttribute('data-invalid')).toBeNull()
    })

    it('maps disabled, required, invalid and error states', () => {
        const view = render(
            <Combobox
                label="City"
                items={sampleItems}
                disabled
                required
                invalid
                error="Required field"
            />
        )
        const wrapper = view.querySelector('.mr-combobox')
        const input = view.querySelector('input')
        expect(wrapper?.getAttribute('data-disabled')).toBe('true')
        expect(wrapper?.getAttribute('data-required')).toBe('true')
        expect(wrapper?.getAttribute('data-invalid')).toBe('true')
        expect(input?.getAttribute('aria-invalid')).toBe('true')
        expect(input?.getAttribute('data-invalid')).toBe('true')
        expect(input?.getAttribute('data-disabled')).toBe('true')
        expect(input?.disabled).toBe(true)
        expect(input?.required).toBe(true)
    })

    it('forwards ref to the native input element', () => {
        const ref = createRef<HTMLInputElement>()
        render(<Combobox ref={ref} items={sampleItems} />)
        expect(ref.current?.tagName).toBe('INPUT')
        expect(ref.current?.getAttribute('role')).toBe('combobox')
    })

    it('connects hint and error via aria-describedby', () => {
        const view = render(
            <Combobox
                id="country"
                label="Country"
                hint="Choose one"
                error="Invalid"
                items={sampleItems}
            />
        )
        const input = view.querySelector('input')
        expect(input?.getAttribute('aria-describedby')).toBe('country-hint country-error')
    })

    it('applies accent tone when specified', () => {
        const view = render(<Combobox tone="accent" items={sampleItems} />)
        const wrapper = view.querySelector('.mr-combobox')
        expect(wrapper?.getAttribute('data-tone')).toBe('accent')
    })

    it('applies lg size when specified', () => {
        const view = render(<Combobox size="lg" items={sampleItems} />)
        const wrapper = view.querySelector('.mr-combobox')
        expect(wrapper?.getAttribute('data-size')).toBe('lg')
    })

    it('applies sm size when specified', () => {
        const view = render(<Combobox size="sm" items={sampleItems} />)
        const wrapper = view.querySelector('.mr-combobox')
        expect(wrapper?.getAttribute('data-size')).toBe('sm')
    })

    it('applies danger tone when specified', () => {
        const view = render(<Combobox tone="danger" items={sampleItems} />)
        const wrapper = view.querySelector('.mr-combobox')
        expect(wrapper?.getAttribute('data-tone')).toBe('danger')
    })

    it('opens dropdown on focus and sets aria-expanded', () => {
        const view = render(<Combobox label="Country" items={sampleItems} />)
        const input = view.querySelector('input')
        act(() => {
            input?.focus()
        })
        const wrapper = view.querySelector('.mr-combobox')
        expect(input?.getAttribute('aria-expanded')).toBe('true')
        expect(wrapper?.getAttribute('data-open')).toBe('true')
    })

    it('selects an item and closes dropdown', () => {
        const onChange = vi.fn()
        const view = render(<Combobox label="Country" items={sampleItems} onChange={onChange} />)
        const input = view.querySelector('input')
        act(() => {
            input?.focus()
        })

        // Portal renders to document.body
        const firstItem = document.querySelector('.mr-combobox__item')
        act(() => {
            firstItem?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        expect(onChange).toHaveBeenCalledWith('fr')
        expect(input?.getAttribute('aria-expanded')).toBe('false')
    })

    it('filters items when typing', () => {
        const view = render(<Combobox label="Country" items={sampleItems} />)
        const input = view.querySelector('input')
        act(() => {
            input?.focus()
        })

        act(() => {
            fireEvent.input(input!, { target: { value: 'Ger' } })
        })

        // Portal renders to document.body
        const items = document.querySelectorAll('.mr-combobox__item')
        expect(items.length).toBe(1)
        expect(items[0]?.textContent).toContain('Germany')
    })

    it('supports controlled value', () => {
        const view = render(<Combobox label="Country" items={sampleItems} value="de" />)
        const input = view.querySelector('input')
        expect(input?.value).toBe('Germany')
    })

    it('supports uncontrolled defaultValue', () => {
        const view = render(<Combobox label="Country" items={sampleItems} defaultValue="es" />)
        const input = view.querySelector('input')
        expect(input?.value).toBe('Spain')
    })

    it('renders empty state when no items match', () => {
        const view = render(
            <Combobox label="Country" items={sampleItems} emptyLabel="No results" />
        )
        const input = view.querySelector('input')
        act(() => {
            input?.focus()
        })

        act(() => {
            fireEvent.input(input!, { target: { value: 'xyz' } })
        })

        // Portal renders to document.body
        const empty = document.querySelector('.mr-combobox__empty')
        expect(empty?.textContent).toBe('No results')
    })

    it('renders spinner and sets aria-busy when loading', () => {
        const view = render(<Combobox label="Country" items={sampleItems} loading />)
        const wrapper = view.querySelector('.mr-combobox')
        const input = view.querySelector('input')
        const spinner = view.querySelector('.mr-combobox__spinner')

        expect(wrapper?.getAttribute('data-loading')).toBe('true')
        expect(spinner).toBeTruthy()
        expect(spinner?.querySelector('.mr-spinner')).toBeTruthy()
        expect(input?.getAttribute('aria-busy')).toBe('true')
    })

    it('does not render spinner when loading is false', () => {
        const view = render(<Combobox label="Country" items={sampleItems} loading={false} />)
        const wrapper = view.querySelector('.mr-combobox')
        const input = view.querySelector('input')

        expect(wrapper?.getAttribute('data-loading')).toBeNull()
        expect(view.querySelector('.mr-combobox__spinner')).toBeNull()
        expect(input?.getAttribute('aria-busy')).toBeNull()
    })

    it('renders clear button when clearable is true and defaultValue is present', () => {
        const view = render(
            <Combobox label="Country" items={sampleItems} clearable defaultValue="fr" />
        )
        const clearBtn = view.querySelector('.mr-combobox__clear')
        const wrapper = view.querySelector('.mr-combobox')
        const input = view.querySelector('input')

        expect(clearBtn).toBeTruthy()
        expect(clearBtn?.getAttribute('aria-label')).toBe('Effacer la sélection')
        expect(wrapper?.getAttribute('data-has-clear')).toBe('true')
        expect(input?.getAttribute('data-has-clear')).toBe('true')
    })

    it('does not render clear button when clearable is true but value is empty', () => {
        const view = render(
            <Combobox label="Country" items={sampleItems} clearable defaultValue="" />
        )
        expect(view.querySelector('.mr-combobox__clear')).toBeNull()
        const wrapper = view.querySelector('.mr-combobox')
        expect(wrapper?.getAttribute('data-has-clear')).toBeNull()
    })

    it('does not render clear button when clearable is false even if value is present', () => {
        const view = render(<Combobox label="Country" items={sampleItems} defaultValue="fr" />)
        expect(view.querySelector('.mr-combobox__clear')).toBeNull()
    })

    it('does not render clear button when disabled, readOnly, or loading', () => {
        const viewDisabled = render(
            <Combobox label="Country" items={sampleItems} clearable defaultValue="fr" disabled />
        )
        expect(viewDisabled.querySelector('.mr-combobox__clear')).toBeNull()

        const viewReadOnly = render(
            <Combobox label="Country" items={sampleItems} clearable defaultValue="fr" readOnly />
        )
        expect(viewReadOnly.querySelector('.mr-combobox__clear')).toBeNull()

        const viewLoading = render(
            <Combobox label="Country" items={sampleItems} clearable defaultValue="fr" loading />
        )
        expect(viewLoading.querySelector('.mr-combobox__clear')).toBeNull()
    })

    it('clears value, calls onClear and onChange, and focuses input when clear button is clicked', () => {
        const onClear = vi.fn()
        const onChange = vi.fn()
        const view = render(
            <Combobox
                label="Country"
                items={sampleItems}
                clearable
                defaultValue="fr"
                onClear={onClear}
                onChange={onChange}
            />
        )
        const input = view.querySelector('input') as HTMLInputElement
        const clearBtn = view.querySelector('.mr-combobox__clear') as HTMLButtonElement

        expect(input.value).toBe('France')

        act(() => {
            clearBtn.click()
        })

        expect(input.value).toBe('')
        expect(onChange).toHaveBeenCalledWith('')
        expect(onClear).toHaveBeenCalledTimes(1)
        expect(document.activeElement).toBe(input)
        expect(view.querySelector('.mr-combobox__clear')).toBeNull()
    })

    it('respects custom clearAriaLabel prop', () => {
        const view = render(
            <Combobox
                label="Country"
                items={sampleItems}
                clearable
                defaultValue="fr"
                clearAriaLabel="Réinitialiser le pays"
            />
        )
        const clearBtn = view.querySelector('.mr-combobox__clear')
        expect(clearBtn?.getAttribute('aria-label')).toBe('Réinitialiser le pays')
    })

    it('renders and operates via compound subcomponents (Combobox.Input, Combobox.List, Combobox.Item)', () => {
        const onChange = vi.fn()
        const view = render(
            <Combobox label="Custom Compound" onChange={onChange}>
                <Combobox.Input placeholder="Select country..." />
                <Combobox.List>
                    <Combobox.Item value="ca" label="Canada">
                        <Combobox.ItemLabel>Canada</Combobox.ItemLabel>
                        <Combobox.ItemDescription>North America</Combobox.ItemDescription>
                    </Combobox.Item>
                    <Combobox.Empty>No country found</Combobox.Empty>
                </Combobox.List>
            </Combobox>
        )

        const input = view.querySelector('input') as HTMLInputElement
        expect(input).not.toBeNull()
        expect(input.placeholder).toBe('Select country...')
    })
})
