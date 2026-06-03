import { usePageSeo } from '@/seo/usePageSeo'

export function AdminPage() {
    usePageSeo({ title: 'Admin', description: "Panneau d'administration." })
    return (
        <section>
            <h1>Admin</h1>
            <p>Panneau d'administration.</p>
        </section>
    )
}
