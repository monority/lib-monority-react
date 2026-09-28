import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test, type Page } from '@playwright/test'

/**
 * Autonomie des composants : aucun composant public ne doit dépendre de
 * `@monority/ui/reset.css`.
 *
 * Le test charge chaque page de documentation (un composant public par page)
 * puis la recharge en retirant du CSS servi les resets **globaux d'éléments**
 * (`* { box-sizing }`, `button,input,textarea,select { font: inherit }`,
 * marges des titres/paragraphes). Les règles de page (`html`, `body`, images
 * globales) restent : ce sont les seules conservées par reset.css.
 *
 * Les styles calculés (box-sizing, police, marges) doivent être identiques
 * dans les deux cas.
 */
const REGISTRY = resolve(process.cwd(), 'src/docs/components/registry.ts')
const slugs = [...readFileSync(REGISTRY, 'utf8').matchAll(/slug: '([^']+)'/g)].map((m) => m[1])

const PROPS = [
    'box-sizing',
    'font-family',
    'font-size',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
] as const

/** Propriétés qui doivent aussi être fournies aux descendants (contenu de l'hôte). */
const SHARED_PROPS = ['box-sizing', 'font-family', 'font-size'] as const

/** Sélecteurs des resets globaux d'éléments à retirer pour simuler l'absence de reset.css. */
const GLOBAL_RESETS = new Set([
    '*,*::before,*::after',
    'button,input,textarea,select',
    'h1,h2,h3,h4,h5,h6,p,ul,ol,dl,blockquote',
])

const normalizeSelector = (selector: string) =>
    selector
        .replace(/\s+/g, '')
        // le minifieur écrit `:before` / `:after`
        .replace(/:before/g, '::before')
        .replace(/:after/g, '::after')

/** Retire du CSS les règles dont le sélecteur est un reset global d'éléments (y compris dans les blocs `@layer`). */
function stripGlobalElementResets(css: string): string {
    let out = ''
    let i = 0
    while (i < css.length) {
        const open = css.indexOf('{', i)
        if (open === -1) {
            out += css.slice(i)
            break
        }
        const selector = css.slice(i, open)
        let depth = 0
        let end = open
        for (; end < css.length; end++) {
            if (css[end] === '{') depth++
            else if (css[end] === '}') {
                depth--
                if (depth === 0) break
            }
        }
        const normalized = normalizeSelector(selector)
        const body = css.slice(open + 1, end)
        if (normalized.startsWith('@')) {
            out += `${selector}{${stripGlobalElementResets(body)}}`
        } else if (!GLOBAL_RESETS.has(normalized)) {
            out += `${selector}{${body}}`
        }
        i = end + 1
    }
    return out
}

async function collectStyles(page: Page, url: string, withoutReset: boolean) {
    if (withoutReset) {
        await page.route('**/*.css', async (route) => {
            const response = await route.fetch()
            const body = await response.text()
            await route.fulfill({ response, body: stripGlobalElementResets(body) })
        })
    }
    await page.goto(url)
    await page.waitForSelector('.docs-preview-area [class*="mr-"]')
    const styles = await page.evaluate(
        (props: string[]) => {
            const scopes = Array.from(
                document.querySelectorAll('.docs-preview-area, .docs-example-content')
            )
            const roots = scopes.flatMap((scope) =>
                Array.from(scope.querySelectorAll('[class*="mr-"]')).concat(
                    scope.matches('[class*="mr-"]') ? [scope] : []
                )
            )
            const all = new Set<Element>()
            for (const root of roots) {
                all.add(root)
                for (const child of root.querySelectorAll('*')) all.add(child)
            }
            const elements = Array.from(all).sort((a, b) =>
                a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
            )
            const read = () =>
                Object.fromEntries(
                    elements.map((element, index) => {
                        const computed = getComputedStyle(element)
                        return [
                            `${index}|${element.tagName}|${element.className}`,
                            Object.fromEntries(
                                props.map((prop) => [prop, computed.getPropertyValue(prop)])
                            ),
                        ]
                    })
                )
            return read()
        },
        PROPS as unknown as string[]
    )
    if (withoutReset) await page.unroute('**/*.css')
    return styles
}

test.beforeEach(({}, testInfo) => {
    test.skip(
        testInfo.project.name !== 'desktop',
        'comparaison de styles calculés : desktop uniquement'
    )
})

for (const slug of slugs) {
    test(`/docs/${slug} — identique sans reset.css`, async ({ page }) => {
        const url = `/docs/${slug}`
        const withReset = await collectStyles(page, url, false)
        const withoutReset = await collectStyles(page, url, true)

        const gaps: string[] = []
        for (const [key, properties] of Object.entries(withReset)) {
            const other = withoutReset[key]
            if (!other) {
                gaps.push(`${key}: élément absent sans reset`)
                continue
            }
            // Les marges du **contenu de l'hôte** (un `<p>` rendu dans un
            // `Section`…) appartiennent au reset de page : elles ne sont
            // comparées que pour les éléments qui portent eux-mêmes une classe
            // `mr-` (voir `library-scope.spec.ts` pour le cas inverse).
            const props = key.includes('mr-') ? PROPS : SHARED_PROPS
            for (const prop of props) {
                if (properties[prop] !== other[prop]) {
                    gaps.push(`${key} ${prop}: "${properties[prop]}" → "${other[prop]}"`)
                }
            }
        }
        expect(gaps, `écarts sans reset.css sur ${url} :\n${gaps.join('\n')}`).toEqual([])
    })
}
