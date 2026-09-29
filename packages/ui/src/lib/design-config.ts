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
/** Roles, not hues. Only `theme` follows the accent axis, so the two axes can
 *  never resolve to the same colour. */
export type ComponentColorPreset = 'theme' | 'neutral' | 'soft' | 'inverse'
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
    accent: 'neutral',
    componentColor: 'theme',
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
    componentColors: [
        { value: 'theme', label: 'Theme' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'soft', label: 'Soft' },
        { value: 'inverse', label: 'Inverse' },
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

/* No hue literals: a role is expressed with theme tokens only, so it keeps the
   same meaning in every theme and never collides with an accent preset. */
const componentRoles: Record<ComponentColorPreset, ComponentRole> = {
    theme: {
        fill: 'var(--mr-accent)',
        label: 'var(--mr-on-accent)',
        hover: 'var(--mr-accent-hover)',
        active: 'var(--mr-accent-active)',
        border: 'transparent',
    },
    neutral: {
        fill: 'var(--mr-text-primary)',
        label: 'var(--mr-bg-canvas)',
        hover: 'color-mix(in srgb, var(--mr-text-primary) 88%, var(--mr-bg-canvas))',
        active: 'color-mix(in srgb, var(--mr-text-primary) 76%, var(--mr-bg-canvas))',
        border: 'transparent',
    },
    soft: {
        fill: 'var(--mr-accent-subtle)',
        label: 'var(--mr-accent-text)',
        hover: 'color-mix(in srgb, var(--mr-accent) 22%, var(--mr-accent-subtle))',
        active: 'color-mix(in srgb, var(--mr-accent) 34%, var(--mr-accent-subtle))',
        border: 'var(--mr-accent-border)',
    },
    inverse: {
        fill: 'var(--mr-bg-canvas)',
        label: 'var(--mr-text-primary)',
        hover: 'color-mix(in srgb, var(--mr-text-primary) 10%, var(--mr-bg-canvas))',
        active: 'color-mix(in srgb, var(--mr-text-primary) 18%, var(--mr-bg-canvas))',
        border: 'var(--mr-border-strong)',
    },
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
    componentColor: string
    chartColors: string[]
}

export function resolveDesignConfig(config: DesignConfig): ResolvedDesignConfig {
    /* Every axis is indexed by a value coming from outside (localStorage, JSON payload,
     hand-written config). An unknown value must degrade to the default axis, never throw. */
    const fallback = DEFAULT_DESIGN_CONFIG
    const accent = accentColors[config.accent] ?? accentColors[fallback.accent]
    /* `theme` is the accent-linked role: an unknown role inherits the accent. */
    const role = componentRoles[config.componentColor] ?? componentRoles.theme
    const radius = radiusValues[config.radius] ?? radiusValues[fallback.radius]
    const factor = spacingFactors[config.spacing] ?? spacingFactors[fallback.spacing]
    const spacing = Object.fromEntries(
        Object.entries(spacingBase).map(([key, value]) => [
            `--mr-spacing-${key}`,
            `${Number((value * factor).toFixed(2))}px`,
        ])
    )
    const charts = (chartColors[config.chartPalette] ?? chartColors[fallback.chartPalette]).map(
        (hue) => `oklch(0.72 0.12 ${hue})`
    )
    const densityGap =
        config.density === 'spacious' ? '20px' : config.density === 'compact' ? '10px' : '16px'

    return {
        themeDensity: config.density === 'compact' ? 'compact' : 'comfortable',
        accent,
        componentColor: role.fill,
        chartColors: charts,
        style: {
            '--mr-brand-hue': String(accent.hue),
            '--mr-brand-chroma': String(accent.chroma),
            '--mr-control-accent': role.fill,
            '--mr-control-accent-hover': role.hover,
            '--mr-control-accent-active': role.active,
            '--mr-control-on-accent': role.label,
            '--mr-control-accent-border': role.border,
            '--mr-control-accent-subtle':
                'color-mix(in srgb, var(--mr-control-accent) 18%, transparent)',
            '--mr-chart-1': charts[0],
            '--mr-chart-2': charts[1],
            '--mr-chart-3': charts[2],
            '--mr-chart-4': charts[3],
            '--mr-chart-5': charts[4],
            '--mr-radius-inline': radius[0],
            '--mr-radius-control': radius[1],
            '--mr-radius-card': radius[2],
            '--mr-radius-overlay': radius[3],
            '--mr-section-gap': densityGap,
            '--mr-grid-gap': densityGap,
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
    componentColor: DESIGN_PRESETS.componentColors.map((item) => item.value),
    chartPalette: DESIGN_PRESETS.chartPalettes.map((item) => item.value),
    radius: DESIGN_PRESETS.radii.map((item) => item.value),
    spacing: DESIGN_PRESETS.spacings.map((item) => item.value),
    density: DESIGN_PRESETS.densities.map((item) => item.value),
} as const satisfies Record<keyof DesignConfig, readonly string[]>

/** `componentColor` was a hue picker before it became a role axis. The retired hues
 *  meant "colour the components", which is now what the `theme` role does. */
const retiredComponentColorValues = ['cyan', 'blue', 'violet']

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
            // Validated against the axis allow-list above; `Object.assign` writes the
            // dynamic key without widening the whole config to `any`.
            Object.assign(config, { [axis]: value })
        }
    }

    if (
        typeof source.componentColor === 'string' &&
        retiredComponentColorValues.includes(source.componentColor)
    ) {
        config.componentColor = DEFAULT_DESIGN_CONFIG.componentColor
    }

    return config
}
