import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InfiniteScroll } from './InfiniteScroll'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => { root?.render(ui) })
  return container
}

afterEach(() => {
  act(() => { root?.unmount() })
  container?.remove()
  root = null
  container = null
})

// Mock IntersectionObserver
let ioCallback: IntersectionObserverCallback = () => {}
const MockIntersectionObserver = vi.fn(function(
  this: IntersectionObserver,
  callback: IntersectionObserverCallback,
  _options?: IntersectionObserverInit,
) {
  ioCallback = callback
  this.root = null
  this.rootMargin = '0px'
  this.thresholds = [0]
  this.observe = vi.fn()
  this.unobserve = vi.fn()
  this.disconnect = vi.fn()
  this.takeRecords = vi.fn(() => [])
} as unknown as new (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => IntersectionObserver)

beforeEach(() => {
  ioCallback = () => {}
  MockIntersectionObserver.mockClear()
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
})

function triggerIntersection(isIntersecting = true) {
  act(() => {
    ioCallback([{ isIntersecting } as IntersectionObserverEntry])
  })
}

describe('InfiniteScroll', () => {
  it('renders children', () => {
    const view = render(
      <InfiniteScroll>
        <div>item 1</div>
        <div>item 2</div>
      </InfiniteScroll>,
    )
    expect(view.querySelector('.mr-infinite-scroll')).toBeTruthy()
    expect(view.textContent).toContain('item 1')
    expect(view.textContent).toContain('item 2')
  })

  it('applies base class', () => {
    const view = render(<InfiniteScroll>content</InfiniteScroll>)
    expect(view.querySelector('.mr-infinite-scroll')).toBeTruthy()
  })

  it('renders sentinel element', () => {
    const view = render(<InfiniteScroll>content</InfiniteScroll>)
    expect(view.querySelector('.mr-infinite-scroll__sentinel')).toBeTruthy()
  })

  it('calls onLoadMore when hasMore is true', () => {
    const onLoadMore = vi.fn()
    render(<InfiniteScroll onLoadMore={onLoadMore} hasMore={true}>items</InfiniteScroll>)
    triggerIntersection(true)
    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })

  it('does not call onLoadMore when hasMore is false', () => {
    const onLoadMore = vi.fn()
    render(<InfiniteScroll onLoadMore={onLoadMore} hasMore={false}>items</InfiniteScroll>)
    triggerIntersection(true)
    expect(onLoadMore).not.toHaveBeenCalled()
  })

  it('shows endMessage when hasMore is false and items exist', () => {
    const view = render(
      <InfiniteScroll hasMore={false} endMessage={<span>End of list</span>}>
        <div>item</div>
      </InfiniteScroll>,
    )
    expect(view.textContent).toContain('End of list')
  })

  it('shows emptyMessage when hasMore is false and no items', () => {
    const view = render(
      <InfiniteScroll hasMore={false} emptyMessage={<span>Nothing here</span>} />,
    )
    expect(view.textContent).toContain('Nothing here')
  })

  it('shows loader during loading', () => {
    const view = render(
      <InfiniteScroll hasMore={true} onLoadMore={() => {}} loader={<span>Loading...</span>}>
        <div>item</div>
      </InfiniteScroll>,
    )
    triggerIntersection(true)
    expect(view.textContent).toContain('Loading...')
  })

  it('shows error state and retry button', () => {
    const onRetry = vi.fn()
    const view = render(
      <InfiniteScroll error={<span>Error!</span>} onRetry={onRetry}>
        <div>item</div>
      </InfiniteScroll>,
    )
    expect(view.textContent).toContain('Error!')
    const retryBtn = view.querySelector('.mr-infinite-scroll__retry')
    expect(retryBtn).toBeTruthy()
    act(() => { retryBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true })) })
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<InfiniteScroll ref={ref}>content</InfiniteScroll>)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-infinite-scroll')
  })

  it('places sentinel before children in reverse mode', () => {
    const view = render(
      <InfiniteScroll reverse={true}>
        <div>item</div>
      </InfiniteScroll>,
    )
    const parent = view.querySelector('.mr-infinite-scroll')
    const sentinel = view.querySelector('.mr-infinite-scroll__sentinel')
    expect(parent?.firstChild).toBe(sentinel)
  })

  it('accepts custom className', () => {
    const view = render(<InfiniteScroll className="custom-class">content</InfiniteScroll>)
    expect(view.querySelector('.mr-infinite-scroll')?.className).toContain('custom-class')
  })

  it('applies data-reverse attribute when reverse is true', () => {
    const view = render(<InfiniteScroll reverse={true}>content</InfiniteScroll>)
    expect(view.querySelector('[data-reverse]')).toBeTruthy()
  })

  it('respects cooldown to prevent multiple calls', () => {
    const onLoadMore = vi.fn()
    render(<InfiniteScroll onLoadMore={onLoadMore} hasMore={true} cooldown={100}>items</InfiniteScroll>)

    triggerIntersection(true)
    expect(onLoadMore).toHaveBeenCalledTimes(1)

    triggerIntersection(true)
    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })

  it('creates IntersectionObserver with custom options', () => {
    const scrollableParent = document.createElement('div')
    render(
      <InfiniteScroll
        threshold={0.5}
        rootMargin="200px"
        scrollableParent={scrollableParent}
      >
        items
      </InfiniteScroll>,
    )

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        root: scrollableParent,
        rootMargin: '200px',
        threshold: 0.5,
      }),
    )
  })
})
