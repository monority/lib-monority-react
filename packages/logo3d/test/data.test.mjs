import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const sha = (buffer) => createHash('sha256').update(buffer).digest('hex')

const moduleSource = read('../src/data/logo.ts')
const dataSha = read('../src/data/logo.sha256').trim()
const svg = readFileSync(new URL('../assets/logo3.svg', import.meta.url))

const grab = (name) => {
    const match = moduleSource.match(new RegExp(`export const ${name} = (\\d+)`))
    assert.ok(match, `${name} absent des données cuites`)
    return Number(match[1])
}
const base64 = moduleSource.match(/export const POINTS_BASE64: string = '([^']+)'/)?.[1]

const outline = grab('OUTLINE_COUNT')
const fill = grab('FILL_COUNT')

test('les compteurs sont cohérents et non vides', () => {
    assert.ok(outline > 0, 'contour vide')
    assert.ok(fill > 0, 'remplissage vide')
})

test('la base64 décode exactement la structure annoncée', () => {
    assert.ok(base64, 'POINTS_BASE64 absent')
    const bytes = Buffer.from(base64, 'base64')
    assert.equal(bytes.length, 2 * 2 * (outline + fill), 'taille incohérente')
})

test('les données n’ont pas été éditées à la main', () => {
    assert.ok(base64)
    assert.equal(
        sha(Buffer.from(base64, 'base64')),
        dataSha,
        'empreinte divergente : relancer `pnpm bake`'
    )
})

test('la source SVG est celle qui a été cuite', () => {
    const declared = moduleSource.match(/export const SOURCE_SHA256 = '([a-f0-9]+)'/)?.[1]
    assert.ok(declared, 'SOURCE_SHA256 absent')
    assert.equal(sha(svg), declared, 'logo3.svg a changé : relancer `pnpm bake`')
})

test('les points restent dans la boîte unitaire', () => {
    assert.ok(base64)
    const bytes = new Uint8Array(Buffer.from(base64, 'base64'))
    const values = new Int16Array(bytes.buffer)
    for (let i = 0; i < values.length; i++) {
        const value = (values[i] ?? 0) / 32767
        assert.ok(Number.isFinite(value), `valeur non finie à l’index ${i}`)
        assert.ok(value >= -0.6 && value <= 0.6, `point hors boîte à l’index ${i} : ${value}`)
    }
})
