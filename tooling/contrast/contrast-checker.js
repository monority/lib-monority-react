// Conversions colorimetriques OKLCH -> sRGB et calculs de contraste WCAG 2.2 AA

export function oklchToRgbRaw(l, c, h) {
    const hRad = (h * Math.PI) / 180
    const a = c * Math.cos(hRad)
    const b = c * Math.sin(hRad)

    const l_ = l + 0.3963377774 * a + 0.2158037573 * b
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b
    const s_ = l - 0.0894841775 * a - 1.291485548 * b

    const L = l_ ** 3
    const M = m_ ** 3
    const S = s_ ** 3

    const r = +4.0767434036 * L - 3.3077115913 * M + 0.2309699292 * S
    const g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S
    const bl = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S

    const toLinearSrgb = (x) => {
        return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(Math.max(0, x), 1 / 2.4) - 0.055
    }

    return [toLinearSrgb(r), toLinearSrgb(g), toLinearSrgb(bl)]
}

export function oklabToRgbRaw(l, a, b) {
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b
    const s_ = l - 0.0894841775 * a - 1.291485548 * b

    const L = l_ ** 3
    const M = m_ ** 3
    const S = s_ ** 3

    const r = +4.0767434036 * L - 3.3077115913 * M + 0.2309699292 * S
    const g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S
    const bl = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S

    const toLinearSrgb = (x) => {
        return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(Math.max(0, x), 1 / 2.4) - 0.055
    }

    return [toLinearSrgb(r), toLinearSrgb(g), toLinearSrgb(bl)]
}

export function inGamutRgb(rgb) {
    return rgb.every((v) => v >= 0 && v <= 1)
}

export function marginRgb(rgb) {
    return Math.min(...rgb.map((v) => Math.min(v, 1 - v)))
}

export function clipRgb(rgb) {
    return rgb.map((v) => Math.max(0, Math.min(1, v)))
}

// Reduction de chroma CSS Color 4 (bisection sur C a L et H constants)
export function reduceChroma(l, c, h) {
    let low = 0
    let high = c
    let best = oklchToRgbRaw(l, 0, h)
    for (let i = 0; i < 24; i++) {
        const mid = (low + high) / 2
        const rgb = oklchToRgbRaw(l, mid, h)
        if (inGamutRgb(rgb)) {
            best = rgb
            low = mid
        } else {
            high = mid
        }
    }
    return clipRgb(best)
}

export function oklchToRgb(l, c, h) {
    const raw = oklchToRgbRaw(l, c, h)
    return inGamutRgb(raw) ? raw : clipRgb(raw)
}

export function getLuminance([r, g, b]) {
    const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

export function getContrastRatio(rgb1, rgb2) {
    const lum1 = getLuminance(rgb1)
    const lum2 = getLuminance(rgb2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)
}

// Extrait les definitions de variables d'un fichier CSS
export function parseCssVariables(cssContent) {
    const vars = {}
    const regex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g
    let match
    while ((match = regex.exec(cssContent)) !== null) {
        vars[`--${match[1]}`] = match[2].trim()
    }
    return vars
}

export function parseOklch(str, contextVars = {}) {
    if (!str) return null
    let resolved = str
    let prev
    do {
        prev = resolved
        resolved = resolved.replace(/var\((--[a-zA-Z0-9-]+)\)/g, (_, varName) => {
            return contextVars[varName] !== undefined ? contextVars[varName] : varName
        })
    } while (resolved !== prev)

    resolved = resolved.replace(/calc\(([^)]+)\)/g, (_, expr) => {
        try {
            if (/^[\d.\s+\-*/]+$/.test(expr)) {
                return Function(`'use strict'; return (${expr})`)()
            }
        } catch {
            // ignorer
        }
        return expr
    })

    const match = resolved.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i)
    if (!match) return null
    return [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3])]
}
