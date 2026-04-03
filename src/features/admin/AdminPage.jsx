import { AppPage } from '@/app/layouts/AppPage'
import { primaryNavigationItems } from '@/app/config/navigation'
import { AsyncStateNotice, Card, Skeleton } from '@/components/ui'
import { useErrorToast } from '@/hooks/useErrorToast'
import { useAdminOverview } from './hooks/useAdminOverview'
import { AdminHeroSection } from './sections/AdminHeroSection'
import { AdminOverviewSection } from './sections/AdminOverviewSection'

export function AdminPage() {
    const { data, isLoading, isError, errorMessage } = useAdminOverview()
    useErrorToast({
        title: 'Espace admin indisponible',
        errorMessage: isError ? errorMessage : null,
    })

    return (
        <AppPage
            navigationItems={primaryNavigationItems}
            seo={{
                title: 'Espace admin de demonstration',
                description:
                    'Exemple de page admin avec filtres, tableau, indicateurs lateraux et gestion des etats de chargement ou d erreur.',
            }}
        >
            <AsyncStateNotice
                isLoading={isLoading}
                isError={isError}
                loadingMessage="Chargement de l espace admin de demonstration..."
                errorMessage={errorMessage}
                loadingContent={<AdminLoadingSkeleton />}
            />

            {data ? (
                <>
                    <AdminHeroSection headerContent={data.headerContent} filters={data.filters} />
                    <AdminOverviewSection
                        columns={data.columns}
                        rows={data.rows}
                        sidebarData={data.sidebarData}
                    />
                </>
            ) : null}
        </AppPage>
    )
}

function AdminLoadingSkeleton() {
    return (
        <div className="stack-m" aria-hidden="true">
            <Card padding="md" className="stack-s">
                <Skeleton style={{ width: '6rem', height: '1rem' }} />
                <Skeleton style={{ width: '20rem', height: '2rem' }} />
                <Skeleton style={{ width: '100%', height: '1rem' }} />
            </Card>
            <Card padding="md" className="stack-s">
                <Skeleton style={{ width: '14rem', height: '1rem' }} />
                <Skeleton style={{ width: '100%', height: '12rem' }} />
            </Card>
        </div>
    )
}
