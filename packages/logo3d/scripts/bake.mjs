#!/usr/bin/env node
import { createHash } from 'node:crypto'
/**
 * Cuit la géométrie du logo depuis `assets/logo3.svg`.
 *
 * Le tracé n'utilise que M, L et C : un parseur dédié suffit, sans dépendance
 * et sans navigateur. Les coordonnées sont quantifiées en Int16 (précision
 * 1/32767, invisible à l'œil) : les données tiennent deux fois moins de place
 * que du Float32, et la sortie est déterministe (graine fixe).
 *
 * Usage : node scripts/bake.mjs [--fill 6000]
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const svgPath = join(root, 'assets/logo3.svg')
const outPath = join(root, 'src/data/logo.ts')
const shasPath = join(root, 'src/data/logo.sha256')

const fillArg = process.argv.indexOf('--fill')
const FILL = fillArg > -1 ? Number(process.argv[fillArg + 1]) : 6000
const SEED = 20261102

const mulberry32 = (seed) => {
    let a = seed
    return () => {
        a |= 0
        a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

const svg = readFileSync(svgPath, 'utf8')
const sourceSha = createHash('sha256').update(svg).digest('hex')
const d = (svg.match(/\sd="([^"]+)"/g) ?? []).map((m) => m.slice(3, -1)).join(' ')
const tokens = d.match(/[MLC]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi)
if (!tokens) throw new Error('tracé illisible dans assets/logo3.svg')

const subpaths = []
let current = null
let cmd = ''
let i = 0
const num = () => Number(tokens[i++])
const flush = () => {
    if (current && current.length) subpaths.push(current)
    current = null
}
while (i < tokens.length) {
    const token = tokens[i]
    if (/^[MLC]$/i.test(token)) {
        cmd = token.toUpperCase()
        i++
    }
    if (cmd === 'M') {
        flush()
        current = [{ x: num(), y: num() }]
        cmd = 'L'
    } else if (cmd === 'L') {
        current.push({ x: num(), y: num() })
    } else if (cmd === 'C') {
        const p0 = current[current.length - 1]
        const c1 = { x: num(), y: num() }
        const c2 = { x: num(), y: num() }
        const p1 = { x: num(), y: num() }
        const len =
            Math.hypot(c1.x - p0.x, c1.y - p0.y) +
            Math.hypot(c2.x - c1.x, c2.y - c1.y) +
            Math.hypot(p1.x - c2.x, p1.y - c2.y)
        const steps = Math.min(48, Math.max(4, Math.ceil(len / 9)))
        for (let s = 1; s <= steps; s++) {
            const u = s / steps
            const v = 1 - u
            current.push({
                x:
                    v * v * v * p0.x +
                    3 * v * v * u * c1.x +
                    3 * v * u * u * c2.x +
                    u * u * u * p1.x,
                y:
                    v * v * v * p0.y +
                    3 * v * v * u * c1.y +
                    3 * v * u * u * c2.y +
                    u * u * u * p1.y,
            })
        }
    } else break
}
flush()
if (!subpaths.length) throw new Error('aucun sous-tracé extrait')

const all = subpaths.flat()
const xs = all.map((p) => p.x)
const ys = all.map((p) => p.y)
const minX = Math.min(...xs)
const maxX = Math.max(...xs)
const minY = Math.min(...ys)
const maxY = Math.max(...ys)
const scale = 1 / Math.max(maxX - minX, maxY - minY)
const cx = (minX + maxX) / 2
const cy = (minY + maxY) / 2
const norm = (p) => [(p.x - cx) * scale, -(p.y - cy) * scale]
const rings = subpaths.map((ring) => ring.map(norm))

const outline = []
for (const ring of rings) {
    const step = Math.max(1, Math.floor(ring.length / 90))
    for (let k = 0; k < ring.length; k += step) outline.push(ring[k])
}

const inside = (x, y) => {
    let hit = false
    for (const ring of rings) {
        for (let a = 0, b = ring.length - 1; a < ring.length; b = a++) {
            const [ax, ay] = ring[a]
            const [bx, by] = ring[b]
            if (ay > y !== by > y && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) hit = !hit
        }
    }
    return hit
}

const rng = mulberry32(SEED)
const fill = []
let guard = 0
while (fill.length < FILL && guard++ < FILL * 40) {
    const x = rng() * 1.1 - 0.55
    const y = rng() * 1.1 - 0.55
    if (inside(x, y)) fill.push([x, y])
}

const coords = [...outline, ...fill]
const ints = new Int16Array(coords.length * 2)
let o = 0
for (const p of coords) {
    ints[o++] = Math.round(Math.max(-1, Math.min(1, p[0])) * 32767)
    ints[o++] = Math.round(Math.max(-1, Math.min(1, p[1])) * 32767)
}

const bytes = Buffer.from(ints.buffer)
const base64 = bytes.toString('base64')
const dataSha = createHash('sha256').update(bytes).digest('hex')

const lines = [
    '// Généré par scripts/bake.mjs — ne pas éditer à la main.',
    `// Source : assets/logo3.svg (sha256 ${sourceSha.slice(0, 16)})`,
    '// Coordonnées Int16 little-endian, divisées par 32767 à la lecture.',
    `export const OUTLINE_COUNT = ${outline.length}`,
    `export const FILL_COUNT = ${fill.length}`,
    `export const SOURCE_SHA256 = '${sourceSha}'`,
    `export const POINTS_BASE64: string = '${base64}'`,
    '',
]
writeFileSync(outPath, lines.join('\n'))
writeFileSync(shasPath, `${dataSha}\n`)

console.log(
    JSON.stringify({
        subpaths: subpaths.length,
        outline: outline.length,
        fill: fill.length,
        rawBytes: bytes.length,
        base64Bytes: base64.length,
        dataSha: dataSha.slice(0, 16),
    })
)
