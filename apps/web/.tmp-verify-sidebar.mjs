import { chromium } from '@playwright/test'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

await page.goto('http://localhost:5173/docs/sidebar-layout', { waitUntil: 'networkidle' })
const layout = page.locator('.mr-sidebar-layout').first()
await layout.waitFor()

const toggles = layout.locator('.mr-sidebar-layout__toggle')
console.log('toggles in playground:', await toggles.count())

const sidebar = layout.locator('.mr-sidebar-layout__sidebar')
console.log('sidebar visible before:', await sidebar.isVisible())
await layout.screenshot({ path: process.argv[2] + '/sidebar-open.png' })

await toggles.first().click()
await page.waitForTimeout(500)
console.log('data-collapsed:', await layout.getAttribute('data-collapsed'))
console.log('aria-expanded:', await toggles.first().getAttribute('aria-expanded'))
console.log('sidebar visibility:', await sidebar.evaluate((el) => getComputedStyle(el).visibility))
console.log('sidebar width:', await sidebar.evaluate((el) => el.getBoundingClientRect().width))

// Clavier : depuis le toggle, Shift+Tab ne doit pas entrer dans la nav repliee
await toggles.first().focus()
await page.keyboard.press('Shift+Tab')
const inSidebar = await page.evaluate(
    () => !!document.activeElement?.closest('.mr-sidebar-layout__sidebar')
)
console.log('focus entered collapsed sidebar:', inSidebar)
await layout.screenshot({ path: process.argv[2] + '/sidebar-collapsed.png' })

// Hide header : le toggle doit rester present pour rouvrir
await toggles.first().click()
await page.waitForTimeout(500)
console.log('reopened visibility:', await sidebar.evaluate((el) => getComputedStyle(el).visibility))

console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
