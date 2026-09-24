import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    use: {
        baseURL: 'http://localhost:5199',
        trace: 'retain-on-failure',
    },
    webServer: {
        command: 'pnpm preview --port 5199',
        url: 'http://localhost:5199/docs',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
    projects: [
        { name: 'mobile-375', use: { viewport: { width: 375, height: 812 } } },
        {
            name: 'mobile-390',
            use: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true },
        },
        {
            name: 'mobile-430',
            use: { viewport: { width: 430, height: 932 }, deviceScaleFactor: 2, isMobile: true },
        },
        {
            name: 'boundary-mobile',
            use: { viewport: { width: 719, height: 800 } },
        },
        {
            name: 'boundary-edge',
            use: { viewport: { width: 720, height: 800 } },
        },
        {
            name: 'boundary-desktop',
            use: { viewport: { width: 721, height: 800 } },
        },
        { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
        { name: 'desktop-1024', use: { viewport: { width: 1024, height: 900 } } },
        { name: 'tablet-768', use: { viewport: { width: 768, height: 900 } } },
        {
            name: 'mobile-reduced-motion',
            use: {
                viewport: { width: 390, height: 844 },
                reducedMotion: 'reduce',
            },
        },
    ],
})
