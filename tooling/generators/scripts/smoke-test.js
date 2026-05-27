#!/usr/bin/env node

/**
 * Smoke test for the component generator.
 * Generates a temporary component, typechecks it, runs its tests, then cleans up.
 */

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = findRepoRoot(__dirname)
const TMP_NAME = 'SmokeTestProbe'
const TMP_SLUG = 'smoke-test-probe'
const CATEGORY = 'display'

const componentDir = path.join(ROOT, 'packages/ui/src/components', CATEGORY, TMP_SLUG)
const recipeFile = path.join(ROOT, 'packages/styles/src/recipes', TMP_SLUG + '.recipe.css')
const docsDir = path.join(ROOT, 'apps/web/src/docs/components', TMP_SLUG)
const CLEANUP_PATHS = [componentDir, recipeFile, docsDir]

console.log('\n=== Generator Smoke Test ===\n')
console.log('Component: ' + TMP_NAME)
console.log('Category: ' + CATEGORY)

console.log('\n[1/4] Generating ' + TMP_NAME + '...')
try {
  execSync('node scripts/generate-component.js ' + TMP_NAME + ' --category=' + CATEGORY, {
    cwd: path.dirname(__dirname), stdio: 'pipe', timeout: 30000
  })
  console.log('  [OK] Generated successfully')
} catch (err) {
  console.error('  [FAIL] Generation failed:', err.stderr?.toString() || err.message)
  cleanup(); process.exit(1)
}

console.log('\n[2/4] Running typecheck...')
try {
  execSync('pnpm tsc --noEmit --noUnusedLocals false --noUnusedParameters false', {
    cwd: path.join(ROOT, 'packages/ui'), stdio: 'pipe', timeout: 60000
  })
  console.log('  [OK] TypeScript: 0 errors')
} catch (err) {
  console.error('  [FAIL] TypeScript errors:', err.stderr?.toString() || err.message)
  cleanup(); process.exit(1)
}

console.log('\n[3/4] Running tests...')
try {
  const testOutput = execSync('pnpm vitest run ' + TMP_SLUG + ' --reporter=verbose', {
    cwd: path.join(ROOT, 'packages/ui'), stdio: 'pipe', timeout: 60000
  })
  console.log('  [OK] All tests passed')
} catch (err) {
  console.error('  [FAIL] Tests failed:', err.stderr?.toString() || err.message)
  cleanup(); process.exit(1)
}

console.log('\n[4/4] Cleaning up...')
cleanup()
console.log('  [OK] Cleanup done')

console.log('\n=== Smoke Test: PASSED ===\n')
process.exit(0)

function cleanup() {
  for (const p of CLEANUP_PATHS) {
    if (fs.existsSync(p)) { fs.rmSync(p, { recursive: true, force: true }) }
  }
  revertAutoUpdates()
}

function revertAutoUpdates() {
  revertCategoryIndex()
  revertRegistry()
  revertPackageJson()
  revertTsup()
  revertRecipesIndex()
}

function revertCategoryIndex() {
  const p = path.join(ROOT, 'packages/ui/src/components', CATEGORY, 'index.ts')
  if (!fs.existsSync(p)) return
  let c = fs.readFileSync(p, 'utf8')
  const e = "export * from './" + TMP_SLUG + "'"
  if (c.includes(e)) { c = c.replace(e + '\n', ''); fs.writeFileSync(p, c) }
}

function revertRegistry() {
  const p = path.join(ROOT, 'apps/web/src/docs/components/registry.ts')
  if (!fs.existsSync(p)) return
  let c = fs.readFileSync(p, 'utf8')
  const e = "{ category: '" + CATEGORY + "', label: '" + TMP_NAME + "', path: '/docs/" + TMP_SLUG + "', slug: '" + TMP_SLUG + "', status: 'draft' },"
  if (c.includes(e)) { c = c.replace(e + '\n', ''); fs.writeFileSync(p, c) }
}

function revertPackageJson() {
  const p = path.join(ROOT, 'packages/ui/package.json')
  if (!fs.existsSync(p)) return
  const pkg = JSON.parse(fs.readFileSync(p, 'utf8'))
  const key = './' + TMP_SLUG
  if (pkg.exports?.[key]) { delete pkg.exports[key]; fs.writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n') }
}

function revertTsup() {
  const p = path.join(ROOT, 'packages/ui/tsup.config.ts')
  if (!fs.existsSync(p)) return
  let c = fs.readFileSync(p, 'utf8')
  const e = "    smokeTestProbe: 'src/components/" + CATEGORY + "/" + TMP_SLUG + "/index.ts',"
  if (c.includes(e)) { c = c.replace(e + '\n', ''); fs.writeFileSync(p, c) }
}

function revertRecipesIndex() {
  const p = path.join(ROOT, 'packages/styles/src/recipes/index.css')
  if (!fs.existsSync(p)) return
  let c = fs.readFileSync(p, 'utf8')
  const e = "@import './" + TMP_SLUG + ".recipe.css';"
  if (c.includes(e)) { c = c.replace(e + '\n', ''); fs.writeFileSync(p, c) }
}

function findRepoRoot(startDir) {
  let current = startDir
  while (current !== path.dirname(current)) {
    const pkgPath = path.join(current, 'package.json')
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8').replace(/^\uFEFF/, ''))
      if (pkg.name === 'monority') return current
    }
    current = path.dirname(current)
  }
  throw new Error('Could not find repo root')
}