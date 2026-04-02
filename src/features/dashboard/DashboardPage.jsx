import { AppPage } from '@/app/layouts/AppPage'
import { primaryNavigationItems } from '@/app/config/navigation'
import {
    dashboardAlert,
    dashboardHeaderContent,
    dashboardMetrics,
    dashboardSidebarData,
    dashboardTableColumns,
    dashboardTableRows,
    dashboardTopbarContent,
} from './content/dashboard-content'
import { DashboardHeroSection } from './sections/DashboardHeroSection'
import { DashboardOverviewSection } from './sections/DashboardOverviewSection'

export function DashboardPage() {
    return (
        <AppPage navigationItems={primaryNavigationItems}>
            <DashboardHeroSection
                topbarContent={dashboardTopbarContent}
                headerContent={dashboardHeaderContent}
            />
            <DashboardOverviewSection
                metrics={dashboardMetrics}
                alert={dashboardAlert}
                tableColumns={dashboardTableColumns}
                tableRows={dashboardTableRows}
                sidebarData={dashboardSidebarData}
            />
        </AppPage>
    )
}
