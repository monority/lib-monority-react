#!/usr/bin/env node
/**
 * Ajoute la directive `"use client"` aux seuls fichiers du `dist` qui en ont
 * besoin : ceux dont le code utilise React (hooks, contexte, état) ou React DOM
 * (`createPortal`).
 *
 * Les barrels (`index.js`, `button.js`…) et les modules purs (`getThemeScript`,
 * `cn`, `cva`, constantes) restent hors bannière : un Server Component peut les
 * importer, et les composants clients restent atteignables via les chunks
 * marqués.
 *
 * Audit (étape 2c) : les seuls fichiers sans bannière qui mentionnent des APIs
 * navigateur sont `get-theme-script.ts` (le `document`/`localStorage` est dans
 * la **chaîne** du script injecté) et `internal/dom.ts` (`typeof window` dans
 * une fonction) — aucune exécution au chargement, donc aucun besoin de
 * bannière. Le critère reste donc « importe React/React DOM ».
 *
 * Lancé par tsup (`onSuccess`) après chaque build.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const BANNER = '"use client";'
const DIST = resolve(process.cwd(), 'dist')
const REACT_IMPORT =
    /(?:^|\n)\s*(?:import|export)[^;\n]*from\s*["']react(?:-dom)?(?:\/[^"']*)?["']|require\(\s*["']react(?:-dom)?(?:\/[^"']*)?["']\s*\)/

let added = 0
let removed = 0

for (const file of readdirSync(DIST).filter((name) => name.endsWith('.js'))) {
    const path = join(DIST, file)
    const source = readFileSync(path, 'utf8')
    const hasBanner = source.startsWith(BANNER)
    const body = hasBanner ? source.slice(BANNER.length).replace(/^\s*\n/, '') : source
    const needsBanner = REACT_IMPORT.test(body)
    const next = needsBanner ? `${BANNER}\n\n${body}` : body
    if (next === source) continue
    writeFileSync(path, next)
    if (needsBanner) added++
    else removed++
}

console.log(`use-client: ${added} ajout(s), ${removed} retrait(s)`)
