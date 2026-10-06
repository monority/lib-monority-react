import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { NumberInput } from './NumberInput'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    act(() => root?.render(ui))
    return container
}

afterEach(() => {
    act(() => root?.unmount())
    container?.remove()
    root = null
    container = null
})

describe('NumberInput', () => {
    it('renders with default md size', () => {
        const view = render(<NumberInput label="Quantity" />)
        const input = view.querySelector('input')
        expect(input).not.toBeNull()
        expect(input?.type).toBe('text')
        expect(input?.getAttribute('inputMode')).toBe('decimal')
        expect(input?.getAttribute('data-size')).toBe('md')
    })

    it('renders increment and decrement buttons', () => {
        const view = render(<NumberInput label="Qty" />)
        const buttons = view.querySelectorAll('button')
        expect(buttons.length).toBe(2)
        expect(buttons[0].getAttribute('aria-label')).toBe('Decrement')
        expect(buttons[1].getAttribute('aria-label')).toBe('Increment')
    })

    it('increments value on + button click', () => {
        const view = render(<NumberInput label="Qty" defaultValue={5} />)
        const input = view.querySelector('input') as HTMLInputElement
        expect(input.value).toBe('5')
        const incBtn = view.querySelector('[aria-label="Increment"]') as HTMLButtonElement
        act(() => incBtn?.click())
        expect(input.value).toBe('6')
    })

    it('decrements value on - button click', () => {
        const view = render(<NumberInput label="Qty" defaultValue={5} />)
        const input = view.querySelector('input') as HTMLInputElement
        expect(input.value).toBe('5')
        const decBtn = view.querySelector('[aria-label="Decrement"]') as HTMLButtonElement
        act(() => decBtn?.click())
        expect(input.value).toBe('4')
    })

    it('clamps to min value', () => {
        const view = render(<NumberInput label="Qty" defaultValue={0} min={0} />)
        const decBtn = view.querySelector('[aria-label="Decrement"]') as HTMLButtonElement
        act(() => decBtn?.click())
        const input = view.querySelector('input') as HTMLInputElement
        expect(input.value).toBe('0')
    })

    it('clamps to max value', () => {
        const view = render(<NumberInput label="Qty" defaultValue={10} max={10} />)
        const incBtn = view.querySelector('[aria-label="Increment"]') as HTMLButtonElement
        act(() => incBtn?.click())
        const input = view.querySelector('input') as HTMLInputElement
        expect(input.value).toBe('10')
    })

    it('calls onChange with numeric value', () => {
        const handleChange = vi.fn()
        const view = render(<NumberInput label="Qty" defaultValue={5} onChange={handleChange} />)
        const incBtn = view.querySelector('[aria-label="Increment"]') as HTMLButtonElement
        act(() => incBtn?.click())
        expect(handleChange).toHaveBeenCalled()
        const event = handleChange.mock.calls[0][0]
        expect(event.target.value).toBe('6')
    })

    it('forwards ref to native input', () => {
        const ref = createRef<HTMLInputElement>()
        render(<NumberInput label="Qty" ref={ref} />)
        expect(ref.current?.tagName).toBe('INPUT')
        expect(ref.current?.type).toBe('text')
    })

    it('handles keyboard ArrowUp increment', () => {
        const view = render(<NumberInput label="Qty" defaultValue={5} />)
        const input = view.querySelector('input') as HTMLInputElement
        act(() => {
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
        })
        expect(input.value).toBe('6')
    })

    it('handles keyboard ArrowDown decrement', () => {
        const view = render(<NumberInput label="Qty" defaultValue={5} />)
        const input = view.querySelector('input') as HTMLInputElement
        act(() => {
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
        })
        expect(input.value).toBe('4')
    })

    it('sets role spinbutton and aria-value attributes', () => {
        const view = render(<NumberInput label="Qty" defaultValue={5} min={0} max={10} />)
        const input = view.querySelector('input')
        expect(input?.getAttribute('role')).toBe('spinbutton')
        expect(input?.getAttribute('aria-valuenow')).toBe('5')
        expect(input?.getAttribute('aria-valuemin')).toBe('0')
        expect(input?.getAttribute('aria-valuemax')).toBe('10')
    })

    it('calls onValueChange with numeric value on increment', () => {
        const handleValueChange = vi.fn()
        const view = render(
            <NumberInput label="Qty" defaultValue={10} onValueChange={handleValueChange} />
        )
        const incBtn = view.querySelector('[aria-label="Increment"]') as HTMLButtonElement
        act(() => incBtn?.click())
        expect(handleValueChange).toHaveBeenCalledWith(11)
    })

    it('handles keyboard PageUp and PageDown for 10x steps', () => {
        const view = render(<NumberInput label="Qty" defaultValue={20} step={2} />)
        const input = view.querySelector('input') as HTMLInputElement
        act(() => {
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }))
        })
        expect(input.value).toBe('40')
        act(() => {
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }))
        })
        expect(input.value).toBe('20')
    })

    it('applies neutral tone by default and allows accent and danger', () => {
        const viewNeutral = render(<NumberInput label="Neutre" />)
        const inputNeutral = viewNeutral.querySelector('input')
        expect(inputNeutral?.getAttribute('data-tone')).toBe('neutral')

        const viewAccent = render(<NumberInput label="Accent" tone="accent" />)
        const inputAccent = viewAccent.querySelector('input')
        expect(inputAccent?.getAttribute('data-tone')).toBe('accent')

        const viewDanger = render(<NumberInput label="Danger" tone="danger" />)
        const inputDanger = viewDanger.querySelector('input')
        expect(inputDanger?.getAttribute('data-tone')).toBe('danger')
    })

    it('disables buttons and prevents stepping when readOnly or disabled', () => {
        const view = render(<NumberInput label="ReadOnly" defaultValue={5} readOnly />)
        const buttons = view.querySelectorAll('button')
        expect((buttons[0] as HTMLButtonElement).disabled).toBe(true)
        expect((buttons[1] as HTMLButtonElement).disabled).toBe(true)

        const input = view.querySelector('input') as HTMLInputElement
        act(() => {
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
        })
        expect(input.value).toBe('5')
    })

    it('applies invalid attribute and aria-invalid', () => {
        const view = render(<NumberInput label="Invalide" invalid defaultValue={-5} />)
        const input = view.querySelector('input')
        expect(input?.getAttribute('data-invalid')).toBe('true')
        expect(input?.getAttribute('aria-invalid')).toBe('true')
    })

    it('clamps out-of-bounds value on blur', () => {
        const handleValueChange = vi.fn()
        const view = render(
            <NumberInput
                label="Qty"
                defaultValue={5}
                min={0}
                max={10}
                onValueChange={handleValueChange}
            />
        )
        const input = view.querySelector('input') as HTMLInputElement
        act(() => {
            input.focus()
            const nativeSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'value'
            )?.set
            nativeSetter?.call(input, '99')
            input.dispatchEvent(new Event('change', { bubbles: true }))
            input.blur()
        })
        expect(input.value).toBe('10')
        expect(handleValueChange).toHaveBeenCalledWith(10)
    })
})
