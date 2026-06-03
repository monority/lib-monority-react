import { usePageSeo } from '@/seo/usePageSeo'

export function NotFoundPage() {
    usePageSeo({ title: '404', description: 'Page introuvable.' })
    return (
        <section>
            <h1>404</h1>
            <p>Page non trouvee.</p>
        </section>
    )
}
