#!/usr/bin/env node

/**
 * Component Generator for Monority UI
 * 
 * Usage: node scripts/generate-component.js <ComponentName> [options]
 * 
 * Options:
 *   --no-test        Skip test file generation
 *   --no-showcase    Skip showcase section generation
 *   --help, -h       Show help
 * 
 * Examples:
 *   node scripts/generate-component.js Button
 *   node scripts/generate-component.js DatePicker --no-test
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')

// Parse arguments
const args = process.argv.slice(2)
const componentName = args.find(arg => !arg.startsWith('--'))
const options = {
    noTest: args.includes('--no-test'),
    noShowcase: args.includes('--no-showcase'),
    help: args.includes('--help') || args.includes('-h'),
}

// Help
if (options.help || !componentName) {
    console.log(`
Component Generator for Monority UI

Usage: node scripts/generate-component.js <ComponentName> [options]

Options:
  --no-test        Skip test file generation
  --no-showcase    Skip showcase section generation
  --help, -h       Show help

Examples:
  node scripts/generate-component.js Button
  node scripts/generate-component.js DatePicker --no-test
`)
    process.exit(0)
}

// Validate component name
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
    console.error(`Error: Component name must be PascalCase (e.g., Button, DatePicker)`)
    process.exit(1)
}

// Paths
const uiComponentsDir = path.join(ROOT_DIR, 'packages/monority-ui/src/components/ui')
const showcaseSectionsDir = path.join(ROOT_DIR, 'packages/monority-web/src/features/showcase/sections')
const showcaseContentFile = path.join(ROOT_DIR, 'packages/monority-web/src/features/showcase/content/showcase-content.js')
const uiIndexFile = path.join(ROOT_DIR, 'packages/monority-ui/src/components/ui/index.js')

// Check if component already exists
const componentFile = path.join(uiComponentsDir, `${componentName}.jsx`)
if (fs.existsSync(componentFile)) {
    console.error(`Error: Component ${componentName} already exists at ${componentFile}`)
    process.exit(1)
}

// Templates
const componentTemplate = `import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

export const ${componentName} = forwardRef(function ${componentName}(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={cn('${kebabCase(componentName)}', className)}
            {...props}
        >
            {/* TODO: Implement ${componentName} */}
        </div>
    )
})
`

const testTemplate = `import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ${componentName} } from './${componentName}'

describe('${componentName}', () => {
    it('renders children correctly', () => {
        render(<${componentName}>Test content</${componentName}>)
        expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<${componentName} className="custom-class">Content</${componentName}>)
        const element = screen.getByText('Content')
        expect(element).toHaveClass('custom-class')
    })
})
`

const showcaseSectionTemplate = `import { ${componentName}, Section, Text, Title } from '@monority/ui'

export function Showcase${componentName}Section() {
    return (
        <Section>
            <Title>${componentName}</Title>
            <Text>Examples of the ${componentName} component.</Text>
            
            <div className="showcase-${kebabCase(componentName)}-examples">
                {/* Basic example */}
                <${componentName}>
                    Basic ${componentName}
                </${componentName}>
            </div>
        </Section>
    )
}
`

// Helper: PascalCase to kebab-case
function kebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// Helper: Append export to index.js
function appendExport(indexPath, exportName, relativePath) {
    const content = fs.readFileSync(indexPath, 'utf-8')
    const exportLine = `export { ${exportName} } from './${relativePath}'`

    if (content.includes(exportLine)) {
        return false
    }

    // Find the last export line and append after it
    const lines = content.split('\n')
    const lastExportIndex = lines.findLastIndex(line => line.startsWith('export '))

    if (lastExportIndex === -1) {
        // No exports found, append at end
        lines.push(exportLine)
    } else {
        lines.splice(lastExportIndex + 1, 0, exportLine)
    }

    fs.writeFileSync(indexPath, lines.join('\n') + '\n')
    return true
}

// Helper: Update showcase content to include new section
function updateShowcaseContent(contentFile, componentName) {
    const content = fs.readFileSync(contentFile, 'utf-8')

    // Check if already imported
    if (content.includes(`Showcase${componentName}Section`)) {
        return false
    }

    // Add import
    const importLine = `import { Showcase${componentName}Section } from '../sections/Showcase${componentName}Section.jsx'`
    const updatedContent = content.replace(
        /(import.*from.*showcase-content\.js'\n)/,
        `$1${importLine}\n`
    )

    // Add to showcaseSections array
    const finalContent = updatedContent.replace(
        /(export const showcaseSections = \[[\s\S]*?)(\])/,
        `$1    { id: '${kebabCase(componentName)}', title: '${componentName}' },\n$2`
    )

    fs.writeFileSync(contentFile, finalContent)
    return true
}

// Helper: Update ShowcasePage to render the new section
function updateShowcasePage(componentName) {
    const showcasePageFile = path.join(ROOT_DIR, 'packages/monority-web/src/features/showcase/ShowcasePage.jsx')
    const content = fs.readFileSync(showcasePageFile, 'utf-8')

    // Check if already imported
    if (content.includes(`Showcase${componentName}Section`)) {
        return false
    }

    // Add import
    const importLine = `import { Showcase${componentName}Section } from './sections/Showcase${componentName}Section.jsx'`
    const updatedContent = content.replace(
        /(import.*ShowcaseHeroSection.*\n)/,
        `$1${importLine}\n`
    )

    // Add section to render
    const finalContent = updatedContent.replace(
        /(<\/AppPage>)/,
        `            <Showcase${componentName}Section />\n        $1`
    )

    fs.writeFileSync(showcasePageFile, finalContent)
    return true
}

// Execute
console.log(`\n🚀 Generating component: ${componentName}\n`)

// 1. Create component file
fs.writeFileSync(componentFile, componentTemplate)
console.log(`✅ Created: packages/monority-ui/src/components/ui/${componentName}.jsx`)

// 2. Create test file
if (!options.noTest) {
    const testFile = path.join(uiComponentsDir, `${componentName}.test.jsx`)
    fs.writeFileSync(testFile, testTemplate)
    console.log(`✅ Created: packages/monority-ui/src/components/ui/${componentName}.test.jsx`)
}

// 3. Update UI index.js
appendExport(uiIndexFile, componentName, componentName)
console.log(`✅ Updated: packages/monority-ui/src/components/ui/index.js`)

// 4. Create showcase section
if (!options.noShowcase) {
    const showcaseFile = path.join(showcaseSectionsDir, `Showcase${componentName}Section.jsx`)
    fs.writeFileSync(showcaseFile, showcaseSectionTemplate)
    console.log(`✅ Created: packages/monority-web/src/features/showcase/sections/Showcase${componentName}Section.jsx`)

    // Update showcase content and page
    updateShowcaseContent(showcaseContentFile, componentName)
    console.log(`✅ Updated: packages/monority-web/src/features/showcase/content/showcase-content.js`)

    updateShowcasePage(componentName)
    console.log(`✅ Updated: packages/monority-web/src/features/showcase/ShowcasePage.jsx`)
}

console.log(`\n✨ Component ${componentName} generated successfully!\n`)
console.log(`Next steps:`)
console.log(`  1. Implement the component logic in ${componentName}.jsx`)
console.log(`  2. Add styles to packages/monority-ui/src/styles/components.css`)
console.log(`  3. Update the showcase section with meaningful examples`)
if (!options.noTest) {
    console.log(`  4. Write comprehensive tests in ${componentName}.test.jsx`)
}
console.log()
