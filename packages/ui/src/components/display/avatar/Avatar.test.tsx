import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Avatar } from './Avatar'

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

describe('Avatar', () => {
  it('renders initials when no src', () => {
    const view = render(<Avatar name="John Doe" />)
    expect(view.querySelector('.mr-avatar__initials')?.textContent).toBe('JD')
  })

  it('renders image when src is provided', () => {
    const view = render(<Avatar src="photo.jpg" alt="User" />)
    expect(view.querySelector('img')?.getAttribute('src')).toBe('photo.jpg')
  })

  it('falls back to initials on image error', () => {
    const view = render(<Avatar src="bad.jpg" name="Jane" />)
    act(() =>
      view.querySelector('img')?.dispatchEvent(new Event('error')),
    )
    expect(view.querySelector('.mr-avatar__initials')).toBeTruthy()
    expect(view.querySelector('img')).toBeNull()
  })

  it('applies sizes', () => {
    const view = render(<Avatar size="lg" name="Test" />)
    expect(view.querySelector('div')?.getAttribute('data-size')).toBe('lg')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Avatar ref={ref} name="Test" />)
    expect(ref.current?.className).toContain('mr-avatar')
  })
})
