import { AppPage } from '@/app/layouts/AppPage'
import { primaryNavigationItems } from '@/app/config/navigation'
import { AsyncStateNotice } from '@/components/ui'
import { useAdminOverview } from './hooks/useAdminOverview'
import { AdminHeroSection } from './sections/AdminHeroSection'
import { AdminOverviewSection } from './sections/AdminOverviewSection'

export function AdminPage() {
    const { data, isLoading, isError, errorMessage } = useAdminOverview()

    return (
        <AppPage navigationItems={primaryNavigationItems}>
            <AsyncStateNotice
                isLoading={isLoading}
                isError={isError}
                loadingMessage="Chargement de l espace admin de demonstration..."
                errorMessage={errorMessage}
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
