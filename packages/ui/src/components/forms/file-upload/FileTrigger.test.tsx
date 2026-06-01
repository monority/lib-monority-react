import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
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
    const view = render(<FileTrigger><span data-testid="custom">Upload</span></FileTrigger>)
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

  it('calls onSelect with files on change', () => {
    const onSelect = vi.fn()
    const view = render(<FileTrigger onSelect={onSelect} />)
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

  it('disabled custom trigger has aria-disabled', () => {
    const view = render(<FileTrigger disabled><span>Upload</span></FileTrigger>)
    const span = view.querySelector('span[role="button"]')
    expect(span?.getAttribute('aria-disabled')).toBe('true')
    expect(span?.tabIndex).toBe(-1)
  })

  it('forwards ref to native input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<FileTrigger ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('file')
  })

  it('custom children renders as clickable span with role button', () => {
    const view = render(<FileTrigger><span>Custom trigger</span></FileTrigger>)
    const span = view.querySelector('span[role="button"]')
    expect(span).not.toBeNull()
    expect(span?.textContent).toBe('Custom trigger')
    expect(span?.tabIndex).toBe(0)
  })

  it('keyboard Enter activates trigger', () => {
    const view = render(<FileTrigger><span>Upload</span></FileTrigger>)
    const input = view.querySelector('input')
    const span = view.querySelector('span[role="button"]')
    const clickSpy = vi.spyOn(input!, 'click')

    act(() => {
      span?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    })

    expect(clickSpy).toHaveBeenCalledTimes(1)
    clickSpy.mockRestore()
  })

  it('keyboard Space activates trigger', () => {
    const view = render(<FileTrigger><span>Upload</span></FileTrigger>)
    const input = view.querySelector('input')
    const span = view.querySelector('span[role="button"]')
    const clickSpy = vi.spyOn(input!, 'click')

    act(() => {
      span?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
    })

    expect(clickSpy).toHaveBeenCalledTimes(1)
    clickSpy.mockRestore()
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
