import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { ROOT } from './common.js'

export async function testHostIsolation(browser) {
    console.log("\nVerification de la non-imposition a l'hote (ADR-025)...")

    const distCssPath = path.join(ROOT, 'packages/ui/dist/index.css')
    assert(
        fs.existsSync(distCssPath),
        "dist/index.css doit exister pour les tests d'imposition a l'hote"
    )
    const distCss = fs.readFileSync(distCssPath, 'utf8')

    // 1. Fixture negative : verification qu'une regle fautive sur :root est bien detectee
    const pageNeg = await browser.newPage()
    await pageNeg.setContent(`
        <!DOCTYPE html><html><body><p id="p">Texte</p></body></html>
    `)
    await pageNeg.addStyleTag({
        content: ':root { font-size: 14px; color: oklch(0.22 0 215); }',
    })
    const negFs = await pageNeg.$eval('html', (el) => window.getComputedStyle(el).fontSize)
    const negColor = await pageNeg.$eval('#p', (el) => window.getComputedStyle(el).color)
    assert(
        negFs === '14px' && negColor !== 'rgb(0, 0, 0)',
        "La fixture negative doit detecter l'imposition fautive sur :root"
    )
    await pageNeg.close()
    console.log("OK: Fixture negative d'imposition reussie (regle fautive sur :root detectee).")

    // 2. Page sans data-theme : aucune difference entre page nue et page avec le CSS publie
    const pageBare = await browser.newPage()
    const pageWithLib = await browser.newPage()
    const bareHtml = `
        <!DOCTYPE html>
        <html>
          <head></head>
          <body>
            <p id="p">Paragraph</p>
            <h1 id="h1">Heading</h1>
            <ul id="ul"><li>List</li></ul>
            <a id="a" href="#">Link</a>
            <button id="button">Button</button>
            <input id="input" />
            <table id="table"><tr><td>Cell</td></tr></table>
            <label id="label" for="input">Label</label>
            <textarea id="textarea"></textarea>
            <select id="select"><option>Option</option></select>
          </body>
        </html>
    `
    await pageBare.setContent(bareHtml)
    await pageWithLib.setContent(bareHtml)
    await pageWithLib.addStyleTag({ content: distCss })

    const probeElements = [
        'html',
        'body',
        '#p',
        '#h1',
        '#ul',
        '#a',
        '#button',
        '#input',
        '#table',
        '#label',
        '#textarea',
        '#select',
    ]

    let hostDiffCount = 0
    const hostDiffDetails = []
    for (const sel of probeElements) {
        const getComputedAllProps = (selector) => {
            const el =
                selector === 'html'
                    ? document.documentElement
                    : selector === 'body'
                      ? document.body
                      : document.querySelector(selector)
            const cs = window.getComputedStyle(el)
            const res = {}
            for (let i = 0; i < cs.length; i++) {
                const prop = cs[i]
                res[prop] = cs.getPropertyValue(prop)
            }
            return res
        }

        const csBare = await pageBare.evaluate(getComputedAllProps, sel)
        const csLib = await pageWithLib.evaluate(getComputedAllProps, sel)

        for (const p in csBare) {
            if (csBare[p] !== csLib[p]) {
                hostDiffCount++
                hostDiffDetails.push({
                    element: sel,
                    property: p,
                    bare: csBare[p],
                    lib: csLib[p],
                })
            }
        }
    }

    // Verification du focus nu : outline calcule d'un lien, d'un bouton et d'un champ nu apres focus
    for (const id of ['#a', '#button', '#input']) {
        await pageBare.focus(id)
        await pageWithLib.focus(id)
        const bareOutline = await pageBare.$eval(id, (el) => window.getComputedStyle(el).outline)
        const libOutline = await pageWithLib.$eval(id, (el) => window.getComputedStyle(el).outline)
        if (bareOutline !== libOutline) {
            hostDiffCount++
            hostDiffDetails.push({
                element: id,
                property: 'outline-on-focus',
                bare: bareOutline,
                lib: libOutline,
            })
        }
    }

    await pageBare.close()
    await pageWithLib.close()
    assert.strictEqual(
        hostDiffCount,
        0,
        `Le CSS publie ne doit imposer aucun style sur une page sans data-theme (trouve ${hostDiffCount} differences: ${JSON.stringify(hostDiffDetails)})`
    )
    console.log(
        "OK: Non-imposition a l'hote confirmee (0 difference sur toutes les proprietes calculees de 12 elements nus et focus)."
    )
}
