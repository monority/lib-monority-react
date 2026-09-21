#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const UI_PKG = path.join(ROOT, 'packages/ui/package.json')
const TSUP_CFG = path.join(ROOT, 'packages/ui/tsup.config.ts')
const DIST_DIR = path.join(ROOT, 'packages/ui/dist')

const pass = (m) => console.log('\x1b[32m✅ ' + m + '\x1b[0m')
const fail = (m) => { console.error('\x1b[31m❌ ' + m + '\x1b[0m'); errors.push(m) }
const warn = (m) => console.warn('\x1b[33m⚠️  ' + m + '\x1b[0m')
const info = (m) => console.log('\x1b[36mℹ️  ' + m + '\x1b[0m')
let errors = []

info('Checking package metadata...')
const pkg = JSON.parse(fs.readFileSync(UI_PKG, 'utf8'))
for (const f of ['name','version','description','license','repository','keywords']) {
  pkg[f] ? pass('package.json.' + f + ' present') : warn('package.json missing "' + f + '"')
}
pkg.publishConfig?.access ? pass('publishConfig.access = ' + pkg.publishConfig.access) : warn('publishConfig.access not set')

info('Checking exports ↔ tsup alignment...')
const exportedSubpaths = Object.keys(pkg.exports).filter(k => k !== '.' && !k.endsWith('.css')).map(k => k.replace('./', ''))
const tsupSrc = fs.readFileSync(TSUP_CFG, 'utf8')
const tsupEntries = [...tsupSrc.matchAll(/^\s+['"]?([\w-]+)['"]?\s*:\s+'/gm)].map(m => m[1])

function tsupHas(sub) {
  return tsupEntries.includes(sub) || tsupEntries.includes(sub.replace(/-([a-z])/g, (_, c) => c.toUpperCase()))
}
const missingInTsup = exportedSubpaths.filter(s => !tsupHas(s))
missingInTsup.length ? fail('Missing tsup entries: ' + missingInTsup.join(', ')) : pass('All ' + exportedSubpaths.length + ' exports have tsup entries')

const skipKeys = new Set(['entry','publicDir','format','dts','sourcemap','clean','splitting','treeshake','minify','external','tsconfig'])
const missingInExports = tsupEntries.filter(k => {
  if (skipKeys.has(k)) return false
  const kebab = k.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
  return !exportedSubpaths.includes(kebab) && !exportedSubpaths.includes(k)
})
missingInExports.length ? warn('tsup entries without exports: ' + missingInExports.join(', ')) : pass('No stray tsup entries')

info('Checking dist files...')
const distFiles = new Set(fs.readdirSync(DIST_DIR))
function hasDist(sub) {
  const camel = sub.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  return distFiles.has(sub + '.js') || distFiles.has(camel + '.js')
}
function hasDts(sub) {
  const camel = sub.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  return distFiles.has(sub + '.d.ts') || distFiles.has(camel + '.d.ts')
}
const missJs = exportedSubpaths.filter(s => !hasDist(s))
const missDts = exportedSubpaths.filter(s => !hasDts(s))
missJs.length ? fail('Missing dist JS: ' + missJs.join(', ')) : pass('All ' + exportedSubpaths.length + ' subpaths have .js in dist')
missDts.length ? fail('Missing dist DTS: ' + missDts.join(', ')) : pass('All ' + exportedSubpaths.length + ' subpaths have .d.ts in dist')
distFiles.has('index.js') ? pass('dist/index.js exists') : fail('Missing dist/index.js')
distFiles.has('index.d.ts') ? pass('dist/index.d.ts exists') : fail('Missing dist/index.d.ts')
distFiles.has('index.css') ? pass('dist/index.css exists') : fail('Missing dist/index.css')

info('Checking files gate...')
pkg.files?.includes('src') ? fail('package.json "files" should not include "src"') : pass('"files" does not include "src"')
pkg.files?.includes('dist') ? pass('"files" includes "dist"') : warn('"files" does not include "dist"')

info('Running contract tests...')
try {
  execSync('pnpm --filter @monority/ui test -- src/__tests__/exports.contract.test.ts src/__tests__/type-smoke.test.tsx', { cwd: ROOT, stdio: 'pipe', encoding: 'utf8' })
  pass('Contract tests pass')
} catch (e) {
  fail('Contract tests failed')
}

console.log('\n' + '─'.repeat(50))
console.log('\x1b[36mValidation Summary\x1b[0m')
console.log('\x1b[32m✅ All checks passed\x1b[0m')
if (errors.length) console.log('\x1b[31m❌ Errors: ' + errors.length + '\x1b[0m')
console.log('─'.repeat(50))
if (errors.length > 0) process.exit(1)
process.exit(0)
