import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { THEME_STORAGE_KEY } from '../lib/constants'
import { getThemeScript } from './get-theme-script'

function setMatchMedia({ contrast = false, dark = false }: { contrast?: boolean; dark?: boolean }) {
  vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
    matches: query.includes('prefers-contrast') ? contrast : query.includes('dark') ? dark : false,
  })))
}

function runScript(script: string) {
  new Function(script)()
}

describe('getThemeScript', () => {
  beforeEach(() => {
    localStorage.clear()
    delete document.documentElement.dataset.theme
    delete document.documentElement.dataset.themeChoice
    document.documentElement.style.colorScheme = ''
    setMatchMedia({})
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('reste sous 1 Ko et applique le thème stocké avant le rendu', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')

    const script = getThemeScript()
    expect(new Blob([script]).size).toBeLessThan(1024)
    runScript(script)

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.dataset.themeChoice).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('migre dim vers dark et réécrit la valeur', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dim')
    runScript(getThemeScript())

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('résout system vers high-contrast avec prefers-contrast: more', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'system')
    setMatchMedia({ contrast: true, dark: false })
    runScript(getThemeScript())

    expect(document.documentElement.dataset.theme).toBe('high-contrast')
    expect(document.documentElement.dataset.themeChoice).toBe('system')
  })

  it('utilise prefers-color-scheme quand le contraste élevé est absent', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'system')
    setMatchMedia({ contrast: false, dark: true })
    runScript(getThemeScript())

    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('accepte une clé de stockage personnalisée', () => {
    localStorage.setItem('custom-theme', 'oled')
    runScript(getThemeScript({ storageKey: 'custom-theme' }))

    expect(document.documentElement.dataset.theme).toBe('oled')
  })

  it('se replie sur light si le stockage est inaccessible', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage denied')
    })

    expect(() => runScript(getThemeScript())).not.toThrow()
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})
