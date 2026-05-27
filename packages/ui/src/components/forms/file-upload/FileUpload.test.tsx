import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { FileUpload } from './FileUpload'

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

describe('FileUpload', () => {
  it('renders with type file and default md size', () => {
    const view = render(<FileUpload label="Upload" />)
    const input = view.querySelector('input')
    expect(input?.type).toBe('file')
    expect(input?.getAttribute('data-size')).toBe('md')
    expect(input?.className).toContain('mr-file-upload--md')
  })

  it('maps disabled, required and error states', () => {
    const view = render(<FileUpload label="Doc" disabled required error="Required" />)
    const input = view.querySelector('input')
    expect(input?.disabled).toBe(true)
    expect(input?.required).toBe(true)
    expect(input?.getAttribute('aria-invalid')).toBe('true')
    expect(input?.getAttribute('data-disabled')).toBe('true')
    expect(input?.getAttribute('data-required')).toBe('true')
    expect(input?.getAttribute('data-invalid')).toBe('true')
  })

  it('forwards ref to native input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<FileUpload ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('file')
  })

  it('applies sm and lg sizes', () => {
    const sm = render(<FileUpload size="sm" />)
    expect(sm.querySelector('input')?.getAttribute('data-size')).toBe('sm')
    const lg = render(<FileUpload size="lg" />)
    expect(lg.querySelector('input')?.getAttribute('data-size')).toBe('lg')
  })

  it('renders hint and error with aria-describedby', () => {
    const view = render(<FileUpload hint="PDF only" error="Wrong format" />)
    const describedBy = view.querySelector('input')?.getAttribute('aria-describedby')
    expect(describedBy).toContain('-hint')
    expect(describedBy).toContain('-error')
  })
})
