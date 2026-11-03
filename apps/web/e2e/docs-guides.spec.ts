import { expect, test } from '@playwright/test'

test.describe('Docs Guides — Introduction and Installation', () => {
    test('renders Introduction (/docs) with telemetry, ThemeScope preview, categories, and DocToc', async ({
        page,
        viewport,
    }) => {
        const isDesktop = (viewport?.width ?? 1440) >= 1024

        await page.goto('/docs')
        await expect(page.locator('h1')).toHaveText('Introduction')

        // Telemetry strip
        await expect(page.locator('.docs-telemetry')).toBeVisible()
        await expect(page.locator('.docs-telemetry__value').first()).toHaveText('84')

        // 4 pillars
        await expect(page.locator('.docs-pillar-card')).toHaveCount(4)

        // Interactive ThemeScope preview in quickstart
        const quickstartSection = page.locator('#quickstart')
        await expect(quickstartSection).toBeVisible()

        // Switch theme in preview
        const oceanRadio = page
            .locator(
                '.docs-preview-controls input[value="ocean"], .docs-preview-controls button:has-text("Ocean")'
            )
            .first()
        if (await oceanRadio.isVisible()) {
            await oceanRadio.click()
            await expect(page.locator('.docs-intro-scope')).toHaveAttribute('data-theme', 'ocean')
        }

        // Switch density in preview
        const compactRadio = page
            .locator('.docs-preview-controls button:has-text("Compact")')
            .first()
        if (await compactRadio.isVisible()) {
            await compactRadio.click()
            await expect(page.locator('.docs-intro-scope')).toHaveAttribute(
                'data-density',
                'compact'
            )
        }

        // Synchronized code block
        await expect(page.locator('#quickstart .code-viewer:not(.docs-pm-tabs) pre')).toContainText(
            'ThemeScope'
        )

        // Categories section
        const categoriesSection = page.locator('#categories')
        await expect(categoriesSection).toBeVisible()
        await expect(page.locator('.docs-category-card')).toHaveCount(11)

        // DocToc links on desktop
        if (isDesktop) {
            const toc = page.locator('.docs-toc')
            await expect(toc).toBeVisible()
            await expect(toc.locator('a[href="#architecture"]')).toBeVisible()
            await expect(toc.locator('a[href="#quickstart"]')).toBeVisible()
            await expect(toc.locator('a[href="#categories"]')).toBeVisible()
        }

        // DocPager
        const nextPager = page.locator('.docs-pager__link--next')
        await expect(nextPager).toBeVisible()
        await expect(nextPager).toHaveAttribute('href', '/docs/installation')
    })

    test('renders Installation (/docs/installation) with 6 numbered steps and framework switcher', async ({
        page,
        viewport,
    }) => {
        const isDesktop = (viewport?.width ?? 1440) >= 1024

        await page.goto('/docs/installation')
        await expect(page.locator('h1')).toHaveText('Installation')

        // 6 DocSections
        await expect(page.locator('#install')).toBeVisible()
        await expect(page.locator('#styles')).toBeVisible()
        await expect(page.locator('#providers')).toBeVisible()
        await expect(page.locator('#ssr-hydration')).toBeVisible()
        await expect(page.locator('#imports')).toBeVisible()
        await expect(page.locator('#frameworks')).toBeVisible()

        // PackageManagerTabs in Step 1
        const bunTrigger = page.locator('.docs-pm-tabs__trigger:has-text("bun")')
        await bunTrigger.click()
        await expect(page.locator('#install pre')).toContainText('bun add @monority/ui')

        // Framework tabs in Step 6
        const nextTab = page.locator('button[role="tab"]:has-text("Next.js App Router")')
        await nextTab.click()
        await expect(page.locator('#frameworks .docs-framework-panel')).toContainText(
            'app/layout.tsx'
        )

        // DocToc on desktop contains all 6 step headings
        if (isDesktop) {
            const toc = page.locator('.docs-toc')
            await expect(toc).toBeVisible()
            await expect(toc.locator('a[href="#install"]')).toBeVisible()
            await expect(toc.locator('a[href="#styles"]')).toBeVisible()
            await expect(toc.locator('a[href="#providers"]')).toBeVisible()
            await expect(toc.locator('a[href="#ssr-hydration"]')).toBeVisible()
            await expect(toc.locator('a[href="#imports"]')).toBeVisible()
            await expect(toc.locator('a[href="#frameworks"]')).toBeVisible()
        }

        // DocPager links
        const prevPager = page.locator('.docs-pager__link--prev')
        const nextPager = page.locator('.docs-pager__link--next')
        await expect(prevPager).toHaveAttribute('href', '/docs')
        await expect(nextPager).toHaveAttribute('href', '/docs/button')

        // Navigate to /docs/button and verify component DocPager
        await nextPager.click()
        await expect(page).toHaveURL('/docs/button')
        await expect(page.locator('h1')).toHaveText('Button')
        await expect(page.locator('.docs-pager__link--prev')).toHaveAttribute(
            'href',
            '/docs/installation'
        )
        await expect(page.locator('.docs-pager__link--next')).toHaveAttribute(
            'href',
            '/docs/button-link'
        )
    })

    test('supports French localization on /fr/docs and /fr/docs/installation', async ({ page }) => {
        await page.goto('/fr/docs')
        await expect(page.locator('h1')).toHaveText('Introduction')
        await expect(page.locator('.docs-hero-actions a').first()).toHaveAttribute(
            'href',
            '/fr/docs/installation'
        )
        await expect(page.locator('.docs-category-card').first()).toBeVisible()
        await expect(page.locator('.docs-pager__link--next')).toHaveAttribute(
            'href',
            '/fr/docs/installation'
        )

        await page.goto('/fr/docs/installation')
        await expect(page.locator('h1')).toHaveText('Installation')
        await expect(page.locator('.docs-pager__link--prev')).toHaveAttribute('href', '/fr/docs')
        await expect(page.locator('.docs-pager__link--next')).toHaveAttribute(
            'href',
            '/fr/docs/button'
        )
    })
})
