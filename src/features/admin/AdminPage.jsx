import { AppPage } from '@/app/layouts/AppPage'
import { primaryNavigationItems } from '@/app/config/navigation'
import {
    adminFilters,
    adminHeaderContent,
    adminSidebarData,
    adminTableColumns,
    adminTableRows,
} from './content/admin-content'
import { AdminHeroSection } from './sections/AdminHeroSection'
import { AdminOverviewSection } from './sections/AdminOverviewSection'

export function AdminPage() {
    return (
        <AppPage navigationItems={primaryNavigationItems}>
            <AdminHeroSection headerContent={adminHeaderContent} filters={adminFilters} />
            <AdminOverviewSection
                columns={adminTableColumns}
                rows={adminTableRows}
                sidebarData={adminSidebarData}
            />
        </AppPage>
    )
}
