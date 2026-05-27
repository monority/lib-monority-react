import { screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { AppPage } from '@/layouts/AppPage'
import { renderWithProviders } from '@/test/test-utils'

describe('AppPage SEO', () => {
    afterEach(() => {
        document.title = 'Vitest'
        document.head.querySelector('meta[name="description"]')?.remove()
        document.head.querySelector('meta[name="robots"]')?.remove()
        document.head.querySelector('link[rel="canonical"]')?.remove()
        document.head.querySelector('meta[property="og:title"]')?.remove()
        document.head.querySelector('meta[property="og:description"]')?.remove()
        document.head.querySelector('meta[property="og:url"]')?.remove()
        document.head.querySelector('meta[name="twitter:title"]')?.remove()
        document.head.querySelector('meta[name="twitter:description"]')?.remove()
    })

    it('met a jour les metadonnees principales de la page', () => {
        renderWithProviders(
            <AppPage
                navigationItems={[]}
                seo={{
                    title: 'Documentation UI',
                    description: 'Une doc complete pour la librairie UI.',
                    robots: 'index,follow',
                }}
            >
                <div>Page docs</div>
            </AppPage>,
            { initialEntries: ['/docs'] },
        )

        expect(screen.getByText('Page docs')).toBeInTheDocument()
        expect(document.title).toBe('Documentation UI | Model Starter')
        expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
            'content',
            'Une doc complete pour la librairie UI.',
        )
        expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
            'content',
            'index,follow',
        )
        expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
            'href',
            'http://localhost:3000/docs',
        )
        expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute(
            'content',
            'Documentation UI | Model Starter',
        )
    })
})
