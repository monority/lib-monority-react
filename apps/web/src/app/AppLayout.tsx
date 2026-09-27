import { Outlet } from 'react-router-dom'
import { AppPage } from '@/layouts/AppPage'

export function AppLayout() {
    return (
        <AppPage containerSize="lg" stackGap="xl">
            <Outlet />
        </AppPage>
    )
}
