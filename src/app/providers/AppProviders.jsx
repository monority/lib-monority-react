import { AuthProvider } from '@/app/providers/AuthProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { ThemeRoot } from '@/app/providers/ThemeRoot'
import { ToastProvider } from '@/app/providers/ToastProvider'

export function AppProviders({ children }) {
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
