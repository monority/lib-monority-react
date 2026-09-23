import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { AsyncStateNotice } from './AsyncStateNotice'

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

describe('AsyncStateNotice', () => {
  it('returns null when neither loading nor error', () => {
    const view = render(<AsyncStateNotice />)
    expect(view.innerHTML).toBe('')
  })

  it('renders loading message when isLoading', () => {
    const view = render(<AsyncStateNotice isLoading />)
    const el = view.querySelector('div')
    expect(el?.textContent).toBe('Loading...')
  })

  it('renders error message when isError', () => {
    const view = render(<AsyncStateNotice isError />)
    const el = view.querySelector('div')
    expect(el?.textContent).toBe('An error occurred')
  })

  it('uses role="status" for loading and role="alert" for error', () => {
    const loading = render(<AsyncStateNotice isLoading />)
    expect(loading.querySelector('div')?.getAttribute('role')).toBe('status')

    const error = render(<AsyncStateNotice isError />)
    expect(error.querySelector('div')?.getAttribute('role')).toBe('alert')
  })

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>()
        render(<AsyncStateNotice isLoading ref={ref} />)
        expect(ref.current?.tagName).toBe('DIV')
    })

    it('marks loading and error states for styling', () => {
        const loading = render(<AsyncStateNotice isLoading />)
        expect(loading.querySelector('[data-state="loading"]')).toBeTruthy()
        expect(
            loading.querySelector('.mr-async-state-notice--loading'),
        ).toBeTruthy()

        const error = render(<AsyncStateNotice isError />)
        expect(error.querySelector('[data-state="error"]')).toBeTruthy()
        expect(error.querySelector('.mr-async-state-notice--error')).toBeTruthy()
    })

    it('renders an aria-hidden spinner by default while loading', () => {
        const view = render(<AsyncStateNotice isLoading />)
        const spinner = view.querySelector('.mr-spinner__ring')
        expect(spinner).toBeTruthy()
        expect(spinner?.parentElement?.getAttribute('aria-hidden')).toBe('true')
    })

    it('omits the default spinner when custom loading content is provided', () => {
        const view = render(<AsyncStateNotice isLoading loadingContent={<em>busy</em>} />)
        expect(view.querySelector('.mr-spinner__ring')).toBeNull()
        expect(view.textContent).toBe('busy')
    })
})
