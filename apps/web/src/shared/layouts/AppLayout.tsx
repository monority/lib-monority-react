import { AppPage } from '@/shared/layouts/AppPage'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
    return (
        <AppPage containerSize="lg" stackGap="xl">
            <Outlet />
        </AppPage>
    )
}
