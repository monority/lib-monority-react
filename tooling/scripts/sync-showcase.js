#!/usr/bin/env node

/**
 * Showcase Sync Script
 * 
 * Compares components in monority-ui with showcase sections in monority-web
 * and reports missing showcase sections.
 * 
 * Usage: node scripts/sync-showcase.js
 * 
 * Exit codes:
 *   0 - All components have showcase sections
 *   1 - Some components are missing showcase sections
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')

// Paths
const uiComponentsDir = path.join(ROOT_DIR, 'packages/monority-ui/src/components/ui')
const showcaseSectionsDir = path.join(ROOT_DIR, 'packages/monority-web/src/features/showcase/sections')

// Get all component files (excluding test files and internal folder)
const componentFiles = fs.readdirSync(uiComponentsDir)
    .filter(file => file.endsWith('.jsx') && !file.includes('.test.'))
    .map(file => file.replace('.jsx', ''))

// Get all showcase section files
const showcaseFiles = fs.readdirSync(showcaseSectionsDir)
    .filter(file => file.startsWith('Showcase') && file.endsWith('Section.jsx'))
    .map(file => file.replace('Showcase', '').replace('Section.jsx', ''))

// Find missing showcase sections
const missingShowcase = componentFiles.filter(comp => !showcaseFiles.includes(comp))

// Find orphaned showcase sections (showcase exists but component doesn't)
const orphanedShowcase = showcaseFiles.filter(comp => !componentFiles.includes(comp))

console.log('\n📊 Showcase Sync Report\n')
console.log('─'.repeat(50))

console.log(`\n📦 Total UI Components: ${componentFiles.length}`)
console.log(`🎨 Total Showcase Sections: ${showcaseFiles.length}`)

if (missingShowcase.length === 0 && orphanedShowcase.length === 0) {
    console.log('\n✅ All components have showcase sections!\n')
    process.exit(0)
}

if (missingShowcase.length > 0) {
    console.log(`\n⚠️  Missing showcase sections (${missingShowcase.length}):`)
    missingShowcase.forEach(comp => {
        console.log(`   - ${comp}`)
    })
}

if (orphanedShowcase.length > 0) {
    console.log(`\n🗑️  Orphaned showcase sections (${orphanedShowcase.length}):`)
    orphanedShowcase.forEach(comp => {
        console.log(`   - ${comp}`)
    })
}

console.log('\n💡 Run the following to create missing sections:')
missingShowcase.forEach(comp => {
    console.log(`   node scripts/generate-component.js ${comp} --no-test`)
})
console.log()

process.exit(1)
