import { describe, expect, it } from 'vitest'
// @ts-ignore - node builtins unavailable in the web tsconfig types; vitest runs on node
import { readFileSync, readdirSync, statSync } from 'node:fs'

declare const process: { cwd(): string }

const root = `${process.cwd()}/../..`
const componentsDir = `${process.cwd()}/src/docs/components`

// Subset of HTML/SVG attributes that intentionally appear in docs without
// being declared explicitly in each component's .types.ts.
const NATIVE_ATTRS = new Set([
    'className',
    'style',
    'id',
    'children',
    'placeholder',
    'value',
    'defaultValue',
    'onChange',
    'disabled',
    'required',
    'name',
    'type',
    'rows',
    'maxLength',
    'multiple',
    'min',
    'max',
    'step',
    'title',
    'role',
    'tabIndex',
    'onClick',
    'href',
    'src',
    'alt',
    'autoFocus',
    'form',
    'list',
    'pattern',
    'readOnly',
    'size',
    'width',
    'height',
])

const slugs = [
    'button',
    'input',
    'textarea',
    'select',
    'switch',
    'checkbox',
    'slider',
    'radio-group',
    'badge',
    'callout',
    'progress',
    'skeleton',
    'spinner',
    'modal',
    'alert-dialog',
    'tooltip',
    'toast',
    'toggle',
    'tabs',
    'accordion',
    'avatar',
    'breadcrumb',
    'card',
    'section',
    'separator',
]

function extractTypeProps(typesText: string): string[] {
    // Walk lines looking for interface member declarations.
    const props: string[] = []
    let inInterface = false
    for (const line of typesText.split('\n')) {
        if (/^\s*interface\s+\w+/.test(line)) {
            inInterface = true
            continue
        }
        if (inInterface && /^\s*\}/.test(line)) {
            inInterface = false
            continue
        }
        if (inInterface) {
            const m = line.match(/^\s*([a-zA-Z][a-zA-Z0-9]*)\??:/)
            if (m) props.push(m[1]!)
        }
    }
    return props
}

function extractDocProps(docsText: string): string[] {
    const props: string[] = []
    for (const line of docsText.split('\n')) {
        const m = line.match(/name:\s*'([^']+)'/)
        if (m) props.push(m[1]!)
    }
    return props
}

describe('Step 10 · docs props match the TypeScript API', () => {
    for (const slug of slugs) {
        it(`${slug}: every documented prop exists in types (or is a native attr)`, () => {
            const dir = `${componentsDir}/${slug}`
            if (!statSync(dir).isDirectory()) return
            const docsFile = readdirSync(dir).find((f: string) => f.endsWith('.docs.tsx'))
            const typesFile = readdirSync(dir).find((f: string) => f.endsWith('.types.ts'))
            if (!docsFile || !typesFile) return

            const docsText = readFileSync(`${dir}/${docsFile}`, 'utf8')
            const typesText = readFileSync(`${dir}/${typesFile}`, 'utf8')

            const docProps = extractDocProps(docsText)
            const typeProps = extractTypeProps(typesText)
            const known = new Set([...typeProps, ...NATIVE_ATTRS])

            const unknown = docProps.filter(p => !known.has(p))
            expect(unknown, `unknown props in ${slug} docs`).toEqual([])
        })
    }
})

describe('Step 10 · import paths are subpath-stable', () => {
    it('every stable component uses a real subpath importCode', () => {
        const pkg = JSON.parse(
            readFileSync(`${root}/packages/ui/package.json`, 'utf8'),
        ) as { exports: Record<string, unknown> }
        const exported = new Set(
            Object.keys(pkg.exports)
                .filter(k => k !== '.' && !k.endsWith('.css'))
                .map(k => k.replace('./', '')),
        )

        const offenders: string[] = []
        for (const slug of slugs) {
            const dir = `${componentsDir}/${slug}`
            if (!statSync(dir).isDirectory()) continue
            const docsFile = readdirSync(dir).find((f: string) => f.endsWith('.docs.tsx'))
            if (!docsFile) continue
            const text = readFileSync(`${dir}/${docsFile}`, 'utf8')
            const match = text.match(/importCode:\s*(["'`])([\s\S]*?)\1/)
            if (!match) continue
            const importStr = match[2]!.trim()
            const submatch = importStr.match(/@monority\/ui\/([a-z0-9-]+)/)
            if (submatch && !exported.has(submatch[1]!)) {
                offenders.push(`${slug}: subpath ${submatch[1]} not exported`)
            }
        }
        expect(offenders, 'subpath import issues').toEqual([])
    })
})
