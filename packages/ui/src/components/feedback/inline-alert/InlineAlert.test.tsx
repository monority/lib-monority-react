import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { InlineAlert } from './InlineAlert'

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

describe('InlineAlert', () => {
  it('renders with info tone and status role by default', () => {
    const view = render(<InlineAlert title="Info" />)
    const el = view.querySelector('.mr-inline-alert')
    expect(el?.getAttribute('role')).toBe('status')
    expect(el?.getAttribute('data-tone')).toBe('info')
  })

  it('uses alert role for warning and danger', () => {
    const warning = render(<InlineAlert title="Warn" tone="warning" />)
    expect(warning.querySelector('.mr-inline-alert')?.getAttribute('role')).toBe('alert')

    const danger = render(<InlineAlert title="Danger" tone="danger" />)
    expect(danger.querySelector('.mr-inline-alert')?.getAttribute('role')).toBe('alert')
  })

  it('renders title and description', () => {
    const view = render(<InlineAlert title="Error" description="Something broke" />)
    expect(view.querySelector('.mr-inline-alert__title')?.textContent).toBe('Error')
    expect(view.querySelector('.mr-inline-alert__description')?.textContent).toBe('Something broke')
  })

  it('renders action button when actionLabel is provided', () => {
    const view = render(<InlineAlert title="Retry?" actionLabel="Retry" />)
    expect(view.querySelector('button')?.textContent).toBe('Retry')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<InlineAlert ref={ref} title="Test" />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-inline-alert')
  })
})
