import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './index.css'
import App from '@/features/home/App'
import { AppErrorBoundary } from '@/shared/errors/AppErrorBoundary'
import { AppProviders } from '@/shared/providers/AppProviders'

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element "#root" introuvable.')
}

createRoot(rootElement).render(
    <StrictMode>
        <AppErrorBoundary>
            <AppProviders>
                <App />
            </AppProviders>
        </AppErrorBoundary>
    </StrictMode>
)
