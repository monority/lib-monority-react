/**
 * Test de la regex de nommage et de sa synchronisation (ROADMAP §5.2, D14).
 *
 * Trois sources doivent dire la même chose :
 *   1. `packages/tokens/categories.json`     — la liste fermée
 *   2. la regex dérivée                       — `TOKEN_NAME_PATTERN`
 *   3. `docs/design/tokens-convention.md` §4 — la prose
 *
 * Si l'une bouge sans les deux autres, ce test échoue. C'est le garde-fou qui
 * empêche la dérive que la regex initiale du ROADMAP avait déjà subir.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
    FORBIDDEN_PREFIXES,
    GLOBAL_CATEGORY_NAMES,
    PRIMITIVE_NAMES,
    TOKEN_NAME_PATTERN,
    categories,
    isForbiddenAbbreviation,
    isValidTokenName,
} from './token-pattern.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const convention = fs.readFileSync(path.join(repoRoot, 'docs/design/tokens-convention.md'), 'utf8')

test('la liste fermée couvre les familles de ROADMAP §4.2', () => {
    for (const family of ['bg', 'text', 'border', 'accent', 'tonal', 'status', 'scrim', 'chart']) {
        assert.ok(GLOBAL_CATEGORY_NAMES.includes(family), `famille couleur manquante : ${family}`)
    }
    for (const family of [
        'spacing',
        'radius',
        'border-width',
        'focus',
        'control-height',
        'icon-size',
    ]) {
        assert.ok(GLOBAL_CATEGORY_NAMES.includes(family), `famille dimension manquante : ${family}`)
    }
    for (const family of [
        'font-family',
        'font-size',
        'line-height',
        'font-weight',
        'letter-spacing',
    ]) {
        assert.ok(GLOBAL_CATEGORY_NAMES.includes(family), `famille typo manquante : ${family}`)
    }
    assert.ok(GLOBAL_CATEGORY_NAMES.includes('duration'), 'duration manquante')
    assert.ok(GLOBAL_CATEGORY_NAMES.includes('easing'), 'easing manquante')
    for (const family of ['shadow', 'z-index', 'opacity']) {
        assert.ok(GLOBAL_CATEGORY_NAMES.includes(family), `profondeur manquante : ${family}`)
    }
    assert.ok(
        GLOBAL_CATEGORY_NAMES.length >= 25,
        `liste trop courte : ${GLOBAL_CATEGORY_NAMES.length}`
    )
    assert.ok(
        GLOBAL_CATEGORY_NAMES.length <= 30,
        `liste trop longue : ${GLOBAL_CATEGORY_NAMES.length}`
    )
})

test('SYNCHRONISATION : tokens-convention.md §4 liste exactement les catégories du JSON', () => {
    const start = convention.indexOf('## 4. Vocabulaire')
    const end = convention.indexOf('## 5.')
    assert.ok(start >= 0 && end > start, 'section « 4. Vocabulaire » introuvable')
    const section = convention.slice(start, end)

    // On ne lit que les puces de la forme « - Famille : `a`, `b`. » pour ne pas
    // confondre une catégorie avec un rôle de primitif ou un terme de prose.
    const families = new Map()
    for (const line of section.split('\n')) {
        const bullet = /^- ([A-Za-zÀ-ÿ]+) : (.+?)\.$/.exec(line.trim())
        if (!bullet) continue
        families.set(
            bullet[1],
            [...bullet[2].matchAll(/`([a-z][a-z0-9-]*)`/g)].map((m) => m[1])
        )
    }
    assert.ok(families.size >= 6, `familles trouvées dans §4 : ${[...families.keys()].join(', ')}`)

    const listed = new Set([...families.values()].flat())

    // 1. Toute catégorie du JSON est listée dans §4.
    for (const name of GLOBAL_CATEGORY_NAMES) {
        assert.ok(
            listed.has(name),
            `catégorie du JSON absente de tokens-convention.md §4 : ${name}`
        )
    }
    // 2. §4 ne mentionne aucune catégorie inconnue du JSON.
    const orphans = [...listed].filter((n) => !GLOBAL_CATEGORY_NAMES.includes(n))
    assert.deepEqual(
        orphans,
        [],
        `tokens-convention.md §4 liste des catégories absentes du JSON : ${orphans.join(', ')}`
    )
    // 3. Aucune famille du JSON n'est orpheline en prose.
    const jsonFamilies = new Set(categories.categories.map((c) => c.family.toLowerCase()))
    for (const family of families.keys()) {
        assert.ok(
            jsonFamilies.has(family.toLowerCase()),
            `famille en prose absente du JSON : ${family}`
        )
    }
})

test('la regex dérive bien du JSON (pas de liste recopiée)', () => {
    for (const name of GLOBAL_CATEGORY_NAMES) {
        assert.ok(
            isValidTokenName(`--mr-${name}`),
            `catégorie seule doit être acceptée : --mr-${name}`
        )
        assert.ok(
            isValidTokenName(`--mr-${name}-sm`),
            `catégorie + variante doit être acceptée : --mr-${name}-sm`
        )
    }
    for (const name of PRIMITIVE_NAMES) {
        assert.ok(isValidTokenName(`--mr-ref-${name}`), `primitif refusé : --mr-ref-${name}`)
    }
})

test('les abréviations héritées restent REFUSÉES (D8)', () => {
    // Seuls les préfixes qui ne sont PAS des catégories sont structurellement
    // refusés. `--mr-opacity-50`, `--mr-radius-xs`, `--mr-text-2xl` sont
    // structurellement valides : `opacity`, `radius`, `text` sont des
    // catégories de la liste fermée. Ce qui est interdit, c'est l'échelle
    // numérique héritée — un point de méthode, pas un motif de regex, vérifié
    // par la revue de phase.
    const legacy = [
        '--mr-fs-14',
        '--mr-fs-32',
        '--mr-lh-12',
        '--mr-lh-16',
        '--mr-dur-150',
        '--mr-dur-600',
        '--mr-ease-standard',
        '--mr-ease-linear',
        '--mr-space-2',
        '--mr-space-80',
        '--mr-leading-base',
        '--mr-leading-tight',
        '--mr-color-neutral-100',
        '--mr-blur-md',
        '--mr-ease-spring',
    ]
    for (const name of legacy) {
        assert.equal(isValidTokenName(name), false, `abréviation héritée acceptée à tort : ${name}`)
    }
    // Structurellement valides mais hérités : `bg`, `radius`, `text` sont des
    // catégories. La régression est un point de méthode (D8), pas un motif.
    for (const name of ['--mr-bg-canvas-rgb', '--mr-radius-xs', '--mr-text-2xl']) {
        assert.equal(
            isValidTokenName(name),
            true,
            `${name} : structurellement valide, à Toll par la revue de phase`
        )
    }
    assert.ok(FORBIDDEN_PREFIXES.length >= 4, 'la liste des interdits doit énumérer fs/lh/dur/ease')
})

test('les tokens de composant sont hors de la regex globale (registre local-tokens)', () => {
    for (const name of [
        '--mr-switch-scale',
        '--mr-badge-height-sm',
        '--mr-dialog-width-md',
        '--mr-spinner-size-lg',
        '--mr-tooltip-offset',
        '--mr-avatar-size-lg',
    ]) {
        assert.equal(isValidTokenName(name), false, `token de composant accepté à tort : ${name}`)
    }
})

test('les cibles de 11b1 (sémantique couleur) sont acceptées', () => {
    const targets = [
        '--mr-bg-canvas',
        '--mr-bg-surface',
        '--mr-bg-raised',
        '--mr-text-primary',
        '--mr-border-control',
        '--mr-accent',
        '--mr-accent-subtle',
        '--mr-tonal-accent-strong',
        '--mr-status-success-text',
        '--mr-status-warning-border',
        '--mr-status-danger-subtle',
        '--mr-status-info-text',
        '--mr-scrim',
        '--mr-chart-muted',
    ]
    for (const name of targets) {
        assert.equal(isValidTokenName(name), true, `cible 11b1 refusée : ${name}`)
    }
})

test('le motif est utilisable tel quel par Stylelint (sans préfixe --)', () => {
    const re = new RegExp(TOKEN_NAME_PATTERN)
    assert.equal(re.test('mr-bg-canvas'), true)
    assert.equal(re.test('--mr-bg-canvas'), false, 'le motif ne doit PAS inclure le préfixe --')
})

test('isForbiddenAbbreviation identifie les abréviations héritées', () => {
    assert.equal(isForbiddenAbbreviation('--mr-fs-14'), true)
    assert.equal(isForbiddenAbbreviation('--mr-lh-12'), true)
    assert.equal(isForbiddenAbbreviation('--mr-dur-150'), true)
    assert.equal(isForbiddenAbbreviation('--mr-ease-standard'), true)
    assert.equal(isForbiddenAbbreviation('--mr-font-size-body'), false)
    assert.equal(isForbiddenAbbreviation('--mr-duration-base'), false)
})
