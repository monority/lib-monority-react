import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { ROOT } from './common.js'

export async function testControlDimensions(browser) {
    console.log("\nVerification de l'echelle racine et des dimensions de controles (ADR-025)...")

    const distCssPath = path.join(ROOT, 'packages/ui/dist/index.css')
    assert(fs.existsSync(distCssPath), 'dist/index.css doit exister pour les tests de dimensions')
    const distCss = fs.readFileSync(distCssPath, 'utf8')

    // 1. Fixture negative racine 14px vs test reel data-theme="light"
    const pageNegThemed = await browser.newPage()
    await pageNegThemed.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>:root { font-size: 14px; }</style></head>
          <body></body>
        </html>
    `)
    const badThemedFs = await pageNegThemed.$eval(
        'html',
        (el) => window.getComputedStyle(el).fontSize
    )
    assert.strictEqual(
        badThemedFs,
        '14px',
        'La fixture negative doit detecter la racine abaissee a 14px'
    )
    await pageNegThemed.close()
    console.log('OK: Fixture negative echelle racine reussie (racine fautive a 14px detectee).')

    // Page avec data-theme="light" sur html : documentElement a 16px, jamais 14px
    const pageThemed = await browser.newPage()
    await pageThemed.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body>
            <button class="mr-btn" data-size="sm" id="btn-sm">sm</button>
            <button class="mr-btn" data-size="md" id="btn-md">md</button>
            <button class="mr-btn" data-size="lg" id="btn-lg">lg</button>
            <input class="mr-input" data-size="sm" id="input-sm" value="sm" />
            <input class="mr-input" data-size="md" id="input-md" value="md" />
            <input class="mr-input" data-size="lg" id="input-lg" value="lg" />
          </body>
        </html>
    `)
    const themedRootFs = await pageThemed.$eval(
        'html',
        (el) => window.getComputedStyle(el).fontSize
    )
    assert.strictEqual(
        themedRootFs,
        '16px',
        `La taille racine sous data-theme="light" doit etre 16px, obtenu: ${themedRootFs}`
    )
    assert.notStrictEqual(
        themedRootFs,
        '14px',
        'La taille racine ne doit jamais etre abaissee a 14px'
    )

    // 2. Fixture negative hauteurs de controles vs test reel 28/32/40 px
    const pageNegHeights = await browser.newPage()
    await pageNegHeights.setContent(`
        <!DOCTYPE html>
        <html style="font-size: 14px;">
          <head><style>${distCss}</style></head>
          <body>
            <button class="mr-btn" data-size="sm" id="btn-bad">sm</button>
          </body>
        </html>
    `)
    const badBtnH = await pageNegHeights.$eval(
        '#btn-bad',
        (el) => el.getBoundingClientRect().height
    )
    assert.strictEqual(
        badBtnH,
        24.5,
        'La fixture negative doit detecter le bouton sm reduit a 24.5px sous racine 14px'
    )
    await pageNegHeights.close()
    console.log(
        'OK: Fixture negative hauteurs reussie (hauteur reduite a 24.5px detectee sous racine 14px).'
    )

    // Hauteurs de controles a la racine par defaut (16px), sans surcharge : Button et Input sm=28, md=32, lg=40
    const cHeights = await pageThemed.evaluate(() => {
        const getH = (id) => document.getElementById(id).getBoundingClientRect().height
        return {
            btnSm: getH('btn-sm'),
            btnMd: getH('btn-md'),
            btnLg: getH('btn-lg'),
            inputSm: getH('input-sm'),
            inputMd: getH('input-md'),
            inputLg: getH('input-lg'),
        }
    })
    await pageThemed.close()

    assert.strictEqual(cHeights.btnSm, 28, `Button sm attendu a 28px, obtenu: ${cHeights.btnSm}px`)
    assert.strictEqual(cHeights.btnMd, 32, `Button md attendu a 32px, obtenu: ${cHeights.btnMd}px`)
    assert.strictEqual(cHeights.btnLg, 40, `Button lg attendu a 40px, obtenu: ${cHeights.btnLg}px`)
    assert.strictEqual(
        cHeights.inputSm,
        28,
        `Input sm attendu a 28px, obtenu: ${cHeights.inputSm}px`
    )
    assert.strictEqual(
        cHeights.inputMd,
        32,
        `Input md attendu a 32px, obtenu: ${cHeights.inputMd}px`
    )
    assert.strictEqual(
        cHeights.inputLg,
        40,
        `Input lg attendu a 40px, obtenu: ${cHeights.inputLg}px`
    )
    console.log(
        `OK: Hauteurs de controles conformes sans surcharge (Button: 28/32/40px, Input: 28/32/40px, racine: 16px).`
    )
}
