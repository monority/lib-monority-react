// Runtime check: every public import resolves against dist and exposes symbols.
// Run after `pnpm install`: node ./dist-check.mjs
import assert from 'node:assert'

const root = await import('@monority/ui')
for (const symbol of [
    'Button',
    'Checkbox',
    'Slider',
    'Progress',
    'Tooltip',
    'Toast',
    'ToastProvider',
    'useToast',
    'Avatar',
    'Accordion',
]) {
    assert.ok(root[symbol], `root export missing: ${symbol}`)
}

const { NumberInput } = await import('@monority/ui/number-input')
assert.ok(NumberInput, 'number-input export missing')

const { PageHeader } = await import('@monority/ui/page-header')
assert.ok(PageHeader, 'page-header export missing')

const { Slider: SliderSub } = await import('@monority/ui/slider')
assert.ok(SliderSub, 'slider subpath export missing')

for (const [subpath, symbol] of [
    ['@monority/ui/tabs', 'Tabs'],
    ['@monority/ui/modal', 'Modal'],
    ['@monority/ui/banner', 'Banner'],
    ['@monority/ui/input', 'Input'],
    ['@monority/ui/select', 'Select'],
    ['@monority/ui/textarea', 'Textarea'],
    ['@monority/ui/switch', 'Switch'],
    ['@monority/ui/badge', 'Badge'],
    ['@monority/ui/callout', 'Callout'],
    ['@monority/ui/card', 'Card'],
    ['@monority/ui/pre-code', 'PreCode'],
]) {
    const mod = await import(subpath)
    assert.ok(mod[symbol], `${subpath} export missing: ${symbol}`)
}

// CSS subpath must resolve (bundlers handle the CSS payload).
const cssUrl = import.meta.resolve('@monority/ui/styles.css')
assert.ok(cssUrl.endsWith('dist/index.css'), `unexpected css target: ${cssUrl}`)

// No second React: the package externalizes react, so from the installed
// package directory `react` must resolve to the exact same file as ours.
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
const pkgRequire = createRequire(import.meta.resolve('@monority/ui'))
const pkgReact = pkgRequire.resolve('react')
const ownReact = fileURLToPath(import.meta.resolve('react'))
assert.equal(pkgReact, ownReact, `react resolved twice: ${pkgReact} vs ${ownReact}`)

console.log('consumer runtime check: PASS')
