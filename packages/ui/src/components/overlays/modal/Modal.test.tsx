import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'

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

function renderWithRerender(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)

  act(() => {
    root?.render(ui)
  })

  return {
    container,
    rerender: (nextUi: ReactElement) => {
      act(() => {
        root?.render(nextUi)
      })
    },
  }
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

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} title="Settings" onClose={vi.fn()}>
        Content
      </Modal>,
    )

    expect(document.body.querySelector('.mr-modal')).toBeNull()
  })

  it('renders dialog semantics and stable hooks when open', () => {
    render(
      <Modal open title="Settings" onClose={vi.fn()}>
        Content
      </Modal>,
    )
    const modal = document.body.querySelector('.mr-modal')
    const dialog = document.body.querySelector('[role="dialog"]')
    const title = document.body.querySelector('.mr-modal__title')

    expect(modal?.getAttribute('data-open')).toBe('true')
    expect(dialog?.className).toContain('mr-modal__panel')
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
    expect(dialog?.getAttribute('aria-labelledby')).toBe(title?.getAttribute('id'))
    expect(title?.textContent).toBe('Settings')
    expect(document.body.querySelector('.mr-modal__body')?.textContent).toBe('Content')
  })

  it('calls onClose from backdrop and close button', () => {
    const onClose = vi.fn()
    render(
      <Modal open title="Settings" onClose={onClose}>
        Content
      </Modal>,
    )

    act(() => {
      document.body.querySelector<HTMLDivElement>('.mr-modal__backdrop')?.click()
      document.body.querySelector<HTMLButtonElement>('[aria-label="Fermer la fenetre"]')?.click()
    })

    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('forwards ref to the root modal element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Modal ref={ref} open title="Test" onClose={() => {}} />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-modal')
  })

  it('sets data-open when open is true', () => {
    render(<Modal open title="Test" onClose={() => {}} />)
    const wrapper = document.body.querySelector('.mr-modal')
    expect(wrapper?.getAttribute('data-open')).toBe('true')
  })

  it('accepts custom className', () => {
    render(<Modal open title="Test" onClose={() => {}} className="custom" />)
    const wrapper = document.body.querySelector('.mr-modal')
    expect(wrapper?.className).toContain('custom')
  })

  it('closes on Escape keydown', () => {
    const onClose = vi.fn()
    render(
      <Modal open title="Settings" onClose={onClose}>
        Content
      </Modal>,
    )

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes on backdrop click', () => {
    const onClose = vi.fn()
    render(
      <Modal open title="Settings" onClose={onClose}>
        Content
      </Modal>,
    )

    act(() => {
      document.body.querySelector<HTMLDivElement>('.mr-modal__backdrop')?.click()
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('locks body scroll when open', () => {
    render(<Modal open title="Test" onClose={() => {}}>Content</Modal>)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('unlocks body scroll when closed', () => {
    const { rerender } = renderWithRerender(
      <Modal open title="Test" onClose={() => {}}>Content</Modal>,
    )
    expect(document.body.style.overflow).toBe('hidden')

    rerender(<Modal open={false} title="Test" onClose={() => {}}>Content</Modal>)
    expect(document.body.style.overflow).toBe('')
  })
})
