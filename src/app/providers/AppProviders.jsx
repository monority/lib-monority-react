import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { ThemeRoot } from '@/app/providers/ThemeRoot'

export function AppProviders({ children }) {
    return (
        <ThemeProvider>
            <ThemeRoot>{children}</ThemeRoot>
        </ThemeProvider>
    )
}
