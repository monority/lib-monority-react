import { chromium } from './common.js'
import { testContrast } from './test-contrast.js'
import { testHostIsolation } from './test-isolation.js'
import { testControlDimensions } from './test-dimensions.js'

async function run() {
    const browser = await chromium.launch({ headless: true })

    try {
        await testContrast(browser)
        await testHostIsolation(browser)
        await testControlDimensions(browser)

        const fs = await import('node:fs')
        const path = await import('node:path')
        const { fileURLToPath } = await import('node:url')
        const themesDir = path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            '../../packages/styles/src/themes'
        )
        const activeThemes = fs
            .readdirSync(themesDir)
            .filter((f) => f.endsWith('.css'))
            .map((f) => f.replace('.css', ''))
        console.log(
            `\nTous les contrastes respectent WCAG AA sur tous les themes actifs (light, ${activeThemes.join(', ')}).`
        )
    } finally {
        await browser.close()
    }
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
