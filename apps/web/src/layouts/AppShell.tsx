import './AppShell.css'
import { useAuth } from '@/hooks/useAuth'
import { useErrorToast } from '@/hooks/useErrorToast'
import { AppHeader } from './AppHeader'

interface AppShellProps {
    children?: React.ReactNode
}

/**
 * Single-header shell: AppHeader is the only chrome (brand + main nav +
 * Light/Dark toggle). There is no secondary navigation bar — pages are
 * reached through the header, the URL, or in-page links.
 */
export function AppShell({ children }: AppShellProps) {
    const { errorMessage } = useAuth()

    useErrorToast({
        title: 'Session demo indisponible',
        errorMessage,
    })

    return (
        <div className="app-shell">
            <a className="app-skip-link" href="#main-content">
                Aller au contenu principal
            </a>

            <AppHeader />

            <main id="main-content" tabIndex={-1}>
                {children}
            </main>
        </div>
    )
}
