import { vi } from 'vitest'

/**
 * React 19 expose ce drapeau en global pour autoriser `act()`.
 * React ne le type pas : on le déclare ici plutôt que de caster
 * `globalThis` sur chaque ligne.
 */
declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean
}

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

// Sans ce drapeau, act() journalise un avertissement en boucle sur les
// rendus montés à la main (createRoot + render).
globalThis.IS_REACT_ACT_ENVIRONMENT = true
