import { usePageSeo } from '@/seo/usePageSeo'

export function PlaygroundPage() {
    usePageSeo({ title: 'Playground', description: "Zone d'experimentation des composants." })
    return (
        <section>
            <h1>Playground</h1>
            <p>Zone d'experimentation des composants.</p>
        </section>
    )
}
