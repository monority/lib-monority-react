import { describe, expect, it } from 'vitest'
import {
    type AccentPreset,
    type ComponentColorPreset,
    type DesignConfig,
    DEFAULT_DESIGN_CONFIG,
    DESIGN_PRESETS,
    formatAccentStorage,
    resolveAccentPreset,
    resolveDesignConfig,
    sanitizeDesignConfig,
} from './design-config'

const accentValues = DESIGN_PRESETS.accents.map((item) => item.value) as AccentPreset[]
const roleValues = DESIGN_PRESETS.componentColors.map(
    (item) => item.value
) as ComponentColorPreset[]
const hueFreeRoles = roleValues.filter((value) => value !== 'theme')
/* `neutral` is a chroma-0 accent, not a hue: the axis-independence invariant is
   about hue duplication (the cyan/blue/violet overlap), not about the name. */
const chromaticAccents = accentValues.filter((value) => value !== 'neutral')

const resolve = (accent: AccentPreset, componentColor: ComponentColorPreset) =>
    resolveDesignConfig({ ...DEFAULT_DESIGN_CONFIG, accent, componentColor })

describe('design configuration', () => {
    it('defaults to a neutral accent on a neutral dark theme', () => {
        expect(DEFAULT_DESIGN_CONFIG).toMatchObject({
            theme: 'dark',
            accent: 'neutral',
            componentColor: 'theme',
        })
        expect(resolveDesignConfig(DEFAULT_DESIGN_CONFIG).accent).toEqual({ hue: 0, chroma: 0 })
        expect(DESIGN_PRESETS.accents).toHaveLength(10)
        expect(DESIGN_PRESETS.chartPalettes).toHaveLength(4)
    })

    it('composes accent, component, radius, spacing and chart axes independently', () => {
        const resolved = resolveDesignConfig({
            theme: 'light',
            brand: 'monority',
            accent: 'violet',
            componentColor: 'neutral',
            chartPalette: 'ocean',
            radius: 'rounded',
            spacing: 'dense',
            density: 'compact',
        })
        expect(resolved.themeDensity).toBe('compact')
        expect(resolved.accent).toEqual({ hue: 295, chroma: 0.14 })
        expect(resolved.componentColor).toBe('var(--mr-text-primary)')
        expect(resolved.chartColors).toHaveLength(5)
        expect(resolved.style['--mr-radius-control']).toBe('10px')
        expect(resolved.style['--mr-spacing-4']).toBe('12px')
        expect(resolved.style['--mr-chart-1']).toContain('200')
    })

    it('never reuses an accent hue as a component color role', () => {
        const chromatic = new Set<string>(chromaticAccents)
        const overlapping = roleValues.filter((role) => role !== 'theme' && chromatic.has(role))
        expect(overlapping).toEqual([])
    })

    it('keeps every non-theme role free of hardcoded hue literals', () => {
        for (const role of hueFreeRoles) {
            for (const accent of accentValues) {
                const { style } = resolve(accent, role)
                expect(String(style['--mr-control-accent'])).not.toMatch(/oklch|oklab|#/)
                expect(String(style['--mr-control-on-accent'])).not.toMatch(/oklch|oklab|#/)
            }
        }
    })

    it('resolves a non-theme role to the same fill whatever the accent', () => {
        for (const role of hueFreeRoles) {
            const fills = new Set(
                accentValues.map((accent) =>
                    String(resolve(accent, role).style['--mr-control-accent'])
                )
            )
            expect(fills.size).toBe(1)
        }
    })

    it('gives every role its own fill and label pair', () => {
        const pairs = roleValues.map((role) => {
            const { style } = resolve('cyan', role)
            return `${String(style['--mr-control-accent'])}|${String(style['--mr-control-on-accent'])}`
        })
        expect(new Set(pairs).size).toBe(roleValues.length)
    })

    it('drives hover and active from the role, not from a hue mix', () => {
        for (const role of hueFreeRoles) {
            const { style } = resolve('green', role)
            expect(String(style['--mr-control-accent-hover'])).not.toMatch(/black/)
            expect(String(style['--mr-control-accent-active'])).not.toMatch(/black/)
        }
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
        /* Guards the trap that made a "neutral" hue come out red. */
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
    it('falls back to the theme role for an unknown component color', () => {
        const legacy = {
            ...DEFAULT_DESIGN_CONFIG,
            componentColor: 'cyan',
        } as unknown as DesignConfig
        expect(() => resolveDesignConfig(legacy)).not.toThrow()
        expect(resolveDesignConfig(legacy).componentColor).toBe('var(--mr-accent)')
    })

    it('falls back to the default axis for every unknown value', () => {
        const broken = {
            theme: 'neon',
            brand: 'unknown',
            accent: 'chartreuse',
            componentColor: 'cyan',
            chartPalette: 'rainbow',
            radius: 'square',
            spacing: 'huge',
            density: 'tiny',
        } as unknown as DesignConfig

        expect(() => resolveDesignConfig(broken)).not.toThrow()
        const resolved = resolveDesignConfig(broken)
        const defaults = resolveDesignConfig(DEFAULT_DESIGN_CONFIG)
        expect(resolved.style['--mr-ref-brand-hue']).toBe(defaults.style['--mr-ref-brand-hue'])
        expect(resolved.style['--mr-chart-1']).toBe(defaults.style['--mr-chart-1'])
        expect(resolved.style['--mr-radius-control']).toBe(defaults.style['--mr-radius-control'])
        expect(resolved.style['--mr-spacing-4']).toBe(defaults.style['--mr-spacing-4'])
    })

    it('still honours the valid axes of a partially broken config', () => {
        const partial = {
            ...DEFAULT_DESIGN_CONFIG,
            accent: 'rose',
            componentColor: 'nope',
        } as unknown as DesignConfig
        const resolved = resolveDesignConfig(partial)
        expect(resolved.accent).toEqual({ hue: 350, chroma: 0.13 })
        expect(resolved.componentColor).toBe('var(--mr-accent)')
    })
})

describe('sanitizeDesignConfig', () => {
    it('keeps a fully valid config untouched', () => {
        const config = {
            ...DEFAULT_DESIGN_CONFIG,
            accent: 'rose',
            componentColor: 'soft',
            radius: 'pill',
        } as const
        expect(sanitizeDesignConfig(config)).toEqual(config)
    })

    it('migrates the retired component color hues', () => {
        for (const retired of ['cyan', 'blue', 'violet']) {
            const result = sanitizeDesignConfig({
                ...DEFAULT_DESIGN_CONFIG,
                componentColor: retired,
            })
            expect(result.componentColor).toBe('theme')
        }
    })

    it('replaces every unknown axis value with its default', () => {
        const result = sanitizeDesignConfig({
            theme: 'neon',
            brand: 'unknown',
            accent: 'chartreuse',
            componentColor: 'cyan',
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

    it('never throws on junk payloads', () => {
        for (const junk of [
            null,
            undefined,
            42,
            'cyan',
            [],
            { componentColor: { nested: true } },
        ]) {
            expect(sanitizeDesignConfig(junk)).toEqual(DEFAULT_DESIGN_CONFIG)
        }
    })
})
