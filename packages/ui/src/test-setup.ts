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
