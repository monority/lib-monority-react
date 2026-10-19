#!/usr/bin/env node

/**
 * Showcase and Documentation Coverage Sync Script
 *
 * Compares components exported by @monority/ui with documentation pages in @monority/web.
 *
 * Usage: node scripts/sync-showcase.js
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '../../..')

const registryFile = path.join(ROOT_DIR, 'apps/web/src/features/docs/components/registry.ts')

if (!fs.existsSync(registryFile)) {
    console.error('Error: Registry file not found at ' + registryFile)
    process.exit(1)
}

const registryContent = fs.readFileSync(registryFile, 'utf8')
const registrySlugs = [...registryContent.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

const docsComponentsDir = path.join(ROOT_DIR, 'apps/web/src/features/docs/components')

const docDirs = fs
    .readdirSync(docsComponentsDir)
    .filter(
        (f) =>
            fs.statSync(path.join(docsComponentsDir, f)).isDirectory() &&
            f !== 'ComponentPlayground'
    )

const missingDocs = registrySlugs.filter((slug) => !docDirs.includes(slug))
const unregisteredDocs = docDirs.filter((d) => !registrySlugs.includes(d))

console.log('\n--- Documentation & Showcase Sync Report ---\n')
console.log(`Registered slugs: ${registrySlugs.length}`)
console.log(`Documented component folders: ${docDirs.length}`)

if (missingDocs.length === 0 && unregisteredDocs.length === 0) {
    console.log('\n[OK] All components have registered documentation pages.\n')
    process.exit(0)
}

if (missingDocs.length > 0) {
    console.log(`\n[WARN] Registered slugs without directory (${missingDocs.length}):`)
    for (const slug of missingDocs) {
        console.log(`   - ${slug}`)
    }
}

if (unregisteredDocs.length > 0) {
    console.log(`\n[WARN] Directories without registry entry (${unregisteredDocs.length}):`)
    for (const d of unregisteredDocs) {
        console.log(`   - ${d}`)
    }
}

process.exit(1)
