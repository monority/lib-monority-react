import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from 'vitest'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    }),
})

// No globals to expose here; each test imports what it needs directly.
