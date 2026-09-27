#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const stylesRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const deprecatedFile = path.join(stylesRoot, 'src/tokens/generated/deprecated.css')
const defaultDeprecated = new Set(
    [...fs.readFileSync(deprecatedFile, 'utf8').matchAll(/(--mr-[\w-]+)\s*:/g)].map(
        (match) => match[1]
    )
)

const overlayFiles = new Set([
    'alert-dialog.recipe.css',
    'command-palette.recipe.css',
    'context-menu.recipe.css',
    'drawer.recipe.css',
    'dropdown-menu.recipe.css',
    'hover-card.recipe.css',
    'modal.recipe.css',
    'popover.recipe.css',
    'tooltip.recipe.css',
])

function interactiveSource(source) {
    return /:hover|:focus-visible|\[disabled\]|:active|<button|button\b/i.test(source)
}

export function checkRecipeSource(source, options = {}) {
    const violations = []
    const lines = source.split(/\r?\n/)
    let hoverMediaDepth = 0
    let depth = 0
    let disabledSelector = false
    let mediaStack = []

    const add = (line, rule, message) => violations.push({ line, rule, message })

    lines.forEach((text, index) => {
        const line = index + 1
        const trimmed = text.trim()
        const isHover = trimmed.includes(':hover')
        const opensHoverMedia = /@media[^\n]*hover:\s*hover[^\n]*pointer:\s*fine/.test(trimmed)
        if (isHover && hoverMediaDepth === 0 && !opensHoverMedia)
            add(line, 'D7-hover', ':hover hors média hover/pointer fin')
        if (/--[\w-]+/.test(text) && /\.([a-z][\w-]*)--[\w-]+/.test(text)) {
            add(line, 'D7', `classe modificatrice BEM: ${text.trim()}`)
        }

        for (const match of text.matchAll(/var\((--mr-[\w-]+)/g)) {
            if (options.deprecatedTokens?.has(match[1]) || defaultDeprecated.has(match[1])) {
                add(line, 'deprecated-token', `alias déprécié ${match[1]}`)
            }
        }

        for (const declaration of text.matchAll(/([\w-]+)\s*:\s*([^;{}]+)/g)) {
            const [, property, value] = declaration
            if (/#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla|oklch|oklab)\(/i.test(value)) {
                add(line, 'T2', `couleur en dur: ${property}`)
            }
            for (const size of value.matchAll(/(-?\d*\.?\d+)(px|rem|em)\b/g)) {
                const amount = Number(size[1])
                if (amount > 2 || amount < 0) add(line, 'T2', `dimension en dur: ${size[0]}`)
            }
            if (/\b\d*\.?\d+ms\b|\b\d*\.?\d+s\b/.test(value) && !/var\(--mr-duration/.test(value)) {
                add(line, 'D2', `durée en dur: ${value.trim()}`)
            }
            if (property === 'font-weight' && /^\d+$/.test(value.trim()))
                add(line, 'D2', 'graisse en dur')
            if (property === 'z-index' && /^\d+$/.test(value.trim()))
                add(line, 'T2', 'z-index en dur')
            if (property === 'box-shadow' && !options.overlay)
                add(line, 'D3', 'box-shadow hors overlay')
            if (property === 'transition' && /\ball\b/i.test(value))
                add(line, 'D5', 'transition: all')
            if (
                property === 'animation' &&
                /width|height|top|right|bottom|left|inset|margin|padding/i.test(value)
            ) {
                add(line, 'D5', 'animation de dimension ou position')
            }
            if (property === 'opacity' && disabledSelector)
                add(line, 'D5', 'opacity sur état désactivé')
        }

        const media = trimmed.match(/^@media\s+(.+)$/)
        if (media) {
            mediaStack.push(media[1])
            if (media[1].includes('hover: hover') && media[1].includes('pointer: fine'))
                hoverMediaDepth++
        }
        if (trimmed.includes('{')) {
            depth++
            if (trimmed.includes(':disabled') || trimmed.includes('[disabled'))
                disabledSelector = true
        }
        if (trimmed.startsWith('}')) {
            depth--
            disabledSelector = false
            if (depth < mediaStack.length) {
                const closed = mediaStack.pop()
                if (closed?.includes('hover: hover') && closed.includes('pointer: fine'))
                    hoverMediaDepth--
            }
        }
    })

    const interactive = options.interactive ?? interactiveSource(source)
    if (interactive && !source.includes('@media (forced-colors: active)')) {
        violations.push({ line: 1, rule: 'forced-colors', message: 'bloc forced-colors absent' })
    }
    return violations
}

function checkFile(file, options = {}) {
    const absolute = path.resolve(file)
    const source = fs.readFileSync(absolute, 'utf8')
    return checkRecipeSource(source, {
        ...options,
        interactive: options.interactive ?? interactiveSource(source),
        overlay: options.overlay ?? overlayFiles.has(path.basename(absolute)),
    }).map((violation) => ({ file: absolute, ...violation }))
}

function runCli() {
    const files = process.argv.slice(2)
    if (!files.length) {
        console.error('Usage: node packages/styles/scripts/check-recipe.mjs <fichiers...>')
        process.exit(2)
    }
    const violations = files.flatMap((file) => checkFile(file))
    if (!violations.length) {
        console.log(`check-recipe PASS — ${files.length} fichier(s), 0 violation`)
        return
    }
    for (const violation of violations) {
        console.error(
            `${violation.file}:${violation.line} [${violation.rule}] ${violation.message}`
        )
    }
    console.error(`check-recipe FAIL — ${violations.length} violation(s)`)
    process.exit(1)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) runCli()
