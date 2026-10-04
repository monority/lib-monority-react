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

        console.log('\nTous les contrastes respectent WCAG AA sur les deux themes (light et dark).')
    } finally {
        await browser.close()
    }
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
