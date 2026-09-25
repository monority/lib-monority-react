import { describe, expect, it } from 'vitest'
import { DEFAULT_DESIGN_CONFIG, DESIGN_PRESETS, resolveDesignConfig } from './design-config'

describe('design configuration', () => {
  it('exposes independent axes and a dark default', () => {
    expect(DEFAULT_DESIGN_CONFIG).toMatchObject({ theme: 'dark', accent: 'cyan', componentColor: 'theme' })
    expect(DESIGN_PRESETS.accents).toHaveLength(9)
    expect(DESIGN_PRESETS.chartPalettes).toHaveLength(4)
  })

  it('composes accent, component, radius, spacing and chart axes independently', () => {
    const resolved = resolveDesignConfig({
      theme: 'light',
      brand: 'monority',
      accent: 'violet',
      componentColor: 'blue',
      chartPalette: 'ocean',
      radius: 'rounded',
      spacing: 'dense',
      density: 'compact',
    })
    expect(resolved.themeDensity).toBe('compact')
    expect(resolved.accent).toEqual({ hue: 295, chroma: 0.14 })
    expect(resolved.componentColor).toContain('245')
    expect(resolved.chartColors).toHaveLength(5)
    expect(resolved.style['--mr-radius-control']).toBe('10px')
    expect(resolved.style['--mr-spacing-4']).toBe('12px')
    expect(resolved.style['--mr-chart-1']).toContain('200')
  })
})
