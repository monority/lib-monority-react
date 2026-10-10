import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { InputOTP } from './InputOTP'

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

function typeInput(input: HTMLInputElement, value: string) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
    )?.set
    nativeInputValueSetter?.call(input, value)
    input.dispatchEvent(new Event('input', { bubbles: true }))
}

afterEach(() => {
    act(() => {
        root?.unmount()
    })
    container?.remove()
    root = null
    container = null
})

describe('InputOTP', () => {
    it('renders default layout with 6 slots and separator', () => {
        render(<InputOTP maxLength={6} defaultValue="12" />)
        const slots = document.body.querySelectorAll('.mr-input-otp__slot')
        expect(slots.length).toBe(6)
        expect(slots[0]?.textContent).toBe('1')
        expect(slots[1]?.textContent).toBe('2')
        expect(slots[2]?.textContent).toBe('')

        const separator = document.body.querySelector('.mr-input-otp__separator')
        expect(separator).not.toBeNull()
    })

    it('handles typing and updates slots in uncontrolled mode', () => {
        const onChange = vi.fn()
        render(<InputOTP maxLength={4} onChange={onChange} />)

        const input = document.body.querySelector('input') as HTMLInputElement
        expect(input).not.toBeNull()

        act(() => {
            typeInput(input, '123')
        })

        expect(onChange).toHaveBeenCalledWith('123')
        const slots = document.body.querySelectorAll('.mr-input-otp__slot')
        expect(slots[0]?.textContent).toBe('1')
        expect(slots[1]?.textContent).toBe('2')
        expect(slots[2]?.textContent).toBe('3')
    })

    it('filters non-matching pattern characters', () => {
        const onChange = vi.fn()
        render(<InputOTP maxLength={6} pattern="^[0-9]*$" onChange={onChange} />)

        const input = document.body.querySelector('input') as HTMLInputElement

        act(() => {
            typeInput(input, '1a2b3')
        })

        expect(onChange).toHaveBeenCalledWith('123')
    })

    it('calls onComplete when all slots are filled', () => {
        const onComplete = vi.fn()
        render(<InputOTP maxLength={4} onComplete={onComplete} />)

        const input = document.body.querySelector('input') as HTMLInputElement

        act(() => {
            typeInput(input, '1234')
        })

        expect(onComplete).toHaveBeenCalledWith('1234')
    })

    it('handles clipboard paste and clamps to maxLength', () => {
        const onChange = vi.fn()
        const onComplete = vi.fn()
        render(<InputOTP maxLength={6} onChange={onChange} onComplete={onComplete} />)

        const input = document.body.querySelector('input') as HTMLInputElement

        const pasteEvent = new Event('paste', { bubbles: true, cancelable: true })
        Object.defineProperty(pasteEvent, 'clipboardData', {
            value: {
                getData: () => '987654321',
            },
        })

        act(() => {
            input.dispatchEvent(pasteEvent)
        })

        expect(onChange).toHaveBeenCalledWith('987654')
        expect(onComplete).toHaveBeenCalledWith('987654')
    })

    it('supports custom compound composition', () => {
        render(
            <InputOTP maxLength={4} defaultValue="42">
                <InputOTP.Group>
                    <InputOTP.Slot index={0} />
                    <InputOTP.Slot index={1} />
                </InputOTP.Group>
                <InputOTP.Separator>/</InputOTP.Separator>
                <InputOTP.Group>
                    <InputOTP.Slot index={2} />
                    <InputOTP.Slot index={3} />
                </InputOTP.Group>
            </InputOTP>
        )

        const groups = document.body.querySelectorAll('.mr-input-otp__group')
        expect(groups.length).toBe(2)

        const separator = document.body.querySelector('.mr-input-otp__separator')
        expect(separator?.textContent).toBe('/')
    })

    it('respects disabled state', () => {
        render(<InputOTP disabled defaultValue="12" />)
        const container = document.body.querySelector('.mr-input-otp')
        expect(container?.hasAttribute('data-disabled')).toBe(true)

        const input = document.body.querySelector('input') as HTMLInputElement
        expect(input.disabled).toBe(true)
    })

    it('forwards ref to container element', () => {
        const ref = createRef<HTMLDivElement>()
        render(<InputOTP ref={ref} />)
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
        expect(ref.current?.classList.contains('mr-input-otp')).toBe(true)
    })
})
