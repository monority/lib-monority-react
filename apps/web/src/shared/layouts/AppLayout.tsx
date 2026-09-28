import { Outlet } from 'react-router-dom'
import { AppPage } from '@/shared/layouts/AppPage'

export function AppLayout() {
    return (
        <AppPage containerSize="lg" stackGap="xl">
            <Outlet />
        </AppPage>
    )
}
