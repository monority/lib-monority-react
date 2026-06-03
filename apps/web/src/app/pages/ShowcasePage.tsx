import { usePageSeo } from '@/seo/usePageSeo'

export function ShowcasePage() {
    usePageSeo({ title: 'Showcase', description: 'Vitrine des composants disponibles.' })
    return (
        <section>
            <h1>Showcase</h1>
            <p>Vitrine des composants disponibles.</p>
        </section>
    )
}
