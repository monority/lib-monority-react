import type { CSSProperties } from 'react'
import type { ResolvedThemeName } from './constants'

export type AccentPreset = 'cyan' | 'blue' | 'violet' | 'indigo' | 'green' | 'amber' | 'orange' | 'red' | 'rose'
export type ComponentColorPreset = 'theme' | AccentPreset | 'neutral'
export type ChartPalettePreset = 'default' | 'ocean' | 'spectrum' | 'warm'
export type RadiusPreset = 'sharp' | 'compact' | 'default' | 'rounded' | 'pill'
export type SpacingPreset = 'dense' | 'default' | 'comfortable' | 'airy'
export type LayoutDensityPreset = 'compact' | 'default' | 'spacious'
export type BrandPreset = 'monority' | 'studio'

export interface DesignConfig {
  theme: ResolvedThemeName
  brand: BrandPreset
  accent: AccentPreset
  componentColor: ComponentColorPreset
  chartPalette: ChartPalettePreset
  radius: RadiusPreset
  spacing: SpacingPreset
  density: LayoutDensityPreset
}

export const DEFAULT_DESIGN_CONFIG: DesignConfig = {
  theme: 'dark',
  brand: 'monority',
  accent: 'cyan',
  componentColor: 'theme',
  chartPalette: 'default',
  radius: 'default',
  spacing: 'default',
  density: 'default',
}

export const DESIGN_PRESETS = {
  accents: [
    { value: 'cyan', label: 'Cyan' }, { value: 'blue', label: 'Blue' },
    { value: 'violet', label: 'Violet' }, { value: 'indigo', label: 'Indigo' },
    { value: 'green', label: 'Green' }, { value: 'amber', label: 'Amber' },
    { value: 'orange', label: 'Orange' }, { value: 'red', label: 'Red' },
    { value: 'rose', label: 'Rose' },
  ],
  componentColors: [
    { value: 'theme', label: 'Theme' }, { value: 'cyan', label: 'Cyan' },
    { value: 'blue', label: 'Blue' }, { value: 'violet', label: 'Violet' },
    { value: 'neutral', label: 'Neutral' },
  ],
  chartPalettes: [
    { value: 'default', label: 'Default' }, { value: 'ocean', label: 'Ocean' },
    { value: 'spectrum', label: 'Spectrum' }, { value: 'warm', label: 'Warm' },
  ],
  radii: [
    { value: 'sharp', label: 'Sharp' }, { value: 'compact', label: 'Compact' },
    { value: 'default', label: 'Default' }, { value: 'rounded', label: 'Rounded' },
    { value: 'pill', label: 'Pill' },
  ],
  spacings: [
    { value: 'dense', label: 'Dense' }, { value: 'default', label: 'Default' },
    { value: 'comfortable', label: 'Comfortable' }, { value: 'airy', label: 'Airy' },
  ],
  densities: [
    { value: 'compact', label: 'Compact' }, { value: 'default', label: 'Default' },
    { value: 'spacious', label: 'Spacious' },
  ],
  brands: [
    { value: 'monority', label: 'Monority' }, { value: 'studio', label: 'Studio' },
  ],
}

const accentColors: Record<AccentPreset, { hue: number; chroma: number }> = {
  cyan: { hue: 200, chroma: 0.12 }, blue: { hue: 245, chroma: 0.13 }, violet: { hue: 295, chroma: 0.14 },
  indigo: { hue: 275, chroma: 0.14 }, green: { hue: 150, chroma: 0.12 }, amber: { hue: 75, chroma: 0.14 },
  orange: { hue: 45, chroma: 0.15 }, red: { hue: 25, chroma: 0.15 }, rose: { hue: 350, chroma: 0.13 },
}

const chartColors: Record<ChartPalettePreset, [number, number, number, number, number]> = {
  default: [200, 150, 75, 25, 255], ocean: [200, 230, 195, 160, 320], spectrum: [25, 75, 150, 200, 275], warm: [25, 45, 75, 15, 350],
}

const radiusValues: Record<RadiusPreset, [string, string, string, string]> = {
  sharp: ['0px', '2px', '4px', '6px'], compact: ['2px', '4px', '6px', '8px'],
  default: ['4px', '6px', '10px', '12px'], rounded: ['6px', '10px', '16px', '20px'],
  pill: ['10px', '16px', '9999px', '9999px'],
}

const spacingFactors: Record<SpacingPreset, number> = { dense: 0.75, default: 1, comfortable: 1.125, airy: 1.25 }
const spacingBase = { '0-5': 2, '1': 4, '1-5': 6, '2': 8, '3': 12, '4': 16, '5': 20, '6': 24, '8': 32, '10': 40, '12': 48, '16': 64, '20': 80, '24': 96 }

export interface ResolvedDesignConfig {
  style: CSSProperties
  themeDensity: 'comfortable' | 'compact'
  accent: { hue: number; chroma: number }
  componentColor: string
  chartColors: string[]
}

export function resolveDesignConfig(config: DesignConfig): ResolvedDesignConfig {
  const accent = accentColors[config.accent]
  const component = config.componentColor === 'theme' ? 'var(--mr-accent)' : config.componentColor === 'neutral' ? 'var(--mr-text-secondary)' : `oklch(0.52 0.14 ${accentColors[config.componentColor].hue})`
  const radius = radiusValues[config.radius]
  const factor = spacingFactors[config.spacing]
  const spacing = Object.fromEntries(Object.entries(spacingBase).map(([key, value]) => [`--mr-spacing-${key}`, `${Number((value * factor).toFixed(2))}px`]))
  const charts = chartColors[config.chartPalette].map((hue) => `oklch(0.72 0.12 ${hue})`)
  const densityGap = config.density === 'spacious' ? '20px' : config.density === 'compact' ? '10px' : '16px'

  return {
    themeDensity: config.density === 'compact' ? 'compact' : 'comfortable',
    accent,
    componentColor: component,
    chartColors: charts,
    style: {
      '--mr-brand-hue': String(accent.hue),
      '--mr-brand-chroma': String(accent.chroma),
      '--mr-control-accent': component,
      '--mr-control-accent-hover': component === 'var(--mr-accent)' ? 'var(--mr-accent-hover)' : 'color-mix(in srgb, var(--mr-control-accent) 88%, black)',
      '--mr-control-accent-active': component === 'var(--mr-accent)' ? 'var(--mr-accent-active)' : 'color-mix(in srgb, var(--mr-control-accent) 78%, black)',
      '--mr-control-on-accent': config.componentColor === 'theme' ? 'var(--mr-on-accent)' : '#ffffff',
      '--mr-control-accent-subtle': 'color-mix(in srgb, var(--mr-control-accent) 18%, transparent)',
      '--mr-chart-1': charts[0], '--mr-chart-2': charts[1], '--mr-chart-3': charts[2], '--mr-chart-4': charts[3], '--mr-chart-5': charts[4],
      '--mr-radius-inline': radius[0], '--mr-radius-control': radius[1], '--mr-radius-card': radius[2], '--mr-radius-overlay': radius[3],
      '--mr-section-gap': densityGap, '--mr-grid-gap': densityGap,
      ...spacing,
    } as CSSProperties,
  }
}

export function designConfigToJSON(config: DesignConfig): string {
  return JSON.stringify(config, null, 2)
}
