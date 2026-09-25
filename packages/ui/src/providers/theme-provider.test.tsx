import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { THEME_STORAGE_KEY } from '../lib/constants'
import { ThemeProvider } from './theme-provider'
import { useTheme } from '../hooks/use-theme'

interface MediaController {
  matches: boolean
  listeners: Set<(event: MediaQueryListEvent) => void>
}

function installMatchMedia(initial: { contrast?: boolean; dark?: boolean } = {}) {
  const media = new Map<string, MediaController>()

  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string): MediaQueryList => {
      const controller = media.get(query) ?? {
        matches: query.includes('prefers-contrast') ? Boolean(initial.contrast) : Boolean(initial.dark),
        listeners: new Set<(event: MediaQueryListEvent) => void>(),
      }
      media.set(query, controller)
      return {
        get matches() {
          return controller.matches
        },
        media: query,
        onchange: null,
        addEventListener: (_type: string, listener: EventListener) =>
          controller.listeners.add(listener as (event: MediaQueryListEvent) => void),
        removeEventListener: (_type: string, listener: EventListener) =>
          controller.listeners.delete(listener as (event: MediaQueryListEvent) => void),
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => true,
      } as MediaQueryList
    }),
  )

  return {
    emit(query: string, matches: boolean) {
      const controller = media.get(query)
      if (!controller) throw new Error(`MediaQueryList absente: ${query}`)
      controller.matches = matches
      const event = { matches, media: query } as MediaQueryListEvent
      act(() => controller.listeners.forEach((listener) => listener(event)))
    },
    listenerCount(query: string) {
      return media.get(query)?.listeners.size ?? 0
    },
  }
}

function Reader({ readIsDark = false }: { readIsDark?: boolean }) {
  const context = useTheme()
  const { resolvedTheme, setTheme, theme } = context
  const isDark = readIsDark ? context.isDark : undefined
  return (
    <div>
      <output data-testid="state">{`${theme}|${resolvedTheme}|${String(isDark)}`}</output>
      <button type="button" onClick={() => setTheme('high-contrast')}>
        high contrast
      </button>
      <button type="button" onClick={() => setTheme('light')}>
        light
      </button>
    </div>
  )
}

function renderProvider() {
  return render(
    <ThemeProvider>
      <Reader />
    </ThemeProvider>,
  )
}

beforeEach(() => {
  localStorage.clear()
  delete document.documentElement.dataset.theme
  delete document.documentElement.dataset.themeChoice
  document.documentElement.style.colorScheme = ''
  installMatchMedia()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('ThemeProvider', () => {
  it('lit le snapshot DOM sans lire localStorage ni matchMedia au rendu', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    document.documentElement.dataset.theme = 'dark'
    document.documentElement.dataset.themeChoice = 'dark'
    const storageSpy = vi.spyOn(Storage.prototype, 'getItem')

    renderProvider()

    expect(screen.getByTestId('state').textContent).toBe('dark|dark|undefined')
    expect(storageSpy).not.toHaveBeenCalled()
    expect(matchMedia).not.toHaveBeenCalled()
  })

  it('setTheme écrit le choix, le thème résolu et le schéma de couleur', () => {
    document.documentElement.dataset.theme = 'light'
    document.documentElement.dataset.themeChoice = 'light'
    renderProvider()

    fireEvent.click(screen.getByRole('button', { name: 'high contrast' }))

    expect(screen.getByTestId('state').textContent).toBe('high-contrast|high-contrast|undefined')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('high-contrast')
    expect(document.documentElement.dataset.theme).toBe('high-contrast')
    expect(document.documentElement.dataset.themeChoice).toBe('high-contrast')
    expect(document.documentElement.style.colorScheme).toBe('light')
  })

  it('écoute les préférences système uniquement lorsque le choix est system', async () => {
    const media = installMatchMedia({ contrast: false, dark: false })
    document.documentElement.dataset.theme = 'light'
    document.documentElement.dataset.themeChoice = 'system'
    renderProvider()
    expect(media.listenerCount('(prefers-color-scheme: dark)')).toBeGreaterThan(0)

    media.emit('(prefers-color-scheme: dark)', true)
    expect(screen.getByTestId('state').textContent).toBe('system|dark|undefined')
    expect(document.documentElement.dataset.theme).toBe('dark')

    fireEvent.click(screen.getByRole('button', { name: 'light' }))
    await waitFor(() =>
      expect(media.listenerCount('(prefers-color-scheme: dark)')).toBe(0),
    )
  })

  it('migre une valeur stockée dim vers dark', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dim')
    renderProvider()

    await waitFor(() => expect(document.documentElement.dataset.themeChoice).toBe('dark'))
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    expect(screen.getByTestId('state').textContent).toBe('dark|dark|undefined')
  })

  it('H2: hydrate sans alerte après un thème posé par le script de tête', async () => {
    document.documentElement.dataset.theme = 'dark'
    document.documentElement.dataset.themeChoice = 'dark'
    const container = document.createElement('div')
    container.innerHTML = renderToString(
      <ThemeProvider>
        <span>Hydraté</span>
      </ThemeProvider>,
    )
    document.body.append(container)
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const root = hydrateRoot(
      container,
      <ThemeProvider>
        <span>Hydraté</span>
      </ThemeProvider>,
    )

    await act(async () => undefined)
    expect(container.textContent).toBe('Hydraté')
    expect(consoleError.mock.calls.flat().join(' ')).not.toMatch(/hydrat|did not match/i)
    act(() => root.unmount())
    container.remove()
  })

  it('avertit une seule fois en développement lors de la lecture de isDark', () => {
    document.documentElement.dataset.theme = 'light'
    document.documentElement.dataset.themeChoice = 'light'
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const { rerender } = render(
      <ThemeProvider>
        <Reader readIsDark />
      </ThemeProvider>,
    )

    rerender(
      <ThemeProvider>
        <Reader readIsDark />
      </ThemeProvider>,
    )

    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0]?.[0]).toContain('isDark')
  })
})
