import { ThemeProvider, ThemeRoot, ToastProvider } from '@monority/ui'
import { AuthProvider } from './AuthProvider'

interface AppProvidersProps {
    children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <ToastProvider>
                    <ThemeRoot>{children}</ThemeRoot>
                </ToastProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}
