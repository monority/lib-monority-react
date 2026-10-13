import type { CSSProperties } from 'react'
import type { ResolvedThemeName } from './constants'

export type AccentPreset =
    | 'neutral'
    | 'cyan'
    | 'blue'
    | 'violet'
    | 'indigo'
    | 'green'
    | 'amber'
    | 'orange'
    | 'red'
    | 'rose'
export type ChartPalettePreset = 'default' | 'ocean' | 'spectrum' | 'warm'
export type RadiusPreset = 'sharp' | 'compact' | 'default' | 'rounded' | 'pill'
export type SpacingPreset = 'dense' | 'default' | 'comfortable' | 'airy'
export type LayoutDensityPreset = 'compact' | 'default' | 'spacious'
export type BrandPreset = 'monority' | 'studio'

export interface DesignConfig {
    theme: ResolvedThemeName
    brand: BrandPreset
    accent: AccentPreset
    chartPalette: ChartPalettePreset
    radius: RadiusPreset
    spacing: SpacingPreset
    density: LayoutDensityPreset
}

export const DEFAULT_DESIGN_CONFIG: DesignConfig = {
    theme: 'dark',
    brand: 'monority',
    accent: 'neutral',
    chartPalette: 'default',
    radius: 'default',
    spacing: 'default',
    density: 'default',
}

export const DESIGN_PRESETS = {
    /* `high-contrast` is absent on purpose: it is an accessibility requirement
     driven by `prefers-contrast`, not a look the user picks. */
    themes: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'slate', label: 'Slate' },
        { value: 'oled', label: 'OLED' },
        { value: 'ocean', label: 'Ocean' },
        { value: 'night', label: 'Night' },
    ],
    accents: [
        { value: 'neutral', label: 'Neutral' },
        { value: 'cyan', label: 'Cyan' },
        { value: 'blue', label: 'Blue' },
        { value: 'violet', label: 'Violet' },
        { value: 'indigo', label: 'Indigo' },
        { value: 'green', label: 'Green' },
        { value: 'amber', label: 'Amber' },
        { value: 'orange', label: 'Orange' },
        { value: 'red', label: 'Red' },
        { value: 'rose', label: 'Rose' },
    ],
    chartPalettes: [
        { value: 'default', label: 'Default' },
        { value: 'ocean', label: 'Ocean' },
        { value: 'spectrum', label: 'Spectrum' },
        { value: 'warm', label: 'Warm' },
    ],
    radii: [
        { value: 'sharp', label: 'Sharp' },
        { value: 'compact', label: 'Compact' },
        { value: 'default', label: 'Default' },
        { value: 'rounded', label: 'Rounded' },
        { value: 'pill', label: 'Pill' },
    ],
    spacings: [
        { value: 'dense', label: 'Dense' },
        { value: 'default', label: 'Default' },
        { value: 'comfortable', label: 'Comfortable' },
        { value: 'airy', label: 'Airy' },
    ],
    densities: [
        { value: 'compact', label: 'Compact' },
        { value: 'default', label: 'Default' },
        { value: 'spacious', label: 'Spacious' },
    ],
    brands: [
        { value: 'monority', label: 'Monority' },
        { value: 'studio', label: 'Studio' },
    ],
}

const accentColors: Record<AccentPreset, { hue: number; chroma: number }> = {
    /* Chroma 0 is what makes the accent read as pure gray. Hue alone would not do
     it: oklch(L 0.12 0) is a saturated red, not a neutral. */
    neutral: { hue: 0, chroma: 0 },
    cyan: { hue: 200, chroma: 0.12 },
    blue: { hue: 245, chroma: 0.13 },
    violet: { hue: 295, chroma: 0.14 },
    indigo: { hue: 275, chroma: 0.14 },
    green: { hue: 150, chroma: 0.12 },
    amber: { hue: 75, chroma: 0.14 },
    orange: { hue: 45, chroma: 0.15 },
    red: { hue: 25, chroma: 0.15 },
    rose: { hue: 350, chroma: 0.13 },
}

interface ComponentRole {
    fill: string
    label: string
    hover: string
    active: string
    border: string
}

const chartColors: Record<ChartPalettePreset, [number, number, number, number, number]> = {
    default: [200, 150, 75, 25, 255],
    ocean: [200, 230, 195, 160, 320],
    spectrum: [25, 75, 150, 200, 275],
    warm: [25, 45, 75, 15, 350],
}

const radiusValues: Record<RadiusPreset, [string, string, string, string]> = {
    sharp: ['0px', '2px', '4px', '6px'],
    compact: ['2px', '4px', '6px', '8px'],
    default: ['4px', '6px', '10px', '12px'],
    rounded: ['6px', '10px', '16px', '20px'],
    pill: ['10px', '16px', '9999px', '9999px'],
}

const spacingFactors: Record<SpacingPreset, number> = {
    dense: 0.75,
    default: 1,
    comfortable: 1.125,
    airy: 1.25,
}
const spacingBase = {
    '0-5': 2,
    '1': 4,
    '1-5': 6,
    '2': 8,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '8': 32,
    '10': 40,
    '12': 48,
    '16': 64,
    '20': 80,
    '24': 96,
}

export interface ResolvedDesignConfig {
    style: CSSProperties
    themeDensity: 'comfortable' | 'compact'
    accent: { hue: number; chroma: number }
    chartColors: string[]
}

export function resolveDesignConfig(config: DesignConfig): ResolvedDesignConfig {
    /* Every axis is indexed by a value coming from outside (localStorage, JSON payload,
     hand-written config). An unknown value must degrade to the default axis, never throw. */
    const fallback = DEFAULT_DESIGN_CONFIG
    const accent = accentColors[config.accent] ?? accentColors[fallback.accent]

    const radius = radiusValues[config.radius] ?? radiusValues[fallback.radius]
    const factor = spacingFactors[config.spacing] ?? spacingFactors[fallback.spacing]

    const spacing: Record<string, string> = {}
    Object.entries(spacingBase).forEach(([key, value]) => {
        const pxVal = `${Number((value * factor).toFixed(2))}px`
        spacing[`--mr-spacing-${key}`] = pxVal
        spacing[`--mr-space-${key}`] = pxVal
    })

    const charts = (chartColors[config.chartPalette] ?? chartColors[fallback.chartPalette]).map(
        (hue) => `oklch(0.72 0.12 ${hue})`
    )
    const densityGap =
        config.density === 'spacious' ? '20px' : config.density === 'compact' ? '10px' : '16px'
    const densityScale =
        config.density === 'compact' ? 0.88 : config.density === 'spacious' ? 1.15 : 1

    const isDark =
        config.theme === 'dark' ||
        config.theme === 'oled' ||
        config.theme === 'night' ||
        config.theme === 'slate' ||
        config.theme === 'ocean'
    const isOled = config.theme === 'oled'
    const isHighContrast = config.theme === 'high-contrast'
    const isTinted =
        config.theme === 'slate' || config.theme === 'ocean' || config.theme === 'night'

    let accentLightness: number
    if (accent.chroma === 0) {
        accentLightness = isDark ? 0.955 : isHighContrast ? 0.38 : 0.22
    } else if (isTinted) {
        accentLightness = 0.635
    } else if (isHighContrast) {
        accentLightness = 0.38
    } else if (isDark) {
        accentLightness = 0.65
    } else {
        accentLightness = 0.5
    }

    const effectiveChroma = Number((accent.chroma * 0.7).toFixed(4))
    const accentSolid = `oklch(${accentLightness} ${effectiveChroma} ${accent.hue})`

    /* Primary interactive control colors derived from accent:
     * Neutral accent (chroma === 0):
     * - Light: black background oklch(0.22 0 0), white text oklch(0.985 0 0)
     * - Dark: white background oklch(0.955 0 0), dark canvas text oklch(0.17 0 0)
     * - OLED: white background oklch(0.955 0 0), pure black text oklch(0 0 0)
     * - High-contrast: strict binary contrast
     * Chromatic accent (chroma > 0):
     * - Fill: accentSolid
     * - Text: pure white oklch(0.985 0 0) for WCAG AA contrast across light and dark
     */
    let controlAccent: string
    let controlOnAccent: string
    let controlHover: string
    let controlActive: string

    if (accent.chroma === 0) {
        if (isDark) {
            controlAccent = 'oklch(0.955 0 0)'
            controlOnAccent = isOled ? 'oklch(0 0 0)' : 'var(--mr-bg-canvas)'
            controlHover = 'oklch(0.88 0 0)'
            controlActive = 'oklch(0.98 0 0)'
        } else if (isHighContrast) {
            controlAccent = 'oklch(0 0 0)'
            controlOnAccent = 'oklch(1 0 0)'
            controlHover = 'oklch(0.2 0 0)'
            controlActive = 'oklch(0 0 0)'
        } else {
            controlAccent = 'oklch(0.22 0 0)'
            controlOnAccent = 'oklch(0.985 0 0)'
            controlHover = 'oklch(0.32 0 0)'
            controlActive = 'oklch(0.15 0 0)'
        }
    } else {
        controlAccent = accentSolid
        controlOnAccent = 'oklch(0.985 0 0)'
        if (isDark) {
            controlHover = 'color-mix(in oklch, var(--mr-control-accent), white 12%)'
            controlActive = 'color-mix(in oklch, var(--mr-control-accent), white 24%)'
        } else {
            controlHover = 'color-mix(in oklch, var(--mr-control-accent), black 12%)'
            controlActive = 'color-mix(in oklch, var(--mr-control-accent), black 24%)'
        }
    }

    return {
        themeDensity: config.density === 'compact' ? 'compact' : 'comfortable',
        accent,
        chartColors: charts,
        style: {
            '--mr-brand-hue': String(accent.hue),
            '--mr-brand-chroma': String(accent.chroma),
            '--mr-ref-brand-hue': String(accent.hue),
            '--mr-ref-brand-chroma': String(accent.chroma),
            '--mr-ref-accent-lightness': String(accentLightness),
            '--mr-accent-solid': accentSolid,
            '--mr-accent-subtle': `color-mix(in oklch, ${accentSolid} 14%, var(--mr-bg-canvas))`,
            '--mr-accent-border': `color-mix(in oklch, ${accentSolid} 30%, var(--mr-border-default))`,
            '--mr-accent-text': accentSolid,
            '--mr-focus-ring': accentSolid,
            '--mr-accent': 'var(--mr-accent-solid)',
            '--mr-control-accent': controlAccent,
            '--mr-control-accent-hover': controlHover,
            '--mr-control-accent-active': controlActive,
            '--mr-control-on-accent': controlOnAccent,
            '--mr-control-accent-border': 'transparent',
            '--mr-control-accent-subtle': `color-mix(in oklch, ${accentSolid} 14%, var(--mr-bg-canvas))`,
            '--mr-chart-1': charts[0],
            '--mr-chart-2': charts[1],
            '--mr-chart-3': charts[2],
            '--mr-chart-4': charts[3],
            '--mr-chart-5': charts[4],
            '--mr-radius-inline': radius[0],
            '--mr-radius-control': radius[1],
            '--mr-radius-card': radius[2],
            '--mr-radius-overlay': radius[3],
            '--mr-radius-sm': radius[0],
            '--mr-radius-md': radius[1],
            '--mr-radius-lg': radius[2],
            '--mr-radius-full': config.radius === 'sharp' ? '0px' : '9999px',
            '--mr-ref-radius-scale':
                config.radius === 'sharp'
                    ? '0'
                    : config.radius === 'compact'
                      ? '0.67'
                      : config.radius === 'rounded'
                        ? '1.6'
                        : config.radius === 'pill'
                          ? '2'
                          : '1',
            '--mr-size-control-sm': `${Math.round(28 * densityScale)}px`,
            '--mr-size-control-md': `${Math.round(32 * densityScale)}px`,
            '--mr-size-control-lg': `${Math.round(40 * densityScale)}px`,
            '--mr-section-gap': densityGap,
            '--mr-grid-gap': densityGap,
            '--mr-stack-gap': densityGap,
            ...spacing,
        } as CSSProperties,
    }
}

/* ------------------------------------------------------------------ */
/*  App accent                                                          */
/* ------------------------------------------------------------------ */

const isAccentPreset = (value: unknown): value is AccentPreset =>
    typeof value === 'string' && Object.hasOwn(accentColors, value)

/** Resolves any stored/unknown value to a usable accent. Unknown falls back to
 *  the neutral default rather than leaving the app uncolored or throwing. */
export function resolveAccentPreset(value: unknown): { hue: number; chroma: number } {
    return isAccentPreset(value) ? accentColors[value] : accentColors.neutral
}

/** `"<preset> <hue> <chroma>"` — the app accent storage format. The numbers travel
 *  with the name so the head script never has to carry its own hue table. */
export function formatAccentStorage(preset: AccentPreset): string {
    const { hue, chroma } = accentColors[preset]
    return `${preset} ${hue} ${chroma}`
}

export function designConfigToJSON(config: DesignConfig): string {
    return JSON.stringify(config, null, 2)
}

/* ------------------------------------------------------------------ */
/*  Storage boundary                                                    */
/* ------------------------------------------------------------------ */

const themeValues: ResolvedThemeName[] = DESIGN_PRESETS.themes.map(
    (item) => item.value
) as ResolvedThemeName[]

const axisValues = {
    theme: themeValues,
    brand: DESIGN_PRESETS.brands.map((item) => item.value),
    accent: DESIGN_PRESETS.accents.map((item) => item.value),
    chartPalette: DESIGN_PRESETS.chartPalettes.map((item) => item.value),
    radius: DESIGN_PRESETS.radii.map((item) => item.value),
    spacing: DESIGN_PRESETS.spacings.map((item) => item.value),
    density: DESIGN_PRESETS.densities.map((item) => item.value),
} as const satisfies Record<keyof DesignConfig, readonly string[]>

/**
 * Coerce anything (localStorage, JSON payloads, hand-written configs) into a valid
 * `DesignConfig`: every axis is checked against its preset list and unknown values
 * fall back to the default instead of propagating into `resolveDesignConfig`.
 */
export function sanitizeDesignConfig(input: unknown): DesignConfig {
    const source = (typeof input === 'object' && input !== null ? input : {}) as Partial<
        Record<keyof DesignConfig, unknown>
    >
    const config = { ...DEFAULT_DESIGN_CONFIG } as DesignConfig

    for (const axis of Object.keys(axisValues) as (keyof DesignConfig)[]) {
        const value = source[axis]
        if (typeof value === 'string' && (axisValues[axis] as readonly string[]).includes(value)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- checked against the axis allow-list above
            ;(config as any)[axis] = value
        }
    }

    return config
}
