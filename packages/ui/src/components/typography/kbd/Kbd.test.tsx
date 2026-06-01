import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Kbd } from './Kbd'

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

describe('Kbd', () => {
  it('renders kbd element', () => {
    const view = render(<Kbd>Ctrl</Kbd>)
    const el = view.querySelector('kbd')
    expect(el).toBeTruthy()
    expect(el?.textContent).toBe('Ctrl')
  })

  it('renders children', () => {
    const view = render(<Kbd>Enter</Kbd>)
    const el = view.querySelector('kbd')
    expect(el?.textContent).toBe('Enter')
  })

  it('renders keys array with separators', () => {
    const view = render(<Kbd keys={['Ctrl', 'C']} />)
    const el = view.querySelector('kbd')
    expect(el?.textContent).toBe('Ctrl+C')
    const separators = view.querySelectorAll('.mr-kbd__separator')
    expect(separators.length).toBe(1)
    expect(separators[0]?.textContent).toBe('+')
  })

  it('renders keys array with multiple separators', () => {
    const view = render(<Kbd keys={['Ctrl', 'Shift', 'C']} />)
    const el = view.querySelector('kbd')
    expect(el?.textContent).toBe('Ctrl+Shift+C')
    const separators = view.querySelectorAll('.mr-kbd__separator')
    expect(separators.length).toBe(2)
  })

  it('applies size variant sm', () => {
    const view = render(<Kbd size="sm">Esc</Kbd>)
    const el = view.querySelector('kbd')
    expect(el?.className).toContain('mr-kbd--sm')
  })

  it('applies size variant md (default)', () => {
    const view = render(<Kbd>Tab</Kbd>)
    const el = view.querySelector('kbd')
    expect(el?.className).toBe('mr-kbd')
  })

  it('applies size variant lg', () => {
    const view = render(<Kbd size="lg">Delete</Kbd>)
    const el = view.querySelector('kbd')
    expect(el?.className).toContain('mr-kbd--lg')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>()
    render(<Kbd ref={ref}>Shift</Kbd>)
    expect(ref.current?.tagName).toBe('KBD')
  })

  it('applies custom className', () => {
    const view = render(<Kbd className="custom-class">Alt</Kbd>)
    const el = view.querySelector('kbd')
    expect(el?.className).toContain('custom-class')
  })

  it('spreads extra props', () => {
    const view = render(<Kbd data-testid="kbd-test">F1</Kbd>)
    const el = view.querySelector('kbd')
    expect(el?.getAttribute('data-testid')).toBe('kbd-test')
  })
})
