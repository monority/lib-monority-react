import { vi } from 'vitest'

// Mock IntersectionObserver for jsdom test environment
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  root = null
  rootMargin = '0px'
  thresholds = [0]
  takeRecords = vi.fn(() => [])
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

// React 19 : sans cela, act() journalise un avertissement en boucle sur
// les rendus montés à la main (createRoot + render).
;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
