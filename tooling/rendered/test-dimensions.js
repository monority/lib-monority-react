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

    // 3. Alignement vertical rigoureux Button et Input (inline et flex)
    const pageAlign = await browser.newPage()
    await pageAlign.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body style="font-family: sans-serif; padding: 20px;">
            <div id="inline-sm">
              <input class="mr-input" data-size="sm" value="Input sm" style="display: inline-block; width: 120px;" />
              <button class="mr-btn" data-size="sm">Btn sm</button>
            </div>
            <div id="inline-md">
              <input class="mr-input" data-size="md" value="Input md" style="display: inline-block; width: 120px;" />
              <button class="mr-btn" data-size="md">Btn md</button>
            </div>
            <div id="inline-lg">
              <input class="mr-input" data-size="lg" value="Input lg" style="display: inline-block; width: 120px;" />
              <button class="mr-btn" data-size="lg">Btn lg</button>
            </div>
            <div id="flex-sm" style="display: flex; gap: 8px; align-items: stretch;">
              <input class="mr-input" data-size="sm" value="Input sm" style="width: 120px;" />
              <button class="mr-btn" data-size="sm">Btn sm</button>
            </div>
            <div id="flex-md" style="display: flex; gap: 8px; align-items: stretch;">
              <input class="mr-input" data-size="md" value="Input md" style="width: 120px;" />
              <button class="mr-btn" data-size="md">Btn md</button>
            </div>
            <div id="flex-lg" style="display: flex; gap: 8px; align-items: stretch;">
              <input class="mr-input" data-size="lg" value="Input lg" style="width: 120px;" />
              <button class="mr-btn" data-size="lg">Btn lg</button>
            </div>
          </body>
        </html>
    `)
    const alignMetrics = await pageAlign.evaluate(() => {
        const check = (id) => {
            const container = document.getElementById(id)
            const inp = container.querySelector('input')
            const btn = container.querySelector('button')
            const rInp = inp.getBoundingClientRect()
            const rBtn = btn.getBoundingClientRect()
            return {
                diffTop: Math.abs(rInp.top - rBtn.top),
                diffH: Math.abs(rInp.height - rBtn.height),
                inpH: rInp.height,
                btnH: rBtn.height,
            }
        }
        return {
            inlineSm: check('inline-sm'),
            inlineMd: check('inline-md'),
            inlineLg: check('inline-lg'),
            flexSm: check('flex-sm'),
            flexMd: check('flex-md'),
            flexLg: check('flex-lg'),
        }
    })
    await pageAlign.close()

    assert.strictEqual(
        alignMetrics.inlineSm.diffTop,
        0,
        `Alignement inline sm en echec (delta top: ${alignMetrics.inlineSm.diffTop})`
    )
    assert.strictEqual(
        alignMetrics.inlineMd.diffTop,
        0,
        `Alignement inline md en echec (delta top: ${alignMetrics.inlineMd.diffTop})`
    )
    assert.strictEqual(
        alignMetrics.inlineLg.diffTop,
        0,
        `Alignement inline lg en echec (delta top: ${alignMetrics.inlineLg.diffTop})`
    )
    assert.strictEqual(
        alignMetrics.flexSm.diffTop,
        0,
        `Alignement flex sm en echec (delta top: ${alignMetrics.flexSm.diffTop})`
    )
    assert.strictEqual(
        alignMetrics.flexMd.diffTop,
        0,
        `Alignement flex md en echec (delta top: ${alignMetrics.flexMd.diffTop})`
    )
    assert.strictEqual(
        alignMetrics.flexLg.diffTop,
        0,
        `Alignement flex lg en echec (delta top: ${alignMetrics.flexLg.diffTop})`
    )
    console.log(
        'OK: Alignement vertical Button/Input confirme (delta top 0px en inline et flex sur sm, md, lg).'
    )

    // 4. Verification Button fullWidth + iconOnly et carres iconOnly
    const pageIconAndFw = await browser.newPage()
    await pageIconAndFw.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body style="padding: 20px;">
            <div style="width: 360px;" id="fw-container">
              <button class="mr-btn" data-full-width data-icon-only id="btn-fw-icon"><span class="mr-btn__icon">★</span></button>
            </div>
            <button class="mr-btn" data-icon-only data-size="sm" id="btn-icon-sm"><span class="mr-btn__icon">★</span></button>
            <button class="mr-btn" data-icon-only data-size="md" id="btn-icon-md"><span class="mr-btn__icon">★</span></button>
            <button class="mr-btn" data-icon-only data-size="lg" id="btn-icon-lg"><span class="mr-btn__icon">★</span></button>
          </body>
        </html>
    `)
    const iconMetrics = await pageIconAndFw.evaluate(() => {
        const getBox = (id) => {
            const el = document.getElementById(id)
            const r = el.getBoundingClientRect()
            const s = window.getComputedStyle(el)
            return { w: r.width, h: r.height, display: s.display }
        }
        return {
            fwIcon: getBox('btn-fw-icon'),
            iconSm: getBox('btn-icon-sm'),
            iconMd: getBox('btn-icon-md'),
            iconLg: getBox('btn-icon-lg'),
        }
    })
    await pageIconAndFw.close()

    assert.strictEqual(
        iconMetrics.fwIcon.w,
        360,
        `Button fullWidth iconOnly attendu a 360px, obtenu: ${iconMetrics.fwIcon.w}px`
    )
    assert.strictEqual(
        iconMetrics.fwIcon.display,
        'flex',
        `Button fullWidth doit avoir display: flex, obtenu: ${iconMetrics.fwIcon.display}`
    )
    assert.strictEqual(
        iconMetrics.iconSm.w,
        28,
        `Button iconOnly sm largeur attendue a 28px, obtenu: ${iconMetrics.iconSm.w}px`
    )
    assert.strictEqual(
        iconMetrics.iconSm.h,
        28,
        `Button iconOnly sm hauteur attendue a 28px, obtenu: ${iconMetrics.iconSm.h}px`
    )
    assert.strictEqual(
        iconMetrics.iconMd.w,
        32,
        `Button iconOnly md largeur attendue a 32px, obtenu: ${iconMetrics.iconMd.w}px`
    )
    assert.strictEqual(
        iconMetrics.iconMd.h,
        32,
        `Button iconOnly md hauteur attendue a 32px, obtenu: ${iconMetrics.iconMd.h}px`
    )
    assert.strictEqual(
        iconMetrics.iconLg.w,
        40,
        `Button iconOnly lg largeur attendue a 40px, obtenu: ${iconMetrics.iconLg.w}px`
    )
    assert.strictEqual(
        iconMetrics.iconLg.h,
        40,
        `Button iconOnly lg hauteur attendue a 40px, obtenu: ${iconMetrics.iconLg.h}px`
    )
    console.log(
        'OK: Dimensions Button fullWidth + iconOnly (100%) et iconOnly (carres 28/32/40px) conformes.'
    )

    // 5. Verification etat loading de Button (centrage du spinner et masquage du contenu)
    const pageLoading = await browser.newPage()
    await pageLoading.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body style="padding: 20px;">
            <button class="mr-btn" data-loading id="btn-loading"><span class="mr-btn__label">Texte</span></button>
            <button class="mr-btn" data-loading data-icon-only id="btn-loading-icon"><span class="mr-btn__icon">★</span></button>
          </body>
        </html>
    `)
    const loadMetrics = await pageLoading.evaluate(() => {
        const checkLoading = (id) => {
            const el = document.getElementById(id)
            const s = window.getComputedStyle(el)
            const after = window.getComputedStyle(el, '::after')
            const child = el.firstElementChild
            const childStyle = child ? window.getComputedStyle(child) : null
            return {
                cursor: s.cursor,
                childOpacity: childStyle ? childStyle.opacity : null,
                afterContent: after.content,
                afterAnimation: after.animationName,
                afterW: after.width,
                afterH: after.height,
                afterPosition: after.position,
            }
        }
        return {
            textBtn: checkLoading('btn-loading'),
            iconBtn: checkLoading('btn-loading-icon'),
        }
    })
    await pageLoading.close()

    assert.strictEqual(loadMetrics.textBtn.cursor, 'progress', 'Curseur attendu en progress')
    assert.strictEqual(loadMetrics.textBtn.childOpacity, '0', 'Contenu texte attendu en opacity: 0')
    assert.strictEqual(loadMetrics.iconBtn.childOpacity, '0', 'Contenu icone attendu en opacity: 0')
    assert.strictEqual(loadMetrics.textBtn.afterContent, '""', 'Spinner ::after attendu')
    assert.strictEqual(
        loadMetrics.textBtn.afterAnimation,
        'mr-spin',
        'Animation de spinner mr-spin attendue'
    )
    assert.strictEqual(
        loadMetrics.textBtn.afterPosition,
        'absolute',
        'Positionnement absolu attendu pour le spinner'
    )
    console.log(
        'OK: Etat loading de Button conforme (spinner centre, animation active, contenu masque).'
    )

    // 6. Verification Input with icon et Input with password
    const pageInputIcons = await browser.newPage()
    await pageInputIcons.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body style="padding: 20px;">
            <div class="mr-input__wrapper" data-size="sm" id="wrap-lead-sm">
              <span class="mr-input__icon mr-input__icon--leading" id="icon-lead-sm"><svg viewBox="0 0 20 20"></svg></span>
              <input class="mr-input" data-size="sm" data-has-leading-icon id="input-lead-sm" value="sm" />
            </div>
            <div class="mr-input__wrapper" data-size="md" id="wrap-lead-md">
              <span class="mr-input__icon mr-input__icon--leading" id="icon-lead-md"><svg viewBox="0 0 20 20"></svg></span>
              <input class="mr-input" data-size="md" data-has-leading-icon id="input-lead-md" value="md" />
            </div>
            <div class="mr-input__wrapper" data-size="lg" id="wrap-lead-lg">
              <span class="mr-input__icon mr-input__icon--leading" id="icon-lead-lg"><svg viewBox="0 0 20 20"></svg></span>
              <input class="mr-input" data-size="lg" data-has-leading-icon id="input-lead-lg" value="lg" />
            </div>
            <div class="mr-input__wrapper" data-size="md" id="wrap-both-md">
              <span class="mr-input__icon mr-input__icon--leading"><svg viewBox="0 0 20 20"></svg></span>
              <input class="mr-input" data-size="md" data-has-leading-icon data-has-trailing-icon id="input-both-md" value="both" />
              <span class="mr-input__icon mr-input__icon--trailing"><svg viewBox="0 0 20 20"></svg></span>
            </div>
            <div class="mr-password-input__wrapper" data-size="sm" id="wrap-pwd-sm">
              <input class="mr-password-input" data-size="sm" data-has-trailing-icon id="input-pwd-sm" type="password" value="secret" />
              <button type="button" class="mr-password-input__toggle" id="toggle-pwd-sm"><svg viewBox="0 0 20 20"></svg></button>
            </div>
            <div class="mr-password-input__wrapper" data-size="md" id="wrap-pwd-md">
              <input class="mr-password-input" data-size="md" data-has-trailing-icon id="input-pwd-md" type="password" value="secret" />
              <button type="button" class="mr-password-input__toggle" id="toggle-pwd-md"><svg viewBox="0 0 20 20"></svg></button>
            </div>
            <div class="mr-password-input__wrapper" data-size="lg" id="wrap-pwd-lg">
              <input class="mr-password-input" data-size="lg" data-has-trailing-icon id="input-pwd-lg" type="password" value="secret" />
              <button type="button" class="mr-password-input__toggle" id="toggle-pwd-lg"><svg viewBox="0 0 20 20"></svg></button>
            </div>
          </body>
        </html>
    `)

    const iconAndPwdMetrics = await pageInputIcons.evaluate(() => {
        const getMetrics = (id) => {
            const el = document.getElementById(id)
            const r = el.getBoundingClientRect()
            const s = window.getComputedStyle(el)
            return {
                h: r.height,
                w: r.width,
                paddingLeft: Number.parseFloat(s.paddingLeft),
                paddingRight: Number.parseFloat(s.paddingRight),
                cursor: s.cursor,
                position: s.position,
            }
        }
        return {
            leadSm: getMetrics('input-lead-sm'),
            leadMd: getMetrics('input-lead-md'),
            leadLg: getMetrics('input-lead-lg'),
            bothMd: getMetrics('input-both-md'),
            pwdSm: getMetrics('input-pwd-sm'),
            pwdMd: getMetrics('input-pwd-md'),
            pwdLg: getMetrics('input-pwd-lg'),
            toggleMd: getMetrics('toggle-pwd-md'),
        }
    })
    await pageInputIcons.close()

    assert.strictEqual(
        iconAndPwdMetrics.leadSm.paddingLeft,
        36,
        `Input avec icone sm padding-left attendu a 36px, obtenu: ${iconAndPwdMetrics.leadSm.paddingLeft}px`
    )
    assert.strictEqual(
        iconAndPwdMetrics.leadMd.paddingLeft,
        40,
        `Input avec icone md padding-left attendu a 40px, obtenu: ${iconAndPwdMetrics.leadMd.paddingLeft}px`
    )
    assert.strictEqual(
        iconAndPwdMetrics.leadLg.paddingLeft,
        48,
        `Input avec icone lg padding-left attendu a 48px, obtenu: ${iconAndPwdMetrics.leadLg.paddingLeft}px`
    )
    assert.strictEqual(
        iconAndPwdMetrics.bothMd.paddingLeft,
        40,
        `Input avec deux icones padding-left attendu a 40px, obtenu: ${iconAndPwdMetrics.bothMd.paddingLeft}px`
    )
    assert.strictEqual(
        iconAndPwdMetrics.bothMd.paddingRight,
        40,
        `Input avec deux icones padding-right attendu a 40px, obtenu: ${iconAndPwdMetrics.bothMd.paddingRight}px`
    )

    assert.strictEqual(
        iconAndPwdMetrics.pwdSm.h,
        28,
        `PasswordInput sm hauteur attendue a 28px, obtenu: ${iconAndPwdMetrics.pwdSm.h}px`
    )
    assert.strictEqual(
        iconAndPwdMetrics.pwdSm.paddingRight,
        36,
        `PasswordInput sm padding-right attendu a 36px, obtenu: ${iconAndPwdMetrics.pwdSm.paddingRight}px`
    )
    assert.strictEqual(
        iconAndPwdMetrics.pwdMd.h,
        32,
        `PasswordInput md hauteur attendue a 32px, obtenu: ${iconAndPwdMetrics.pwdMd.h}px`
    )
    assert.strictEqual(
        iconAndPwdMetrics.pwdMd.paddingRight,
        40,
        `PasswordInput md padding-right attendu a 40px, obtenu: ${iconAndPwdMetrics.pwdMd.paddingRight}px`
    )
    assert.strictEqual(
        iconAndPwdMetrics.pwdLg.h,
        40,
        `PasswordInput lg hauteur attendue a 40px, obtenu: ${iconAndPwdMetrics.pwdLg.h}px`
    )
    assert.strictEqual(
        iconAndPwdMetrics.pwdLg.paddingRight,
        48,
        `PasswordInput lg padding-right attendu a 48px, obtenu: ${iconAndPwdMetrics.pwdLg.paddingRight}px`
    )

    assert.strictEqual(
        iconAndPwdMetrics.toggleMd.cursor,
        'pointer',
        `Toggle mot de passe curseur attendu en pointer, obtenu: ${iconAndPwdMetrics.toggleMd.cursor}`
    )
    assert.strictEqual(
        iconAndPwdMetrics.toggleMd.position,
        'absolute',
        `Toggle mot de passe position attendue en absolute, obtenu: ${iconAndPwdMetrics.toggleMd.position}`
    )
    console.log(
        'OK: Input with icon et Input with password conformes (paddings 36/40/48px, hauteurs 28/32/40px, toggle interactif).'
    )

    // 7. Dimensions et proprietes du composant Textarea
    const pageTextarea = await browser.newPage()
    await pageTextarea.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body>
            <textarea class="mr-textarea" data-size="sm" id="ta-sm">sm</textarea>
            <textarea class="mr-textarea" data-size="md" id="ta-md">md</textarea>
            <textarea class="mr-textarea" data-size="lg" id="ta-lg">lg</textarea>
            <textarea class="mr-textarea" data-resize="none" id="ta-none">none</textarea>
            <textarea class="mr-textarea" data-resize="vertical" id="ta-vert">vert</textarea>
            <textarea class="mr-textarea" data-resize="both" id="ta-both">both</textarea>
            <span class="mr-textarea__counter" id="ta-counter">12 / 100</span>
          </body>
        </html>
    `)

    const taMetrics = await pageTextarea.evaluate(() => {
        const getStyle = (id) => window.getComputedStyle(document.getElementById(id))
        const getRect = (id) => document.getElementById(id).getBoundingClientRect()
        return {
            sm: {
                minHeight: parseFloat(getStyle('ta-sm').minHeight),
                paddingTop: parseFloat(getStyle('ta-sm').paddingTop),
                paddingBottom: parseFloat(getStyle('ta-sm').paddingBottom),
                paddingLeft: parseFloat(getStyle('ta-sm').paddingLeft),
                paddingRight: parseFloat(getStyle('ta-sm').paddingRight),
                height: getRect('ta-sm').height,
            },
            md: {
                minHeight: parseFloat(getStyle('ta-md').minHeight),
                paddingTop: parseFloat(getStyle('ta-md').paddingTop),
                paddingBottom: parseFloat(getStyle('ta-md').paddingBottom),
                paddingLeft: parseFloat(getStyle('ta-md').paddingLeft),
                paddingRight: parseFloat(getStyle('ta-md').paddingRight),
                height: getRect('ta-md').height,
            },
            lg: {
                minHeight: parseFloat(getStyle('ta-lg').minHeight),
                paddingTop: parseFloat(getStyle('ta-lg').paddingTop),
                paddingBottom: parseFloat(getStyle('ta-lg').paddingBottom),
                paddingLeft: parseFloat(getStyle('ta-lg').paddingLeft),
                paddingRight: parseFloat(getStyle('ta-lg').paddingRight),
                height: getRect('ta-lg').height,
            },
            resizeNone: getStyle('ta-none').resize,
            resizeVert: getStyle('ta-vert').resize,
            resizeBoth: getStyle('ta-both').resize,
            counter: {
                fontSize: parseFloat(getStyle('ta-counter').fontSize),
                marginTop: parseFloat(getStyle('ta-counter').marginTop),
            },
        }
    })
    await pageTextarea.close()

    assert.strictEqual(
        taMetrics.sm.minHeight,
        80,
        `Textarea sm min-height attendu a 80px, obtenu: ${taMetrics.sm.minHeight}px`
    )
    assert.strictEqual(
        taMetrics.md.minHeight,
        80,
        `Textarea md min-height attendu a 80px, obtenu: ${taMetrics.md.minHeight}px`
    )
    assert.strictEqual(
        taMetrics.lg.minHeight,
        80,
        `Textarea lg min-height attendu a 80px, obtenu: ${taMetrics.lg.minHeight}px`
    )
    assert.strictEqual(
        taMetrics.md.paddingTop,
        8,
        `Textarea padding-top attendu a 8px, obtenu: ${taMetrics.md.paddingTop}px`
    )
    assert.strictEqual(
        taMetrics.md.paddingBottom,
        8,
        `Textarea padding-bottom attendu a 8px, obtenu: ${taMetrics.md.paddingBottom}px`
    )
    assert.strictEqual(
        taMetrics.sm.paddingLeft,
        12,
        `Textarea sm padding-left attendu a 12px, obtenu: ${taMetrics.sm.paddingLeft}px`
    )
    assert.strictEqual(
        taMetrics.md.paddingLeft,
        16,
        `Textarea md padding-left attendu a 16px, obtenu: ${taMetrics.md.paddingLeft}px`
    )
    assert.strictEqual(
        taMetrics.lg.paddingLeft,
        20,
        `Textarea lg padding-left attendu a 20px, obtenu: ${taMetrics.lg.paddingLeft}px`
    )
    assert.strictEqual(
        taMetrics.resizeNone,
        'none',
        `Textarea data-resize="none" attendu en none, obtenu: ${taMetrics.resizeNone}`
    )
    assert.strictEqual(
        taMetrics.resizeVert,
        'vertical',
        `Textarea data-resize="vertical" attendu en vertical, obtenu: ${taMetrics.resizeVert}`
    )
    assert.strictEqual(
        taMetrics.resizeBoth,
        'vertical',
        `Textarea data-resize="both" doit etre restreint a vertical, obtenu: ${taMetrics.resizeBoth}`
    )
    assert.strictEqual(
        taMetrics.counter.fontSize,
        12,
        `Textarea counter font-size attendu a 12px (sm), obtenu: ${taMetrics.counter.fontSize}px`
    )
    assert.strictEqual(
        taMetrics.counter.marginTop,
        8,
        `Textarea counter margin-top attendu a 8px (space-2), obtenu: ${taMetrics.counter.marginTop}px`
    )

    console.log(
        'OK: Textarea conforme (min-height: 80px, padding-block: 8px, padding-inline: 12/16/20px, resize controle).'
    )
}
