import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'
import { AppErrorBoundary } from '@/errors/AppErrorBoundary'
import { AppProviders } from '@/providers/AppProviders'

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
    </StrictMode>,
)
