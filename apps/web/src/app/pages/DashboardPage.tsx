import { usePageSeo } from '@/seo/usePageSeo'

export function DashboardPage() {
    usePageSeo({ title: 'Dashboard', description: "Vue d'ensemble du tableau de bord." })
    return (
        <section>
            <h1>Dashboard</h1>
            <p>Vue d'ensemble du tableau de bord.</p>
        </section>
    )
}
