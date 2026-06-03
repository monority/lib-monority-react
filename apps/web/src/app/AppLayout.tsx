import { Outlet } from 'react-router-dom'
import { AppPage } from '@/layouts/AppPage'
import { primaryNavigationItems } from '@/config/app-routes'

export function AppLayout() {
    return (
        <AppPage navigationItems={primaryNavigationItems} containerSize="lg" stackGap="xl">
            <Outlet />
        </AppPage>
    )
}
