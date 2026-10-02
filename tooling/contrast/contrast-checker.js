import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')

export function oklchToRgb(l, c, h) {
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

    const toSrgb = (x) => {
        const clamped = Math.max(0, Math.min(1, x))
        return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055
    }

    return [toSrgb(r), toSrgb(g), toSrgb(bl)]
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

export function checkThemePairs(themeName, pairs) {
    const errors = []
    const results = []

    for (const pair of pairs) {
        const rgb1 = oklchToRgb(...pair.color1)
        const rgb2 = oklchToRgb(...pair.color2)
        const ratio = getContrastRatio(rgb1, rgb2)
        const minThreshold = pair.threshold ?? 4.5
        const passed = ratio >= minThreshold

        results.push({
            name: pair.name,
            theme: themeName,
            ratio: ratio.toFixed(2),
            threshold: minThreshold,
            passed,
        })

        if (!passed) {
            errors.push(
                `Theme ${themeName}: ${pair.name} - Ratio ${ratio.toFixed(2)} < seuil ${minThreshold}`
            )
        }
    }

    return { errors, results }
}
