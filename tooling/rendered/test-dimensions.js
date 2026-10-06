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

    // 12. Verification Select (hauteurs 28/32/40px, paddings-inline, appearance: none)
    const pageSelect = await browser.newPage()
    await pageSelect.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body style="margin: 0; padding: 20px;">
            <span class="mr-select-wrapper" data-size="sm" id="wrap-sm">
              <select class="mr-select" data-size="sm" id="sel-sm">
                <option value="1">Option 1</option>
              </select>
            </span>
            <span class="mr-select-wrapper" data-size="md" id="wrap-md">
              <select class="mr-select" data-size="md" id="sel-md">
                <option value="1">Option 1</option>
              </select>
            </span>
            <span class="mr-select-wrapper" data-size="lg" id="wrap-lg">
              <select class="mr-select" data-size="lg" id="sel-lg">
                <option value="1">Option 1</option>
              </select>
            </span>
          </body>
        </html>
    `)

    const selMetrics = await pageSelect.evaluate(() => {
        const getStyle = (id) => window.getComputedStyle(document.getElementById(id))
        const getRect = (id) => document.getElementById(id).getBoundingClientRect()
        return {
            sm: {
                height: getRect('sel-sm').height,
                paddingLeft: parseFloat(getStyle('sel-sm').paddingLeft),
                paddingRight: parseFloat(getStyle('sel-sm').paddingRight),
            },
            md: {
                height: getRect('sel-md').height,
                paddingLeft: parseFloat(getStyle('sel-md').paddingLeft),
                paddingRight: parseFloat(getStyle('sel-md').paddingRight),
                borderRadius: parseFloat(getStyle('sel-md').borderRadius),
                appearance: getStyle('sel-md').appearance,
            },
            lg: {
                height: getRect('sel-lg').height,
                paddingLeft: parseFloat(getStyle('sel-lg').paddingLeft),
                paddingRight: parseFloat(getStyle('sel-lg').paddingRight),
            },
        }
    })
    await pageSelect.close()

    assert.strictEqual(
        selMetrics.sm.height,
        28,
        `Select sm hauteur attendue a 28px, obtenu: ${selMetrics.sm.height}px`
    )
    assert.strictEqual(
        selMetrics.md.height,
        32,
        `Select md hauteur attendue a 32px, obtenu: ${selMetrics.md.height}px`
    )
    assert.strictEqual(
        selMetrics.lg.height,
        40,
        `Select lg hauteur attendue a 40px, obtenu: ${selMetrics.lg.height}px`
    )
    assert.strictEqual(
        selMetrics.sm.paddingLeft,
        12,
        `Select sm padding-left attendu a 12px, obtenu: ${selMetrics.sm.paddingLeft}px`
    )
    assert.strictEqual(
        selMetrics.md.paddingLeft,
        16,
        `Select md padding-left attendu a 16px, obtenu: ${selMetrics.md.paddingLeft}px`
    )
    assert.strictEqual(
        selMetrics.lg.paddingLeft,
        20,
        `Select lg padding-left attendu a 20px, obtenu: ${selMetrics.lg.paddingLeft}px`
    )
    assert.strictEqual(
        selMetrics.sm.paddingRight,
        36,
        `Select sm padding-right attendu a 36px, obtenu: ${selMetrics.sm.paddingRight}px`
    )
    assert.strictEqual(
        selMetrics.md.paddingRight,
        40,
        `Select md padding-right attendu a 40px, obtenu: ${selMetrics.md.paddingRight}px`
    )
    assert.strictEqual(
        selMetrics.lg.paddingRight,
        48,
        `Select lg padding-right attendu a 48px, obtenu: ${selMetrics.lg.paddingRight}px`
    )
    assert.strictEqual(
        selMetrics.md.borderRadius,
        6,
        `Select border-radius attendu a 6px, obtenu: ${selMetrics.md.borderRadius}px`
    )
    assert.strictEqual(
        selMetrics.md.appearance,
        'none',
        `Select appearance attendu a none, obtenu: ${selMetrics.md.appearance}`
    )

    console.log(
        'OK: Select conforme (hauteurs 28/32/40px, paddings 12/16/20px et 32/40/48px, appearance: none, radius: 6px).'
    )

    // Verification du composant Checkbox (boite 16px sm/md, 20px lg, radius 4px, min-target 24px)
    const pageCheckbox = await browser.newPage()
    await pageCheckbox.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body style="margin: 0; padding: 20px;">
            <label class="mr-checkbox" data-size="sm" id="cb-sm">
              <input type="checkbox" class="mr-checkbox__input" id="cb-input-sm" />
              <span class="mr-checkbox__control" id="cb-ctrl-sm"></span>
              <span class="mr-checkbox__label">Checkbox sm</span>
            </label>
            <label class="mr-checkbox" data-size="md" id="cb-md">
              <input type="checkbox" class="mr-checkbox__input" id="cb-input-md" />
              <span class="mr-checkbox__control" id="cb-ctrl-md"></span>
              <span class="mr-checkbox__label">Checkbox md</span>
            </label>
            <label class="mr-checkbox" data-size="lg" id="cb-lg">
              <input type="checkbox" class="mr-checkbox__input" id="cb-input-lg" />
              <span class="mr-checkbox__control" id="cb-ctrl-lg"></span>
              <span class="mr-checkbox__label">Checkbox lg</span>
            </label>
            <label class="mr-checkbox" data-checked id="cb-checked">
              <input type="checkbox" class="mr-checkbox__input" checked id="cb-input-checked" />
              <span class="mr-checkbox__control" id="cb-ctrl-checked"></span>
              <span class="mr-checkbox__label">Checkbox coché</span>
            </label>
          </body>
        </html>
    `)

    const cbMetrics = await pageCheckbox.evaluate(() => {
        const getStyle = (id) => window.getComputedStyle(document.getElementById(id))
        const getRect = (id) => document.getElementById(id).getBoundingClientRect()
        const getAfter = (id) => window.getComputedStyle(document.getElementById(id), '::after')
        return {
            sm: {
                width: getRect('cb-ctrl-sm').width,
                height: getRect('cb-ctrl-sm').height,
                rowHeight: getRect('cb-sm').height,
            },
            md: {
                width: getRect('cb-ctrl-md').width,
                height: getRect('cb-ctrl-md').height,
                borderRadius: parseFloat(getStyle('cb-ctrl-md').borderRadius),
                rowHeight: getRect('cb-md').height,
                gap: parseFloat(getStyle('cb-md').gap),
            },
            lg: {
                width: getRect('cb-ctrl-lg').width,
                height: getRect('cb-ctrl-lg').height,
            },
            input: {
                opacity: parseFloat(getStyle('cb-input-md').opacity),
                width: parseFloat(getStyle('cb-input-md').width),
                height: parseFloat(getStyle('cb-input-md').height),
            },
            checked: {
                afterOpacity: parseFloat(getAfter('cb-ctrl-checked').opacity),
            },
        }
    })
    await pageCheckbox.close()

    assert.strictEqual(
        cbMetrics.sm.width,
        16,
        `Checkbox sm box width attendue a 16px, obtenu: ${cbMetrics.sm.width}px`
    )
    assert.strictEqual(
        cbMetrics.sm.height,
        16,
        `Checkbox sm box height attendue a 16px, obtenu: ${cbMetrics.sm.height}px`
    )
    assert.strictEqual(
        cbMetrics.md.width,
        16,
        `Checkbox md box width attendue a 16px, obtenu: ${cbMetrics.md.width}px`
    )
    assert.strictEqual(
        cbMetrics.md.height,
        16,
        `Checkbox md box height attendue a 16px, obtenu: ${cbMetrics.md.height}px`
    )
    assert.strictEqual(
        cbMetrics.lg.width,
        20,
        `Checkbox lg box width attendue a 20px, obtenu: ${cbMetrics.lg.width}px`
    )
    assert.strictEqual(
        cbMetrics.lg.height,
        20,
        `Checkbox lg box height attendue a 20px, obtenu: ${cbMetrics.lg.height}px`
    )
    assert.strictEqual(
        cbMetrics.md.borderRadius,
        4,
        `Checkbox border-radius attendu a 4px, obtenu: ${cbMetrics.md.borderRadius}px`
    )
    assert(
        cbMetrics.md.rowHeight >= 24,
        `Checkbox row height attendue >= 24px, obtenu: ${cbMetrics.md.rowHeight}px`
    )
    assert.strictEqual(
        cbMetrics.md.gap,
        8,
        `Checkbox gap attendu a 8px, obtenu: ${cbMetrics.md.gap}px`
    )
    assert.strictEqual(
        cbMetrics.input.opacity,
        0,
        `Checkbox native input opacity attendue a 0, obtenu: ${cbMetrics.input.opacity}`
    )
    assert.strictEqual(
        cbMetrics.checked.afterOpacity,
        1,
        `Checkbox checked ::after opacity attendue a 1, obtenu: ${cbMetrics.checked.afterOpacity}`
    )

    console.log(
        'OK: Checkbox conforme (boîte 16px sm/md, 20px lg, radius 4px, row-height >= 24px, gap 8px, glyphe actif 1).'
    )

    // Verification du composant Switch (piste 36x20 sm, 44x24 md, 52x28 lg, pouce 16/20/24px)
    const pageSwitch = await browser.newPage()
    await pageSwitch.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body style="margin: 0; padding: 20px;">
            <div class="mr-switch__row" id="sw-row-sm">
              <label class="mr-switch" data-size="sm" id="sw-sm">
                <input type="checkbox" role="switch" class="mr-switch__input" id="sw-input-sm" />
                <span class="mr-switch__control" id="sw-ctrl-sm">
                  <span class="mr-switch__thumb" id="sw-thumb-sm"></span>
                </span>
              </label>
            </div>
            <div class="mr-switch__row" id="sw-row-md">
              <label class="mr-switch" data-size="md" id="sw-md">
                <input type="checkbox" role="switch" class="mr-switch__input" id="sw-input-md" />
                <span class="mr-switch__control" id="sw-ctrl-md">
                  <span class="mr-switch__thumb" id="sw-thumb-md"></span>
                </span>
              </label>
            </div>
            <div class="mr-switch__row" id="sw-row-lg">
              <label class="mr-switch" data-size="lg" id="sw-lg">
                <input type="checkbox" role="switch" class="mr-switch__input" id="sw-input-lg" />
                <span class="mr-switch__control" id="sw-ctrl-lg">
                  <span class="mr-switch__thumb" id="sw-thumb-lg"></span>
                </span>
              </label>
            </div>
            <label class="mr-switch" data-checked id="sw-checked">
              <input type="checkbox" role="switch" class="mr-switch__input" checked id="sw-input-checked" />
              <span class="mr-switch__control" id="sw-ctrl-checked">
                <span class="mr-switch__thumb" id="sw-thumb-checked"></span>
              </span>
            </label>
          </body>
        </html>
    `)

    const swMetrics = await pageSwitch.evaluate(() => {
        const getStyle = (id) => window.getComputedStyle(document.getElementById(id))
        const getRect = (id) => document.getElementById(id).getBoundingClientRect()
        return {
            sm: {
                trackWidth: getRect('sw-ctrl-sm').width,
                trackHeight: getRect('sw-ctrl-sm').height,
                thumbWidth: getRect('sw-thumb-sm').width,
                thumbHeight: getRect('sw-thumb-sm').height,
                rowHeight: getRect('sw-row-sm').height,
            },
            md: {
                trackWidth: getRect('sw-ctrl-md').width,
                trackHeight: getRect('sw-ctrl-md').height,
                thumbWidth: getRect('sw-thumb-md').width,
                thumbHeight: getRect('sw-thumb-md').height,
                rowHeight: getRect('sw-row-md').height,
                borderRadius: parseFloat(getStyle('sw-ctrl-md').borderRadius),
            },
            lg: {
                trackWidth: getRect('sw-ctrl-lg').width,
                trackHeight: getRect('sw-ctrl-lg').height,
                thumbWidth: getRect('sw-thumb-lg').width,
                thumbHeight: getRect('sw-thumb-lg').height,
                rowHeight: getRect('sw-row-lg').height,
            },
            input: {
                opacity: parseFloat(getStyle('sw-input-md').opacity),
            },
            checked: {
                transform: getStyle('sw-thumb-checked').transform,
                thumbLeft: getRect('sw-thumb-checked').left,
                trackRight: getRect('sw-ctrl-checked').right,
                trackLeft: getRect('sw-ctrl-checked').left,
            },
        }
    })
    await pageSwitch.close()

    assert.strictEqual(
        swMetrics.sm.trackWidth,
        36,
        `Switch sm track width attendue a 36px, obtenu: ${swMetrics.sm.trackWidth}px`
    )
    assert.strictEqual(
        swMetrics.sm.trackHeight,
        20,
        `Switch sm track height attendue a 20px, obtenu: ${swMetrics.sm.trackHeight}px`
    )
    assert.strictEqual(
        swMetrics.sm.thumbWidth,
        16,
        `Switch sm thumb width attendu a 16px, obtenu: ${swMetrics.sm.thumbWidth}px`
    )
    assert.strictEqual(
        swMetrics.sm.thumbHeight,
        16,
        `Switch sm thumb height attendu a 16px, obtenu: ${swMetrics.sm.thumbHeight}px`
    )

    assert.strictEqual(
        swMetrics.md.trackWidth,
        44,
        `Switch md track width attendue a 44px, obtenu: ${swMetrics.md.trackWidth}px`
    )
    assert.strictEqual(
        swMetrics.md.trackHeight,
        24,
        `Switch md track height attendue a 24px, obtenu: ${swMetrics.md.trackHeight}px`
    )
    assert.strictEqual(
        swMetrics.md.thumbWidth,
        20,
        `Switch md thumb width attendu a 20px, obtenu: ${swMetrics.md.thumbWidth}px`
    )
    assert.strictEqual(
        swMetrics.md.thumbHeight,
        20,
        `Switch md thumb height attendu a 20px, obtenu: ${swMetrics.md.thumbHeight}px`
    )

    assert.strictEqual(
        swMetrics.lg.trackWidth,
        52,
        `Switch lg track width attendue a 52px, obtenu: ${swMetrics.lg.trackWidth}px`
    )
    assert.strictEqual(
        swMetrics.lg.trackHeight,
        28,
        `Switch lg track height attendue a 28px, obtenu: ${swMetrics.lg.trackHeight}px`
    )
    assert.strictEqual(
        swMetrics.lg.thumbWidth,
        24,
        `Switch lg thumb width attendu a 24px, obtenu: ${swMetrics.lg.thumbWidth}px`
    )
    assert.strictEqual(
        swMetrics.lg.thumbHeight,
        24,
        `Switch lg thumb height attendu a 24px, obtenu: ${swMetrics.lg.thumbHeight}px`
    )

    assert(
        swMetrics.md.rowHeight >= 24,
        `Switch row height attendue >= 24px, obtenu: ${swMetrics.md.rowHeight}px`
    )
    assert.strictEqual(
        swMetrics.input.opacity,
        0,
        `Switch native input opacity attendue a 0, obtenu: ${swMetrics.input.opacity}`
    )
    assert.notStrictEqual(
        swMetrics.checked.transform,
        'none',
        'Switch checked thumb transform doit etre active'
    )

    console.log(
        'OK: Switch conforme (piste 36x20 sm, 44x24 md, 52x28 lg, pouce 16/20/24px, row-height >= 24px, transform actif).'
    )

    // 20. Dimensions et geometrie RadioGroup
    const pageRadio = await browser.newPage()
    await pageRadio.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body style="font-family: sans-serif; padding: 20px;">
            <div id="rg-sm" class="mr-radio-group" data-size="sm">
              <label class="mr-radio" data-checked="true">
                <input type="radio" class="mr-radio__input" checked />
                <span class="mr-radio__control"><span class="mr-radio__dot"></span></span>
                <span class="mr-radio__body"><span class="mr-radio__label">Option SM</span></span>
              </label>
            </div>
            <div id="rg-md" class="mr-radio-group" data-size="md">
              <label class="mr-radio" data-checked="true">
                <input type="radio" class="mr-radio__input" checked />
                <span class="mr-radio__control"><span class="mr-radio__dot"></span></span>
                <span class="mr-radio__body"><span class="mr-radio__label">Option MD</span></span>
              </label>
            </div>
            <div id="rg-lg" class="mr-radio-group" data-size="lg">
              <label class="mr-radio" data-checked="true">
                <input type="radio" class="mr-radio__input" checked />
                <span class="mr-radio__control"><span class="mr-radio__dot"></span></span>
                <span class="mr-radio__body"><span class="mr-radio__label">Option LG</span></span>
              </label>
            </div>
          </body>
        </html>
    `)

    const radioMetrics = await pageRadio.evaluate(() => {
        const getM = (id) => {
            const el = document.getElementById(id)
            const radio = el.querySelector('.mr-radio')
            const control = el.querySelector('.mr-radio__control')
            const dot = el.querySelector('.mr-radio__dot')
            const input = el.querySelector('.mr-radio__input')
            const rRadio = radio.getBoundingClientRect()
            const rControl = control.getBoundingClientRect()
            const rDot = dot.getBoundingClientRect()
            const sControl = window.getComputedStyle(control)
            const sDot = window.getComputedStyle(dot)
            const sInput = window.getComputedStyle(input)
            const sRadio = window.getComputedStyle(radio)

            return {
                rowHeight: Math.round(rRadio.height),
                controlWidth: Math.round(rControl.width),
                controlHeight: Math.round(rControl.height),
                dotWidth: Math.round(rDot.width * 10) / 10,
                dotHeight: Math.round(rDot.height * 10) / 10,
                fontSize: sRadio.fontSize,
                borderRadius: sControl.borderRadius,
                dotOpacity: sDot.opacity,
                inputOpacity: Number.parseFloat(sInput.opacity),
            }
        }
        return {
            sm: getM('rg-sm'),
            md: getM('rg-md'),
            lg: getM('rg-lg'),
        }
    })

    assert.strictEqual(
        radioMetrics.sm.controlWidth,
        16,
        `Radio sm control width attendu a 16px, obtenu: ${radioMetrics.sm.controlWidth}px`
    )
    assert.strictEqual(
        radioMetrics.sm.controlHeight,
        16,
        `Radio sm control height attendu a 16px, obtenu: ${radioMetrics.sm.controlHeight}px`
    )
    assert.strictEqual(
        radioMetrics.sm.fontSize,
        '12px',
        `Radio sm font size attendu a 12px, obtenu: ${radioMetrics.sm.fontSize}`
    )

    assert.strictEqual(
        radioMetrics.md.controlWidth,
        16,
        `Radio md control width attendu a 16px, obtenu: ${radioMetrics.md.controlWidth}px`
    )
    assert.strictEqual(
        radioMetrics.md.controlHeight,
        16,
        `Radio md control height attendu a 16px, obtenu: ${radioMetrics.md.controlHeight}px`
    )
    assert.strictEqual(
        radioMetrics.md.fontSize,
        '14px',
        `Radio md font size attendu a 14px, obtenu: ${radioMetrics.md.fontSize}`
    )

    assert.strictEqual(
        radioMetrics.lg.controlWidth,
        20,
        `Radio lg control width attendu a 20px, obtenu: ${radioMetrics.lg.controlWidth}px`
    )
    assert.strictEqual(
        radioMetrics.lg.controlHeight,
        20,
        `Radio lg control height attendu a 20px, obtenu: ${radioMetrics.lg.controlHeight}px`
    )

    assert(
        radioMetrics.md.rowHeight >= 24,
        `Radio row height attendue >= 24px, obtenu: ${radioMetrics.md.rowHeight}px`
    )
    assert.strictEqual(
        radioMetrics.md.inputOpacity,
        0,
        `Radio native input opacity attendue a 0, obtenu: ${radioMetrics.md.inputOpacity}`
    )
    assert.strictEqual(
        radioMetrics.md.dotOpacity,
        '1',
        `Radio checked dot opacity attendue a 1, obtenu: ${radioMetrics.md.dotOpacity}`
    )

    console.log(
        'OK: RadioGroup conforme (cercle 16px sm/md, 20px lg, row-height >= 24px, dot visible, input accessible).'
    )

    // 21. Dimensions et geometrie Slider
    const pageSlider = await browser.newPage()
    await pageSlider.setContent(`
        <!DOCTYPE html>
        <html data-theme="light">
          <head><style>${distCss}</style></head>
          <body style="font-family: sans-serif; padding: 20px;">
            <div id="sl-sm" class="mr-slider-field">
              <div class="mr-slider__row">
                <input type="range" class="mr-slider" data-size="sm" value="30" />
                <output class="mr-slider__value">30</output>
              </div>
            </div>
            <div id="sl-md" class="mr-slider-field">
              <div class="mr-slider__row">
                <input type="range" class="mr-slider" data-size="md" value="50" />
                <output class="mr-slider__value">50</output>
              </div>
            </div>
            <div id="sl-lg" class="mr-slider-field">
              <div class="mr-slider__row">
                <input type="range" class="mr-slider" data-size="lg" value="80" />
                <output class="mr-slider__value">80</output>
              </div>
            </div>
          </body>
        </html>
    `)

    const sliderMetrics = await pageSlider.evaluate(() => {
        const getM = (id) => {
            const el = document.getElementById(id)
            const input = el.querySelector('.mr-slider')
            const value = el.querySelector('.mr-slider__value')
            const rInput = input.getBoundingClientRect()
            const rValue = value.getBoundingClientRect()
            const sInput = window.getComputedStyle(input)
            const sValue = window.getComputedStyle(value)

            return {
                inputHeight: Math.round(rInput.height),
                valueWidth: Math.round(rValue.width),
                valueHeight: Math.round(rValue.height),
                fontVariantNumeric: sValue.fontVariantNumeric,
                appearance: sInput.appearance,
            }
        }
        return {
            sm: getM('sl-sm'),
            md: getM('sl-md'),
            lg: getM('sl-lg'),
        }
    })

    assert.strictEqual(
        sliderMetrics.sm.inputHeight,
        20,
        `Slider sm input height attendu a 20px, obtenu: ${sliderMetrics.sm.inputHeight}px`
    )
    assert.strictEqual(
        sliderMetrics.md.inputHeight,
        24,
        `Slider md input height attendu a 24px, obtenu: ${sliderMetrics.md.inputHeight}px`
    )
    assert.strictEqual(
        sliderMetrics.lg.inputHeight,
        24,
        `Slider lg input height attendu a 24px, obtenu: ${sliderMetrics.lg.inputHeight}px`
    )
    assert(
        sliderMetrics.md.valueWidth >= 40,
        `Slider value min-width attendu >= 40px, obtenu: ${sliderMetrics.md.valueWidth}px`
    )
    assert.strictEqual(
        sliderMetrics.md.appearance,
        'none',
        'Slider input appearance doit etre none'
    )
    assert.strictEqual(
        sliderMetrics.md.fontVariantNumeric,
        'tabular-nums',
        'Slider value font-variant-numeric doit etre tabular-nums'
    )

    console.log(
        'OK: Slider conforme (zone interactive 20px sm / 24px md/lg, appearance: none, value tabular-nums >= 40px).'
    )
}
