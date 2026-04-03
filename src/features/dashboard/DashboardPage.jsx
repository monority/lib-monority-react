import { AppPage } from '@/app/layouts/AppPage'
import { primaryNavigationItems } from '@/app/config/navigation'
import { AsyncStateNotice } from '@/components/ui'
import { useDashboardOverview } from './hooks/useDashboardOverview'
import { DashboardHeroSection } from './sections/DashboardHeroSection'
import { DashboardOverviewSection } from './sections/DashboardOverviewSection'

export function DashboardPage() {
    const { data, isLoading, isError, errorMessage } = useDashboardOverview()

    return (
        <AppPage navigationItems={primaryNavigationItems}>
            <AsyncStateNotice
                isLoading={isLoading}
                isError={isError}
                loadingMessage="Chargement du dashboard de demonstration..."
                errorMessage={errorMessage}
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
