import { Link } from 'react-router-dom'
import { usePageSeo } from '@/seo/usePageSeo'

export function NotFoundPage() {
    usePageSeo({ title: '404', description: 'Page introuvable.' })
    return (
        <section>
            <h1>404</h1>
            <p>Page non trouvée.</p>
            <p>
                <Link to="/">Back to home</Link> · <Link to="/docs">Browse the docs</Link>
            </p>
        </section>
    )
}
