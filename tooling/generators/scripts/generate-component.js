#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = findRepoRoot(__dirname)

const args = process.argv.slice(2)
const componentName = args.find((arg) => !arg.startsWith('--'))
const options = parseOptions(args)

if (options.help || !componentName) {
  printHelp()
  process.exit(0)
}

if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  fail('Component name must be PascalCase, e.g. Button or DatePicker.')
}

const category = options.category
const slug = kebabCase(componentName)
const cssBlock = `mr-${slug}`

const componentDir = path.join(ROOT_DIR, 'packages/ui/src/components', category, slug)
const categoryIndexFile = path.join(ROOT_DIR, 'packages/ui/src/components', category, 'index.ts')
const docsDir = path.join(ROOT_DIR, 'apps/web/src/docs/components', slug)
const docsRegistryFile = path.join(ROOT_DIR, 'apps/web/src/docs/components/registry.ts')
const recipeFile = path.join(ROOT_DIR, 'packages/styles/src/recipes', `${slug}.recipe.css`)

const files = [
  {
    path: path.join(componentDir, `${componentName}.types.ts`),
    content: typesTemplate(componentName),
  },
  {
    path: path.join(componentDir, `${componentName}.tsx`),
    content: componentTemplate(componentName, cssBlock),
  },
  {
    path: path.join(componentDir, `${componentName}.test.tsx`),
    content: testTemplate(componentName, cssBlock),
  },
  {
    path: path.join(componentDir, 'index.ts'),
    content: indexTemplate(componentName),
  },
  {
    path: path.join(docsDir, `${componentName}.meta.ts`),
    content: docsMetaTemplate(componentName, category),
  },
  {
    path: path.join(docsDir, `${componentName}.examples.tsx`),
    content: docsExamplesTemplate(componentName),
  },
  {
    path: path.join(docsDir, `${componentName}.docs.tsx`),
    content: docsPageTemplate(componentName),
  },
  {
    path: path.join(docsDir, 'index.ts'),
    content: docsIndexTemplate(componentName),
  },
  {
    path: recipeFile,
    content: recipeTemplate(cssBlock),
  },
]

if (fs.existsSync(componentDir)) {
  fail(`Component already exists: ${relative(componentDir)}`)
}

for (const file of files) {
  writeFile(file.path, file.content)
}

appendExport(categoryIndexFile, `export * from './${slug}'`)
appendDocsRegistry(docsRegistryFile, { category, componentName, slug })

// --- Auto-update sub-path exports, tsup entries, recipe imports ---
addSubpathExport(
  path.join(ROOT_DIR, 'packages/ui/package.json'),
  slug,
  category,
)

addTsupEntry(
  path.join(ROOT_DIR, 'packages/ui/tsup.config.ts'),
  componentName,
  slug,
  category,
)

addRecipeImport(
  path.join(ROOT_DIR, 'packages/styles/src/recipes/index.css'),
  slug,
)

log(`Generated ${componentName} in ${relative(componentDir)}`)
log(`Category: ${category}`)
if (options.dryRun) {
  log('Dry run only. No files written.')
}

function parseOptions(argv) {
  const categoryArg = argv.find((arg) => arg.startsWith('--category='))
  const categoryValue = categoryArg?.split('=')[1] ?? readOptionValue(argv, '--category') ?? 'display'

  return {
    category: categoryValue,
    dryRun: argv.includes('--dry-run'),
    help: argv.includes('--help') || argv.includes('-h'),
  }
}

function readOptionValue(argv, name) {
  const index = argv.indexOf(name)
  if (index === -1) return undefined
  return argv[index + 1]
}

function printHelp() {
  console.log(`
Component Generator for Monority UI

Usage:
  node scripts/generate-component.js ComponentName --category actions

Options:
  --category <name>   Component category. Default: display
  --dry-run           Print actions without writing files
  --help, -h          Show help

Examples:
  pnpm generate:component Button --category actions
  pnpm generate:component DatePicker --category forms
`)
}

function findRepoRoot(startDir) {
  let current = startDir

  while (current !== path.dirname(current)) {
    const packageJson = path.join(current, 'package.json')
    if (fs.existsSync(packageJson)) {
      const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8').replace(/^\uFEFF/, ''))
      if (pkg.name === 'monority') return current
    }
    current = path.dirname(current)
  }

  fail('Could not find repo root package.json.')
}

function writeFile(filePath, content) {
  if (options.dryRun) {
    log(`Would create ${relative(filePath)}`)
    return
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content)
  log(`Created ${relative(filePath)}`)
}

function appendExport(indexPath, exportLine) {
  if (options.dryRun) {
    log(`Would update ${relative(indexPath)} with: ${exportLine}`)
    return
  }

  const current = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : ''
  if (current.includes(exportLine)) return

  const next = current.trimEnd() ? `${current.trimEnd()}\n${exportLine}\n` : `${exportLine}\n`
  fs.writeFileSync(indexPath, next)
  log(`Updated ${relative(indexPath)}`)
}

function appendDocsRegistry(registryPath, { category, componentName, slug }) {
  const registryEntry = `  { category: '${category}', label: '${componentName}', path: '/docs/${slug}', slug: '${slug}', status: 'draft' },`
  const marker = '  // generator:component-registry'

  if (options.dryRun) {
    log(`Would update ${relative(registryPath)} with: ${registryEntry.trim()}`)
    return
  }

  if (!fs.existsSync(registryPath)) {
    writeFile(registryPath, docsRegistryTemplate(registryEntry))
    return
  }

  const current = fs.readFileSync(registryPath, 'utf8')
  if (current.includes(`slug: '${slug}'`)) return

  const next = current.includes(marker)
    ? current.replace(marker, `${registryEntry}\n${marker}`)
    : current.replace(/\]\s*$/, `${registryEntry}\n]\n`)

  fs.writeFileSync(registryPath, next)
  log(`Updated ${relative(registryPath)}`)
}

function typesTemplate(name) {
  return `import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ${name}Variant = 'primary' | 'secondary'
export type ${name}Size = 'sm' | 'md' | 'lg'

export interface ${name}Props extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ${name}Variant
  size?: ${name}Size
  children?: ReactNode
}
`
}

function componentTemplate(name, cssBlock) {
  const camelName = camelCase(name)
  return `import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { ${name}Props } from './${name}.types'

const ${camelName}Variants = cva({
  base: '${cssBlock}',
  variants: {
    variant: {
      primary: '${cssBlock}--primary',
      secondary: '${cssBlock}--secondary',
    },
    size: {
      sm: '${cssBlock}--sm',
      md: '${cssBlock}--md',
      lg: '${cssBlock}--lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export const ${name} = forwardRef<HTMLButtonElement, ${name}Props>(function ${name}(
  { variant, size, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(${camelName}Variants({ variant, size }), className)}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  )
})

export type { ${name}Props, ${name}Variant, ${name}Size } from './${name}.types'
`
}

function testTemplate(name, cssBlock) {
  return `import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { ${name} } from './${name}'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => { root?.render(ui) })
  return container
}

afterEach(() => {
  act(() => { root?.unmount() })
  container?.remove()
  root = null
  container = null
})

describe('${name}', () => {
  it('renders children with default button semantics and className', () => {
    const view = render(<${name}>Click me</${name}>)
    const btn = view.querySelector('button.${cssBlock}')
    expect(btn?.textContent).toBe('Click me')
    expect(btn?.className).toContain('${cssBlock}')
  })

  it('maps variant, size to stable class hooks', () => {
    const view = render(<${name} variant="secondary" size="lg">Styled</${name}>)
    const btn = view.querySelector('button')
    expect(btn?.className).toContain('${cssBlock}--secondary')
    expect(btn?.className).toContain('${cssBlock}--lg')
    expect(btn?.getAttribute('data-variant')).toBe('secondary')
    expect(btn?.getAttribute('data-size')).toBe('lg')
  })

  it('forwards refs', () => {
    const ref = { current: null as HTMLButtonElement | null }
    render(<${name} ref={ref}>Ref</${name}>)
    expect(ref.current?.tagName).toBe('BUTTON')
  })
})
`
}

function indexTemplate(name) {
  return `export { ${name} } from './${name}'
export type { ${name}Props } from './${name}.types'
`
}

function docsMetaTemplate(name, category) {
  const slug = kebabCase(name)
  return `export const ${camelCase(name)}Meta = {
  title: '${name}',
  status: 'draft',
  package: '@monority/ui/${slug}',
  import: "import { ${name} } from '@monority/ui/${slug}'",
  category: '${category}',
  anatomy: ['root'],
  accessibility: [],
}
`
}

function docsExamplesTemplate(name) {
  return `import { ${name} } from '@monority/ui'

export function ${name}BasicExample() {
  return <${name}>Basic ${name}</${name}>
}
`
}

function docsPageTemplate(name) {
  return `import { ComponentDocsPage } from '../componentDocs'
import { ${camelCase(name)}Meta } from './${name}.meta'

export function ${name}Docs() {
  return <ComponentDocsPage slug="${kebabCase(name)}" />
}
`
}

function docsIndexTemplate(name) {
  return `export { ${name}Docs } from './${name}.docs'
export { ${name}BasicExample } from './${name}.examples'
export { ${camelCase(name)}Meta } from './${name}.meta'
`
}

function docsRegistryTemplate(registryEntry) {
  return `export interface DocsComponentRegistryItem {
  category: string
  label: string
  path: string
  slug: string
  status: 'draft' | 'stable'
}

export const docsComponentRegistry: DocsComponentRegistryItem[] = [
${registryEntry}
  // generator:component-registry
]
`
}

function recipeTemplate(cssBlock) {
  return `@layer recipes {
  .${cssBlock} {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .${cssBlock}--primary {}
  .${cssBlock}--secondary {}
  .${cssBlock}--sm {}
  .${cssBlock}--md {}
  .${cssBlock}--lg {}
}
`
}

function addSubpathExport(packageJsonPath, slug, category) {
  if (options.dryRun) {
    log(`Would update package.json exports with ./${slug}`)
    return
  }

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const exportKey = `./${slug}`
  if (pkg.exports[exportKey]) return // already exists

  const exportEntry = slug.replace(/-/g, '')
  const exportConfig = {
    types: `./dist/${exportEntry}.d.ts`,
    development: `./src/components/${category}/${slug}/index.ts`,
    import: `./dist/${exportEntry}.js`,
    default: `./dist/${exportEntry}.js`,
  }

  pkg.exports[exportKey] = exportConfig
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n')
  log(`Updated package.json exports with ./${slug}`)
}

function addTsupEntry(tsupPath, componentName, slug, category) {
  if (options.dryRun) {
    const entryKey = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    log(`Would update tsup.config.ts entry: ${entryKey}`)
    return
  }

  let content = fs.readFileSync(tsupPath, 'utf8')
  const entryKey = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  const entryPath = `src/components/${category}/${slug}/index.ts`
  const entryLine = `    ${entryKey}: '${entryPath}',`

  if (content.includes(entryPath)) return // already exists

  // Insert before the closing brace of the entry object
  const closingBraceIndex = content.lastIndexOf('  },\n  format:')
  if (closingBraceIndex === -1) return
  content = content.slice(0, closingBraceIndex) + `${entryLine}\n` + content.slice(closingBraceIndex)
  fs.writeFileSync(tsupPath, content)
  log(`Updated tsup.config.ts entry: ${entryKey}`)
}

function addRecipeImport(recipesIndexPath, slug) {
  if (options.dryRun) {
    log(`Would update recipes/index.css with ${slug}`)
    return
  }

  const importLine = `@import './${slug}.recipe.css';`
  const content = fs.readFileSync(recipesIndexPath, 'utf8')
  if (content.includes(importLine)) return

  // Append as last import, in alphabetical order
  const lines = content.trim().split('\n')
  lines.push(importLine)
  lines.sort()
  fs.writeFileSync(recipesIndexPath, lines.join('\n') + '\n')
  log(`Updated recipes/index.css with ${slug}`)
}

function kebabCase(value) {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function camelCase(value) {
  return `${value[0].toLowerCase()}${value.slice(1)}`
}

function relative(filePath) {
  return path.relative(ROOT_DIR, filePath).replaceAll(path.sep, '/')
}

function log(message) {
  console.log(message)
}

function fail(message) {
  console.error(`Error: ${message}`)
  process.exit(1)
}
