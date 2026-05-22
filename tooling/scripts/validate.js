#!/usr/bin/env node

/**
 * Monority Validation Script
 * 
 * Validates the monorepo structure and consistency:
 * - Checks that all UI components have showcase sections
 * - Checks that all components are properly exported
 * - Checks that there are no orphaned files
 * 
 * Usage: node scripts/validate.js
 * 
 * Can be used in:
 * - Pre-commit hooks (husky)
 * - CI/CD pipelines
 * - IDE/AI workflows
 * - Manual validation
 * 
 * Exit codes:
 *   0 - All validations passed
 *   1 - Validation errors found
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')

// Configuration
const CONFIG = {
    uiComponentsDir: 'packages/monority-ui/src/components/ui',
    showcaseSectionsDir: 'packages/monority-web/src/features/showcase/sections',
    uiIndexFile: 'packages/monority-ui/src/components/ui/index.js',
    excludeComponents: ['index'], // Components to exclude from validation
}

// Colors for terminal output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
}

// Validation results
const results = {
    errors: [],
    warnings: [],
    info: [],
}

/**
 * Get all component files from the UI library
 */
function getUIComponents() {
    const dir = path.join(ROOT_DIR, CONFIG.uiComponentsDir)
    if (!fs.existsSync(dir)) {
        results.errors.push(`UI components directory not found: ${CONFIG.uiComponentsDir}`)
        return []
    }

    return fs.readdirSync(dir)
        .filter(file => file.endsWith('.jsx') && !file.includes('.test.'))
        .map(file => file.replace('.jsx', ''))
        .filter(name => !CONFIG.excludeComponents.includes(name))
}

/**
 * Get all showcase section files
 */
function getShowcaseSections() {
    const dir = path.join(ROOT_DIR, CONFIG.showcaseSectionsDir)
    if (!fs.existsSync(dir)) {
        results.warnings.push(`Showcase sections directory not found: ${CONFIG.showcaseSectionsDir}`)
        return []
    }

    return fs.readdirSync(dir)
        .filter(file => file.startsWith('Showcase') && file.endsWith('Section.jsx'))
        .map(file => file.replace('Showcase', '').replace('Section.jsx', ''))
}

/**
 * Get exported components from index.js
 */
function getExportedComponents() {
    const file = path.join(ROOT_DIR, CONFIG.uiIndexFile)
    if (!fs.existsSync(file)) {
        results.errors.push(`UI index file not found: ${CONFIG.uiIndexFile}`)
        return []
    }

    const content = fs.readFileSync(file, 'utf-8')
    const exportRegex = /export\s+\{\s*(\w+)\s*\}\s+from/g
    const exports = []

    let match
    while ((match = exportRegex.exec(content)) !== null) {
        exports.push(match[1])
    }

    return exports
}

/**
 * Check that all components are exported
 */
function validateExports(components, exportedComponents) {
    const missingExports = components.filter(comp => !exportedComponents.includes(comp))

    missingExports.forEach(comp => {
        results.errors.push(`Component "${comp}" is not exported in index.js`)
    })

    const extraExports = exportedComponents.filter(exp => !components.includes(exp))
    extraExports.forEach(exp => {
        results.warnings.push(`Export "${exp}" in index.js has no corresponding component file`)
    })
}

/**
 * Check that all components have showcase sections
 */
function validateShowcase(components, showcaseSections) {
    const missingShowcase = components.filter(comp => !showcaseSections.includes(comp))

    missingShowcase.forEach(comp => {
        results.warnings.push(`Component "${comp}" has no showcase section`)
        results.info.push(`  → Run: npm run generate:component ${comp} --no-test`)
    })

    const orphanedShowcase = showcaseSections.filter(comp => !components.includes(comp))
    orphanedShowcase.forEach(comp => {
        results.warnings.push(`Orphaned showcase section for "${comp}" (component doesn't exist)`)
    })
}

/**
 * Check that components have corresponding test files
 */
function validateTests(components) {
    const dir = path.join(ROOT_DIR, CONFIG.uiComponentsDir)

    components.forEach(comp => {
        const testFile = path.join(dir, `${comp}.test.jsx`)
        if (!fs.existsSync(testFile)) {
            results.info.push(`Component "${comp}" has no test file`)
        }
    })
}

/**
 * Print results
 */
function printResults() {
    console.log('\n' + '─'.repeat(50))
    console.log('📋 Monority Validation Report')
    console.log('─'.repeat(50) + '\n')

    if (results.errors.length > 0) {
        console.log(`${colors.red}❌ Errors (${results.errors.length}):${colors.reset}`)
        results.errors.forEach(msg => console.log(`   ${msg}`))
        console.log()
    }

    if (results.warnings.length > 0) {
        console.log(`${colors.yellow}⚠️  Warnings (${results.warnings.length}):${colors.reset}`)
        results.warnings.forEach(msg => console.log(`   ${msg}`))
        console.log()
    }

    if (results.info.length > 0) {
        console.log(`${colors.blue}ℹ️  Info:${colors.reset}`)
        results.info.forEach(msg => console.log(`   ${msg}`))
        console.log()
    }

    if (results.errors.length === 0 && results.warnings.length === 0) {
        console.log(`${colors.green}✅ All validations passed!${colors.reset}\n`)
    }
}

/**
 * Main
 */
function main() {
    console.log('\n🔍 Running validations...\n')

    const components = getUIComponents()
    const showcaseSections = getShowcaseSections()
    const exportedComponents = getExportedComponents()

    console.log(`📦 UI Components: ${components.length}`)
    console.log(`🎨 Showcase Sections: ${showcaseSections.length}`)
    console.log(`📤 Exported Components: ${exportedComponents.length}`)

    validateExports(components, exportedComponents)
    validateShowcase(components, showcaseSections)
    validateTests(components)

    printResults()

    // Exit with error code if there are errors
    if (results.errors.length > 0) {
        process.exit(1)
    }

    process.exit(0)
}

main()
