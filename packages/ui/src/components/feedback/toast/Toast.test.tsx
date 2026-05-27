import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Toast } from './Toast'

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

describe('Toast', () => {
  it('renders title', () => {
    const view = render(<Toast title="Saved" />)
    expect(view.querySelector('.mr-toast__title')?.textContent).toBe('Saved')
  })

  it('renders description', () => {
    const view = render(<Toast title="Done" description="File uploaded" />)
    expect(view.querySelector('.mr-toast__description')?.textContent).toBe('File uploaded')
  })

  it('renders close button when onClose is provided', () => {
    const view = render(<Toast title="Info" onClose={() => {}} />)
    expect(view.querySelector('button')).not.toBeNull()
  })

  it('applies tone data-*', () => {
    const view = render(<Toast tone="success" title="OK" />)
    const el = view.querySelector('div')
    expect(el?.className).toContain('mr-toast--success')
    expect(el?.getAttribute('data-tone')).toBe('success')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Toast ref={ref} title="Test" />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-toast')
  })
})
