import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Progress } from './Progress'

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

describe('Progress', () => {
  it('renders with default value and tone', () => {
    const view = render(<Progress />)
    const track = view.querySelector('[role="progressbar"]')
    expect(track?.getAttribute('aria-valuenow')).toBe('0')
    expect(view.querySelector('.mr-progress')?.getAttribute('data-tone')).toBe('neutral')
  })

  it('displays value percentage', () => {
    const view = render(<Progress value={42} />)
    expect(view.querySelector('.mr-progress__value')?.textContent).toBe('42%')
    expect(view.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('42')
  })

  it('clamps value between 0 and 100', () => {
    const view = render(<Progress value={150} />)
    expect(view.querySelector('.mr-progress__value')?.textContent).toBe('100%')
  })

  it('hides value when showValue is false', () => {
    const view = render(<Progress value={50} showValue={false} />)
    expect(view.querySelector('.mr-progress__value')).toBeNull()
  })

  it('applies tone variants', () => {
    const view = render(<Progress tone="success" />)
    const el = view.querySelector('.mr-progress')
    expect(el?.getAttribute('data-tone')).toBe('success')
    expect(el?.className).toContain('mr-progress--success')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Progress ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-progress')
  })

  it('renders label', () => {
    const view = render(<Progress label="Uploading" />)
    expect(view.querySelector('.mr-progress__label')?.textContent).toBe('Uploading')
  })

  it('omits aria-valuenow in indeterminate mode', () => {
    const view = render(<Progress mode="indeterminate" />)
    const track = view.querySelector('[role="progressbar"]')

    expect(track?.getAttribute('aria-valuenow')).toBeNull()
    expect(track?.getAttribute('aria-valuemin')).toBe('0')
    expect(track?.getAttribute('aria-valuemax')).toBe('100')
  })

  it('is not interactive: the track carries no click semantics', () => {
    const view = render(<Progress value={30} />)
    const track = view.querySelector('[role="progressbar"]') as HTMLElement

    expect(track.onclick).toBeNull()
    expect(view.querySelector('.mr-progress--slidable')).toBeNull()
  })
})
