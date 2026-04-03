import { AppPage } from '@/app/layouts/AppPage'
import { primaryNavigationItems } from '@/app/config/navigation'
import { AsyncStateNotice, Card, Skeleton } from '@/components/ui'
import { useErrorToast } from '@/hooks/useErrorToast'
import { useDashboardOverview } from './hooks/useDashboardOverview'
import { DashboardHeroSection } from './sections/DashboardHeroSection'
import { DashboardOverviewSection } from './sections/DashboardOverviewSection'

export function DashboardPage() {
    const { data, isLoading, isError, errorMessage } = useDashboardOverview()
    useErrorToast({
        title: 'Dashboard indisponible',
        errorMessage: isError ? errorMessage : null,
    })

    return (
        <AppPage
            navigationItems={primaryNavigationItems}
            seo={{
                title: 'Dashboard de demonstration',
                description:
                    'Exemple de dashboard produit avec KPI, alertes, tableau et etats asynchrones accessibles dans le starter.',
            }}
        >
            <AsyncStateNotice
                isLoading={isLoading}
                isError={isError}
                loadingMessage="Chargement du dashboard de demonstration..."
                errorMessage={errorMessage}
                loadingContent={<DashboardLoadingSkeleton />}
            />

            {data ? (
                <>
                    <DashboardHeroSection
                        topbarContent={data.topbarContent}
                        headerContent={data.headerContent}
                    />
                    <DashboardOverviewSection
                        metrics={data.metrics}
                        alert={data.alert}
                        tableColumns={data.tableColumns}
                        tableRows={data.tableRows}
                        sidebarData={data.sidebarData}
                    />
                </>
            ) : null}
        </AppPage>
    )
}

function DashboardLoadingSkeleton() {
    return (
        <div className="stack-m" aria-hidden="true">
            <Card padding="md" className="stack-s">
                <Skeleton style={{ width: '8rem', height: '1rem' }} />
                <Skeleton style={{ width: '18rem', height: '2rem' }} />
                <Skeleton style={{ width: '100%', height: '1rem' }} />
            </Card>
            <div className="dashboard-grid">
                <div className="dashboard-grid__main">
                    <div className="grid cols-4" />
                    <Card padding="md" className="stack-s">
                        <Skeleton style={{ width: '10rem', height: '1rem' }} />
                        <Skeleton style={{ width: '100%', height: '14rem' }} />
                    </Card>
                </div>
            </div>
        </div>
    )
}
