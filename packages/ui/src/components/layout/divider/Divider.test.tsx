import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Divider } from './Divider'

let containerEl: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  containerEl = document.createElement('div')
  document.body.appendChild(containerEl)
  root = createRoot(containerEl)
  act(() => root?.render(ui))
  return containerEl
}

afterEach(() => {
  act(() => root?.unmount())
  containerEl?.remove()
  root = null
  containerEl = null
})

describe('Divider', () => {
  it('renders hr with separator role', () => {
    const view = render(<Divider />)
    const hr = view.querySelector('hr')
    expect(hr?.getAttribute('role')).toBe('separator')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLHRElement>()
    render(<Divider ref={ref} />)
    expect(ref.current?.tagName).toBe('HR')
  })
})
