import { useEffect, useState } from 'react'
import {
    DEFAULT_DESIGN_CONFIG,
    DesignProvider,
    ThemeScope,
    designConfigToJSON,
    resolveDesignConfig,
    sanitizeDesignConfig,
    type DesignConfig,
} from '@monority/ui'
import { SidebarLayout } from '@monority/ui/sidebar-layout'
import { AppHeader } from '@/shared/layouts/AppHeader'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { MoodboardPreview } from './MoodboardPreview'
import { MoodboardSidebar } from './MoodboardSidebar'

export function MoodboardPage() {
    usePageSeo({
        title: 'Design Studio',
        description:
            'Monority UI design system — one interface, one configuration, one live preview.',
    })

    const [config, setConfig] = useState<DesignConfig>(() => {
        if (typeof window === 'undefined') return DEFAULT_DESIGN_CONFIG
        try {
            const stored = localStorage.getItem('monority-design-config')
            return stored ? sanitizeDesignConfig(JSON.parse(stored)) : DEFAULT_DESIGN_CONFIG
        } catch {
            return DEFAULT_DESIGN_CONFIG
        }
    })

    const [copied, setCopied] = useState(false)

    const updateConfig = <K extends keyof DesignConfig>(key: K, value: DesignConfig[K]) => {
        setConfig((current) => ({ ...current, [key]: value }))
    }

    const handleReset = () => {
        setConfig(DEFAULT_DESIGN_CONFIG)
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(designConfigToJSON(config))
        setCopied(true)
    }

    /* Persist to localStorage */
    useEffect(() => {
        try {
            localStorage.setItem('monority-design-config', designConfigToJSON(config))
        } catch {
            /* noop */
        }
    }, [config])

    /* Reset copied flag */
    useEffect(() => {
        if (!copied) return
        const timer = setTimeout(() => setCopied(false), 2000)
        return () => clearTimeout(timer)
    }, [copied])

    const density = config.density === 'compact' ? 'compact' : 'comfortable'
    const resolved = resolveDesignConfig(config)

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppHeader />
            <DesignProvider config={config}>
                <SidebarLayout
                    sidebarWidth="lg"
                    style={{
                        flex: 1,
                        minBlockSize: 'calc(100dvh - var(--app-header-height, 3.5rem))',
                    }}
                    data-testid="moodboard-page"
                    sidebar={
                        <MoodboardSidebar
                            config={config}
                            onConfig={updateConfig}
                            onReset={handleReset}
                            onCopy={handleCopy}
                            copied={copied}
                        />
                    }
                >
                    <ThemeScope
                        theme={config.theme}
                        density={density}
                        brand={config.brand === 'studio' ? 'studio' : undefined}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 1fr)',
                            minInlineSize: 0,
                            backgroundColor: 'var(--mr-bg-canvas)',
                            color: 'var(--mr-text-primary)',
                            ...resolved.style,
                        }}
                        data-testid="moodboard-preview-scope"
                        data-design-theme={config.theme}
                        data-design-accent={config.accent}
                        data-design-component-color={config.componentColor}
                        data-design-chart-palette={config.chartPalette}
                        data-design-radius={config.radius}
                        data-design-spacing={config.spacing}
                        data-design-density={config.density}
                    >
                        <MoodboardPreview />
                    </ThemeScope>
                </SidebarLayout>
            </DesignProvider>
        </div>
    )
}
