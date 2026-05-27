import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AlertDialog } from './AlertDialog'

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
  document.body.style.overflow = ''
  root = null
  container = null
})

describe('AlertDialog', () => {
  it('renders nothing when closed', () => {
    render(<AlertDialog open={false} title="Delete?" />)
    expect(document.body.querySelector('.mr-alert-dialog__backdrop')).toBeNull()
  })

  it('renders when open', () => {
    render(<AlertDialog open title="Delete?" />)
    const backdrop = document.body.querySelector('.mr-alert-dialog__backdrop')
    expect(backdrop).not.toBeNull()
    expect(backdrop?.getAttribute('data-open')).toBe('true')
  })

  it('renders title and description', () => {
    render(<AlertDialog open title="Delete?" description="This cannot be undone." />)
    expect(document.body.querySelector('.mr-alert-dialog__title')?.textContent).toBe('Delete?')
    expect(document.body.querySelector('.mr-alert-dialog__description')?.textContent).toBe('This cannot be undone.')
  })

  it('renders cancel and confirm buttons with default labels', () => {
    render(<AlertDialog open title="Delete?" />)
    const buttons = document.body.querySelectorAll<HTMLButtonElement>('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].textContent).toBe('Annuler')
    expect(buttons[1].textContent).toBe('Confirmer')
  })

  it('renders custom labels', () => {
    render(<AlertDialog open title="Delete?" cancelLabel="Nope" confirmLabel="Yes" />)
    const buttons = document.body.querySelectorAll<HTMLButtonElement>('button')
    expect(buttons[0].textContent).toBe('Nope')
    expect(buttons[1].textContent).toBe('Yes')
  })

  it('calls onCancel and onConfirm', () => {
    const onCancel = vi.fn()
    const onConfirm = vi.fn()
    render(<AlertDialog open title="Delete?" onCancel={onCancel} onConfirm={onConfirm} />)
    const buttons = document.body.querySelectorAll<HTMLButtonElement>('button')

    act(() => { buttons[0].click() })
    expect(onCancel).toHaveBeenCalledTimes(1)

    act(() => { buttons[1].click() })
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('applies danger tone', () => {
    render(<AlertDialog open title="Delete?" tone="danger" />)
    const panel = document.body.querySelector('.mr-alert-dialog__panel')
    expect(panel?.className).toContain('mr-alert-dialog--danger')
    expect(panel?.getAttribute('data-tone')).toBe('danger')
  })

  it('forwards ref to backdrop element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<AlertDialog ref={ref} open title="Test" />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-alert-dialog__backdrop')
  })

  it('sets data-open on backdrop and panel', () => {
    render(<AlertDialog open title="Test" />)
    const backdrop = document.body.querySelector('.mr-alert-dialog__backdrop')
    const panel = document.body.querySelector('.mr-alert-dialog__panel')
    expect(backdrop?.getAttribute('data-open')).toBe('true')
    expect(panel?.getAttribute('data-open')).toBe('true')
  })

  it('accepts custom className on backdrop', () => {
    render(<AlertDialog open title="Test" className="custom-class" />)
    const backdrop = document.body.querySelector('.mr-alert-dialog__backdrop')
    expect(backdrop?.className).toContain('custom-class')
  })
})
