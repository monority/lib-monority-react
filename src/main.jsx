import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './index.css'
import App from '@/app/App'
import { AppErrorBoundary } from '@/app/errors/AppErrorBoundary'
import { AppProviders } from '@/app/providers/AppProviders'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <AppProviders>
        <App />
      </AppProviders>
    </AppErrorBoundary>
  </StrictMode>,
)
