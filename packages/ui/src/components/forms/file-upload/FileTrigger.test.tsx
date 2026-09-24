import { act, createRef } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FileTrigger } from './FileTrigger'

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

describe('FileTrigger', () => {
    it('renders a hidden file input', () => {
        const view = render(<FileTrigger />)
        const input = view.querySelector('input')
        expect(input).not.toBeNull()
        expect(input?.type).toBe('file')
        expect(input?.className).toBe('mr-file-trigger__input')
        expect(input?.tabIndex).toBe(-1)
        expect(input?.getAttribute('aria-hidden')).toBe('true')
    })

    it('renders a default "Choose file" button when no children', () => {
        const view = render(<FileTrigger />)
        const button = view.querySelector('button')
        expect(button).not.toBeNull()
        expect(button?.textContent).toBe('Choose file')
        expect(button?.className).toContain('mr-file-trigger--default')
    })

    it('triggers file dialog on button click', () => {
        const view = render(<FileTrigger />)
        const input = view.querySelector('input')
        const button = view.querySelector('button')
        const clickSpy = vi.spyOn(input!, 'click')

        act(() => {
            button?.click()
        })

        expect(clickSpy).toHaveBeenCalledTimes(1)
        clickSpy.mockRestore()
    })

    it('triggers file dialog on custom children click', () => {
        const view = render(
            <FileTrigger>
                <span data-testid="custom">Upload</span>
            </FileTrigger>
        )
        const input = view.querySelector('input')
        const span = view.querySelector('[data-testid="custom"]')
        const clickSpy = vi.spyOn(input!, 'click')

        act(() => {
            span?.click()
        })

        expect(clickSpy).toHaveBeenCalledTimes(1)
        clickSpy.mockRestore()
    })

    it('accepts accept prop as string', () => {
        const view = render(<FileTrigger accept=".png,.jpg" />)
        const input = view.querySelector('input')
        expect(input?.getAttribute('accept')).toBe('.png,.jpg')
    })

    it('accepts accept prop as array', () => {
        const view = render(<FileTrigger accept={['image/png', 'image/jpeg']} />)
        const input = view.querySelector('input')
        expect(input?.getAttribute('accept')).toBe('image/png,image/jpeg')
    })

    it('supports multiple prop', () => {
        const view = render(<FileTrigger multiple />)
        const input = view.querySelector('input')
        expect(input?.multiple).toBe(true)
    })

    it('supports directory prop', () => {
        const view = render(<FileTrigger directory />)
        const input = view.querySelector('input')
        expect(input?.hasAttribute('webkitdirectory')).toBe(true)
    })

    it('calls onSelect and native onChange with files', () => {
        const onSelect = vi.fn()
        const onChange = vi.fn()
        const view = render(<FileTrigger onSelect={onSelect} onChange={onChange} />)
        const input = view.querySelector('input') as HTMLInputElement

        const file = new File(['content'], 'test.png', { type: 'image/png' })
        // Mock the files property on the input element
        Object.defineProperty(input, 'files', {
            value: [file] as unknown as FileList,
            configurable: true,
        })

        act(() => {
            input.dispatchEvent(new Event('change', { bubbles: true }))
        })

        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect).toHaveBeenCalledWith([file])
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0]?.[0]).toMatchObject({ target: input })
    })

    it('disabled prevents click', () => {
        const view = render(<FileTrigger disabled />)
        const input = view.querySelector('input')
        const button = view.querySelector('button')
        const clickSpy = vi.spyOn(input!, 'click')

        act(() => {
            button?.click()
        })

        expect(clickSpy).not.toHaveBeenCalled()
        expect(button?.disabled).toBe(true)
        clickSpy.mockRestore()
    })

    it('disabled custom trigger uses native disabled state', () => {
        const view = render(
            <FileTrigger disabled>
                <span>Upload</span>
            </FileTrigger>
        )
        const button = view.querySelector('button.mr-file-trigger') as HTMLButtonElement
        expect(button.disabled).toBe(true)
        expect(button.getAttribute('aria-disabled')).toBe('true')
    })

    it('forwards ref to native input', () => {
        const ref = createRef<HTMLInputElement>()
        render(<FileTrigger ref={ref} />)
        expect(ref.current?.tagName).toBe('INPUT')
        expect(ref.current?.type).toBe('file')
    })

    it('custom children render inside a native button', () => {
        const view = render(
            <FileTrigger>
                <span>Custom trigger</span>
            </FileTrigger>
        )
        const button = view.querySelector('button.mr-file-trigger') as HTMLButtonElement
        expect(button).not.toBeNull()
        expect(button.type).toBe('button')
        expect(button.textContent).toBe('Custom trigger')
    })

    it('forwards native file attributes and field state to the input and trigger', () => {
        const view = render(
            <FileTrigger
                id="attachment"
                name="attachments"
                required
                invalid
                aria-label="Attachments"
                aria-describedby="attachment-hint"
            />
        )
        const input = view.querySelector('input') as HTMLInputElement
        const button = view.querySelector('button') as HTMLButtonElement
        expect(input.name).toBe('attachments')
        expect(input.required).toBe(true)
        expect(input.getAttribute('aria-invalid')).toBe('true')
        expect(input.getAttribute('aria-describedby')).toContain('attachment-hint')
        expect(input.getAttribute('aria-describedby')).toContain('attachment-required')
        expect(button.getAttribute('aria-label')).toBe('Attachments')
        expect(button.getAttribute('aria-describedby')).toContain('attachment-hint')
        expect(button.getAttribute('aria-describedby')).toContain('attachment-required')
        expect(button.getAttribute('aria-invalid')).toBe('true')
        expect(button.getAttribute('aria-required')).toBe('true')
    })

    it('passes through additional props to input', () => {
        const view = render(<FileTrigger data-testid="file-input" />)
        const input = view.querySelector('input')
        expect(input?.getAttribute('data-testid')).toBe('file-input')
    })

    it('applies custom className to trigger element', () => {
        const view = render(<FileTrigger className="my-custom-class" />)
        const button = view.querySelector('button')
        expect(button?.className).toContain('my-custom-class')
    })
})
