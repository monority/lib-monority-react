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

  it('renders explicit children as the fallback instead of derived initials', () => {
    const view = render(<Avatar name="Maya Chen">MC</Avatar>)
    const fallback = view.querySelector('.mr-avatar__initials')

    expect(fallback?.textContent).toBe('MC')
  })

  it('exposes the accessible name from alt when provided', () => {
    const view = render(<Avatar name="Maya Chen" alt="Maya Chen" />)
    const root = view.querySelector('.mr-avatar') as HTMLElement

    expect(root.getAttribute('role')).toBe('img')
    expect(root.getAttribute('aria-label')).toBe('Maya Chen')
  })

  it('exposes the accessible name from name when alt is absent', () => {
    const view = render(<Avatar name="Noah Price" />)
    const root = view.querySelector('.mr-avatar') as HTMLElement

    expect(root.getAttribute('role')).toBe('img')
    expect(root.getAttribute('aria-label')).toBe('Noah Price')
  })

  it('stays decorative when no accessible name exists', () => {
    const view = render(<Avatar />)
    const root = view.querySelector('.mr-avatar') as HTMLElement

    expect(root.getAttribute('role')).toBeNull()
    expect(root.getAttribute('aria-label')).toBeNull()
  })

  it('hides the fallback from the accessibility tree (name carries it)', () => {
    const view = render(<Avatar name="Ana Lee" />)
    expect(view.querySelector('.mr-avatar__initials')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('uses a placeholder when name is missing entirely', () => {
    const view = render(<Avatar />)
    expect(view.querySelector('.mr-avatar__initials')?.textContent).toBe('?')
  })
})
