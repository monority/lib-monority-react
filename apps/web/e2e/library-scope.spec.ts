import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from '@playwright/test'

/**
 * Portée de `library-scope.css`.
 *
 * Le contenu fourni par l'hôte (paragraphes, listes) rendu **dans** un
 * composant de la librairie doit garder ses marges par défaut : la librairie ne
 * remet à zéro que les éléments qui portent eux-mêmes une classe `mr-`. Le
 * `box-sizing` peut, lui, être hérité par les descendants.
 */
const libraryCss = readFileSync(
    resolve(process.cwd(), '..', '..', 'packages/ui/dist/index.css'),
    'utf8'
)

const HOST_CONTENT = `
    <p data-testid="host-p">Texte de l'hôte</p>
    <ul data-testid="host-ul"><li>Item</li></ul>
`

const FIXTURE = `<!doctype html><html><head><style>${libraryCss}</style></head><body>
    <div class="mr-container" data-testid="container">${HOST_CONTENT}</div>
    <div class="mr-card" data-testid="card">${HOST_CONTENT}</div>
    <p class="mr-text" data-testid="library-p">Texte de la librairie</p>
    <div class="mr-container">
        <p class="mr-text" data-testid="library-p-in-container">Texte de la librairie</p>
    </div>
    <div class="mr-card">
        <p class="mr-text" data-testid="library-p-in-card">Texte de la librairie</p>
    </div>
</body></html>`

interface Margins {
    marginTop: string
    marginBottom: string
    boxSizing: string
}

async function marginsOf(page: import('@playwright/test').Page, testId: string) {
    return page.evaluate((id) => {
        const element = document.querySelector(`[data-testid="${id}"]`)!
        const computed = getComputedStyle(element)
        return {
            marginTop: computed.marginTop,
            marginBottom: computed.marginBottom,
            boxSizing: computed.boxSizing,
        }
    }, testId)
}

test.beforeEach(async ({ page }) => {
    await page.setContent(FIXTURE)
})

test('le contenu de l’hôte garde ses marges dans Container et Card', async ({ page }) => {
    for (const testId of ['container', 'card']) {
        for (const tag of ['p', 'ul']) {
            const margins = (await marginsOf(page, `host-${tag}`)) as Margins
            expect(margins.marginTop, `${tag} de l'hôte dans .mr-${testId} : marge haute`).not.toBe(
                '0px'
            )
            expect(
                margins.marginBottom,
                `${tag} de l'hôte dans .mr-${testId} : marge basse`
            ).not.toBe('0px')
        }
    }
})

test('les éléments de la librairie restent à marge nulle', async ({ page }) => {
    for (const testId of ['library-p', 'library-p-in-container', 'library-p-in-card']) {
        const margins = (await marginsOf(page, testId)) as Margins
        expect(margins.marginTop, `${testId} : marge haute`).toBe('0px')
        expect(margins.marginBottom, `${testId} : marge basse`).toBe('0px')
    }
})

test('le contenu de l’hôte hérite du box-sizing de la librairie', async ({ page }) => {
    expect(((await marginsOf(page, 'host-p')) as Margins).boxSizing).toBe('border-box')
    expect(((await marginsOf(page, 'host-ul')) as Margins).boxSizing).toBe('border-box')
})
