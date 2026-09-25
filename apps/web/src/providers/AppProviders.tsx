import { ThemeProvider, ToastProvider } from '@monority/ui'
import { AuthProvider } from './AuthProvider'

interface AppProvidersProps {
    children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <ToastProvider>{children}</ToastProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}
