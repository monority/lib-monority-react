export interface SrgbTuple {
    r: number
    g: number
    b: number
}

export interface MonolithThemeTokens {
    theme: string
    isLight: boolean
    isHighContrast: boolean
    reducedMotion: boolean
    bgCanvas: SrgbTuple
    bgSurface: SrgbTuple
    bgRaised: SrgbTuple
    borderDefault: SrgbTuple
    textPrimary: SrgbTuple
    accentSolid: SrgbTuple
}

let probeCanvasCtx: CanvasRenderingContext2D | null | undefined

function getCanvasProbe(): CanvasRenderingContext2D | null {
    if (probeCanvasCtx !== undefined) return probeCanvasCtx
    if (
        typeof document === 'undefined' ||
        (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent))
    ) {
        probeCanvasCtx = null
        return null
    }
    try {
        const canvas = document.createElement('canvas')
        canvas.width = 1
        canvas.height = 1
        probeCanvasCtx = canvas.getContext('2d', { willReadFrequently: true })
    } catch {
        probeCanvasCtx = null
    }
    return probeCanvasCtx
}

function clamp01(value: number): number {
    return Math.min(1, Math.max(0, value))
}

function linearToSrgbChannel(c: number): number {
    const v = clamp01(c)
    return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055
}

function parseColorFallback(cssColor: string, fallback: SrgbTuple): SrgbTuple {
    const trimmed = cssColor.trim()
    if (!trimmed) return fallback

    const rgbMatch = trimmed.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i)
    if (rgbMatch) {
        return {
            r: clamp01(Number(rgbMatch[1]) / 255),
            g: clamp01(Number(rgbMatch[2]) / 255),
            b: clamp01(Number(rgbMatch[3]) / 255),
        }
    }

    const oklchMatch = trimmed.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/i)
    if (oklchMatch) {
        const rawL = Number(oklchMatch[1])
        const L = trimmed.includes('%') ? rawL / 100 : rawL
        const C = Number(oklchMatch[2])
        const hRad = (Number(oklchMatch[3]) * Math.PI) / 180
        const a = C * Math.cos(hRad)
        const b = C * Math.sin(hRad)

        const l_ = L + 0.3963377774 * a + 0.2158037573 * b
        const m_ = L - 0.1055613458 * a - 0.0638541728 * b
        const s_ = L - 0.0894841775 * a - 1.291485548 * b

        const l = l_ * l_ * l_
        const m = m_ * m_ * m_
        const s = s_ * s_ * s_

        const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
        const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
        const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s

        return {
            r: linearToSrgbChannel(rLin),
            g: linearToSrgbChannel(gLin),
            b: linearToSrgbChannel(bLin),
        }
    }

    return fallback
}

function sampleCssVar(host: HTMLElement, tokenName: string, fallback: SrgbTuple): SrgbTuple {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return fallback
    }

    const probe = document.createElement('span')
    probe.style.position = 'absolute'
    probe.style.visibility = 'hidden'
    probe.style.pointerEvents = 'none'
    probe.style.color = `var(${tokenName})`
    host.appendChild(probe)
    const computedColor = window.getComputedStyle(probe).color
    probe.remove()

    const ctx = getCanvasProbe()
    if (ctx && computedColor) {
        try {
            ctx.clearRect(0, 0, 1, 1)
            ctx.fillStyle = '#000000'
            ctx.fillStyle = computedColor
            ctx.fillRect(0, 0, 1, 1)
            const pixel = ctx.getImageData(0, 0, 1, 1).data
            if (pixel[3] !== undefined && pixel[3] > 0) {
                return {
                    r: (pixel[0] ?? 0) / 255,
                    g: (pixel[1] ?? 0) / 255,
                    b: (pixel[2] ?? 0) / 255,
                }
            }
        } catch {
            /* Repli mathématique si le contexte 2D refuse la lecture */
        }
    }

    return parseColorFallback(computedColor, fallback)
}

function relativeLuminance(c: SrgbTuple): number {
    return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b
}

export function readMonolithTokens(host: HTMLElement): MonolithThemeTokens {
    const root = typeof document !== 'undefined' ? document.documentElement : null
    const theme = root?.getAttribute('data-theme') ?? 'dark'
    const motionAttr = root?.getAttribute('data-motion')

    let reducedMotion = false
    if (motionAttr === 'reduce') {
        reducedMotion = true
    } else if (motionAttr === 'always') {
        reducedMotion = false
    } else if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }

    const bgCanvas = sampleCssVar(host, '--mr-bg-canvas', { r: 0.09, g: 0.09, b: 0.1 })
    const bgSurface = sampleCssVar(host, '--mr-bg-surface', { r: 0.14, g: 0.14, b: 0.15 })
    const bgRaised = sampleCssVar(host, '--mr-bg-raised', { r: 0.18, g: 0.18, b: 0.2 })
    const borderDefault = sampleCssVar(host, '--mr-border-default', {
        r: 0.32,
        g: 0.32,
        b: 0.35,
    })
    const textPrimary = sampleCssVar(host, '--mr-text-primary', { r: 0.95, g: 0.95, b: 0.96 })
    const accentSolid = sampleCssVar(host, '--mr-accent-solid', { r: 0.95, g: 0.95, b: 0.96 })

    const isLight = relativeLuminance(bgCanvas) > 0.5
    const isHighContrast = theme === 'high-contrast'

    return {
        theme,
        isLight,
        isHighContrast,
        reducedMotion,
        bgCanvas,
        bgSurface,
        bgRaised,
        borderDefault,
        textPrimary,
        accentSolid,
    }
}
