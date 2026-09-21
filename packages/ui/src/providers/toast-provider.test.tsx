import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ToastProvider } from './toast-provider'
import { ToastContext } from '../contexts/toast-context'

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

function MountedReader({ actions }: { actions: (ctx: { pushToast: (t: unknown) => string; dismissToast: (id: string) => void }) => void }) {
  return (
    <ToastProvider>
      <ToastContext.Consumer>
        {(ctx) => {
          if (!ctx) return null
          return (
            <button
              type="button"
              data-testid="actions"
              onClick={() => actions({ pushToast: ctx.pushToast, dismissToast: ctx.dismissToast })}
            >
              actions
            </button>
          )
        }}
      </ToastContext.Consumer>
    </ToastProvider>
  )
}

function clickActions(container: HTMLElement) {
  const button = container.querySelector('[data-testid="actions"]') as HTMLButtonElement
  act(() => {
    button.click()
  })
}

function getViewport(): HTMLElement | null {
  return document.querySelector('.mr-toast-viewport')
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  act(() => {
    root?.unmount()
  })
  container?.remove()
  root = null
  container = null
})

describe('ToastProvider', () => {
  it('renders pushed toasts inside the viewport', () => {
    let container2: HTMLElement | null = null
    container2 = render(
      <MountedReader
        actions={({ pushToast }) => {
          pushToast({ title: 'First', tone: 'success' })
        }}
      />,
    )
    clickActions(container2)

    expect(getViewport()).not.toBeNull()
    expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(1)
    expect(getViewport()?.textContent).toContain('First')
  })

  it('supports several toasts simultaneously', () => {
    let container2: HTMLElement | null = null
    container2 = render(
      <MountedReader
        actions={({ pushToast }) => {
          pushToast({ title: 'One' })
          pushToast({ title: 'Two' })
        }}
      />,
    )
    clickActions(container2)

    expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(2)
  })

  it('auto-dismisses each toast after its own duration', () => {
    let container2: HTMLElement | null = null
    container2 = render(
      <MountedReader
        actions={({ pushToast }) => {
          pushToast({ title: 'Short', duration: 1000 })
          pushToast({ title: 'Long', duration: 5000 })
        }}
      />,
    )
    clickActions(container2)
    expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(2)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(1)
    expect(getViewport()?.textContent).toContain('Long')

    act(() => {
      vi.advanceTimersByTime(4000)
    })
    expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(0)
  })

  it('does not reset an existing countdown when another toast is pushed', () => {
    let pushedOnce = false
    let container2: HTMLElement | null = null
    container2 = render(
      <MountedReader
        actions={({ pushToast }) => {
          if (!pushedOnce) {
            pushToast({ title: 'First', duration: 2000 })
            pushedOnce = true
          } else {
            pushToast({ title: 'Second', duration: 1000 })
          }
        }}
      />,
    )
    clickActions(container2)

    act(() => {
      vi.advanceTimersByTime(1500)
    })
    // Push a second toast mid-flight of the first countdown
    clickActions(container2)
    expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(2)

    // The first toast (2000ms) must still be dismissed on schedule
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(1)
    expect(getViewport()?.textContent).toContain('Second')
  })

  it('dismisses manually via dismissToast or the close button', () => {
    let container2: HTMLElement | null = null
    container2 = render(
      <MountedReader
        actions={({ pushToast }) => {
          pushToast({ title: 'Sticky', duration: Infinity })
        }}
      />,
    )
    clickActions(container2)
    expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(1)

    const closeButton = getViewport()?.querySelector('button') as HTMLButtonElement
    act(() => {
      closeButton.click()
    })
    expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(0)
  })

  it('keeps duration=Infinity toasts until manually dismissed', () => {
    let container2: HTMLElement | null = null
    container2 = render(
      <MountedReader
        actions={({ pushToast }) => {
          pushToast({ title: 'Persistent', duration: Infinity })
        }}
      />,
    )
    clickActions(container2)

    act(() => {
      vi.advanceTimersByTime(60000)
    })
    expect(getViewport()?.querySelectorAll('.mr-toast').length).toBe(1)
  })
})
