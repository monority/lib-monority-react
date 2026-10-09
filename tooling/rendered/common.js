import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
    clipRgb,
    getContrastRatio,
    inGamutRgb,
    marginRgb,
    oklabToRgbRaw,
    oklchToRgbRaw,
    parseCssVariables,
    parseOklch,
    reduceChroma,
} from '../contrast/contrast-checker.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(__dirname, '../..')
const webRequire = createRequire(path.join(ROOT, 'apps/web/package.json'))
export const { chromium } = webRequire('@playwright/test')

export {
    clipRgb,
    getContrastRatio,
    inGamutRgb,
    marginRgb,
    oklabToRgbRaw,
    oklchToRgbRaw,
    parseCssVariables,
    parseOklch,
    reduceChroma,
}

// Helper pour convertir une couleur (oklch, oklab, rgb, srgb, color(), transparent) retournee par le navigateur en RGB float 0..1
export function colorToRgb(str) {
    if (!str || typeof str !== 'string') {
        throw new Error(`Format de couleur non reconnu : ${str}`)
    }
    const s = str.trim()
    if (s.toLowerCase() === 'transparent') {
        return [0, 0, 0]
    }
    const oklch = parseOklch(s)
    if (oklch) {
        return clipRgb(oklchToRgbRaw(oklch[0], oklch[1], oklch[2]))
    }
    const oklabMatch = s.match(
        /oklab\(\s*([\d.]+)\s+([-\d.]+)\s+([-\d.]+)(?:\s*\/\s*[\d.]+%?)?\s*\)/i
    )
    if (oklabMatch) {
        return clipRgb(
            oklabToRgbRaw(
                parseFloat(oklabMatch[1]),
                parseFloat(oklabMatch[2]),
                parseFloat(oklabMatch[3])
            )
        )
    }
    const colorSrgbMatch = s.match(
        /color\(\s*srgb\s+([-\d.%]+)\s+([-\d.%]+)\s+([-\d.%]+)(?:\s*\/\s*[-\d.%]+)?\s*\)/i
    )
    if (colorSrgbMatch) {
        const parseChannel = (v) => (v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v))
        return clipRgb([
            parseChannel(colorSrgbMatch[1]),
            parseChannel(colorSrgbMatch[2]),
            parseChannel(colorSrgbMatch[3]),
        ])
    }
    const rgbCommaMatch = s.match(
        /rgba?\(\s*([\d.%]+)\s*,\s*([\d.%]+)\s*,\s*([\d.%]+)(?:\s*,\s*[\d.%]+)?\s*\)/i
    )
    if (rgbCommaMatch) {
        const parseChannel = (v) => (v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v) / 255)
        return clipRgb([
            parseChannel(rgbCommaMatch[1]),
            parseChannel(rgbCommaMatch[2]),
            parseChannel(rgbCommaMatch[3]),
        ])
    }
    const rgbSpaceMatch = s.match(
        /rgba?\(\s*([\d.%]+)\s+([\d.%]+)\s+([\d.%]+)(?:\s*\/\s*[\d.%]+)?\s*\)/i
    )
    if (rgbSpaceMatch) {
        const parseChannel = (v) => (v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v) / 255)
        return clipRgb([
            parseChannel(rgbSpaceMatch[1]),
            parseChannel(rgbSpaceMatch[2]),
            parseChannel(rgbSpaceMatch[3]),
        ])
    }

    throw new Error(`Format de couleur non reconnu : ${str}`)
}

// Helper pour attendre la fin complete de toutes les animations et transitions CSS en cours
export async function waitForAnimations(page) {
    await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)))
}
