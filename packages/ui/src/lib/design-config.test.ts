import { describe, expect, it } from 'vitest'
import {
    type AccentPreset,
    type DesignConfig,
    DEFAULT_DESIGN_CONFIG,
    DESIGN_PRESETS,
    formatAccentStorage,
    resolveAccentPreset,
    resolveDesignConfig,
    sanitizeDesignConfig,
} from './design-config'

describe('design configuration', () => {
    it('defaults to a neutral accent on a neutral dark theme', () => {
        expect(DEFAULT_DESIGN_CONFIG).toMatchObject({
            theme: 'dark',
            accent: 'neutral',
            chartPalette: 'default',
            radius: 'default',
            spacing: 'default',
            density: 'default',
        })
        expect(resolveDesignConfig(DEFAULT_DESIGN_CONFIG).accent).toEqual({ hue: 0, chroma: 0 })
        expect(DESIGN_PRESETS.accents).toHaveLength(10)
        expect(DESIGN_PRESETS.chartPalettes).toHaveLength(4)
    })

    it('composes theme and accent axes independently', () => {
        const darkCyan = resolveDesignConfig({
            ...DEFAULT_DESIGN_CONFIG,
            theme: 'dark',
            accent: 'cyan',
        })
        expect(darkCyan.accent).toEqual({ hue: 200, chroma: 0.12 })
        expect(darkCyan.style['--mr-brand-hue']).toBe('200')

        const oceanViolet = resolveDesignConfig({
            ...DEFAULT_DESIGN_CONFIG,
            theme: 'ocean',
            accent: 'violet',
        })
        expect(oceanViolet.accent).toEqual({ hue: 295, chroma: 0.14 })
        expect(oceanViolet.style['--mr-brand-hue']).toBe('295')
    })

    it('resolves primary control colors for neutral accent: black in light, white in dark and oled', () => {
        const lightNeutral = resolveDesignConfig({
            ...DEFAULT_DESIGN_CONFIG,
            theme: 'light',
            accent: 'neutral',
        })
        expect(lightNeutral.style['--mr-control-accent']).toBe('oklch(0.22 0 0)')
        expect(lightNeutral.style['--mr-control-on-accent']).toBe('oklch(0.985 0 0)')

        const darkNeutral = resolveDesignConfig({
            ...DEFAULT_DESIGN_CONFIG,
            theme: 'dark',
            accent: 'neutral',
        })
        expect(darkNeutral.style['--mr-control-accent']).toBe('oklch(0.955 0 0)')
        expect(darkNeutral.style['--mr-control-on-accent']).toBe('var(--mr-bg-canvas)')

        const oledNeutral = resolveDesignConfig({
            ...DEFAULT_DESIGN_CONFIG,
            theme: 'oled',
            accent: 'neutral',
        })
        expect(oledNeutral.style['--mr-control-accent']).toBe('oklch(0.955 0 0)')
        expect(oledNeutral.style['--mr-control-on-accent']).toBe('oklch(0 0 0)')
    })

    it('resolves primary control colors for chromatic accents with white text', () => {
        const darkViolet = resolveDesignConfig({
            ...DEFAULT_DESIGN_CONFIG,
            theme: 'dark',
            accent: 'violet',
        })
        expect(darkViolet.style['--mr-control-accent']).toContain('oklch(')
        expect(darkViolet.style['--mr-control-on-accent']).toBe('oklch(0.985 0 0)')

        const lightBlue = resolveDesignConfig({
            ...DEFAULT_DESIGN_CONFIG,
            theme: 'light',
            accent: 'blue',
        })
        expect(lightBlue.style['--mr-control-accent']).toContain('oklch(')
        expect(lightBlue.style['--mr-control-on-accent']).toBe('oklch(0.985 0 0)')
    })

    it('composes accent, radius, spacing and chart axes independently', () => {
        const resolved = resolveDesignConfig({
            theme: 'light',
            brand: 'monority',
            accent: 'violet',
            chartPalette: 'ocean',
            radius: 'rounded',
            spacing: 'dense',
            density: 'compact',
        })
        expect(resolved.themeDensity).toBe('compact')
        expect(resolved.accent).toEqual({ hue: 295, chroma: 0.14 })
        expect(resolved.chartColors).toHaveLength(5)
        expect(resolved.style['--mr-radius-control']).toBe('10px')
        expect(resolved.style['--mr-spacing-4']).toBe('12px')
        expect(resolved.style['--mr-chart-1']).toContain('200')
    })
})

describe('app accent', () => {
    it('resolves a known preset to its hue and chroma', () => {
        expect(resolveAccentPreset('cyan')).toEqual({ hue: 200, chroma: 0.12 })
        expect(resolveAccentPreset('neutral')).toEqual({ hue: 0, chroma: 0 })
    })

    it('falls back to the neutral accent for unknown or missing values', () => {
        for (const junk of [undefined, null, '', 'chartreuse', 42, {}]) {
            expect(resolveAccentPreset(junk)).toEqual({ hue: 0, chroma: 0 })
        }
    })

    it('is gray only when chroma is 0, whatever the hue', () => {
        expect(resolveAccentPreset('neutral').chroma).toBe(0)
        expect(resolveAccentPreset('red')).toEqual({ hue: 25, chroma: 0.15 })
    })

    it('formats storage as name + numbers so the head script needs no hue table', () => {
        expect(formatAccentStorage('cyan')).toBe('cyan 200 0.12')
        const [name, hue, chroma] = formatAccentStorage('rose').split(' ')
        expect(name).toBe('rose')
        expect(Number(hue)).toBe(350)
        expect(Number(chroma)).toBe(0.13)
    })
})

describe('resolveDesignConfig resilience', () => {
    it('falls back to the default axis for every unknown value', () => {
        const broken = {
            theme: 'neon',
            brand: 'unknown',
            accent: 'chartreuse',
            chartPalette: 'rainbow',
            radius: 'square',
            spacing: 'huge',
            density: 'tiny',
        } as unknown as DesignConfig

        expect(() => resolveDesignConfig(broken)).not.toThrow()
        const resolved = resolveDesignConfig(broken)
        const defaults = resolveDesignConfig(DEFAULT_DESIGN_CONFIG)
        expect(resolved.style['--mr-brand-hue']).toBe(defaults.style['--mr-brand-hue'])
        expect(resolved.style['--mr-chart-1']).toBe(defaults.style['--mr-chart-1'])
        expect(resolved.style['--mr-radius-control']).toBe(defaults.style['--mr-radius-control'])
        expect(resolved.style['--mr-spacing-4']).toBe(defaults.style['--mr-spacing-4'])
    })

    it('still honours the valid axes of a partially broken config', () => {
        const partial = {
            ...DEFAULT_DESIGN_CONFIG,
            accent: 'rose',
        } as unknown as DesignConfig
        const resolved = resolveDesignConfig(partial)
        expect(resolved.accent).toEqual({ hue: 350, chroma: 0.13 })
    })
})

describe('sanitizeDesignConfig', () => {
    it('keeps a fully valid config untouched', () => {
        const config = {
            ...DEFAULT_DESIGN_CONFIG,
            accent: 'rose' as AccentPreset,
            radius: 'pill' as const,
        }
        expect(sanitizeDesignConfig(config)).toEqual(config)
    })

    it('replaces every unknown axis value with its default', () => {
        const result = sanitizeDesignConfig({
            theme: 'neon',
            brand: 'unknown',
            accent: 'chartreuse',
            chartPalette: 'rainbow',
            radius: 'square',
            spacing: 'huge',
            density: 'tiny',
        })
        expect(result).toEqual(DEFAULT_DESIGN_CONFIG)
    })

    it('repairs a partially valid config axis by axis', () => {
        expect(sanitizeDesignConfig({ accent: 'violet', radius: 'nope' })).toEqual({
            ...DEFAULT_DESIGN_CONFIG,
            accent: 'violet',
        })
    })

    it('never throws on junk payloads and drops obsolete componentColor', () => {
        for (const junk of [
            null,
            undefined,
            42,
            'cyan',
            [],
            { componentColor: 'inverse' },
            { componentColor: { nested: true } },
        ]) {
            expect(sanitizeDesignConfig(junk)).toEqual(DEFAULT_DESIGN_CONFIG)
        }
    })
})
