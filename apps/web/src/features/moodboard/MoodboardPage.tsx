import { useEffect, useState } from 'react'
import {
    DesignProvider,
    ThemeScope,
    DEFAULT_DESIGN_CONFIG,
    resolveDesignConfig,
    sanitizeDesignConfig,
    designConfigToJSON,
    type DesignConfig,
} from '@monority/ui'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { AppHeader } from '@/shared/layouts/AppHeader'
import { MoodboardSidebar } from './MoodboardSidebar'
import { MoodboardPreview, type PanelState } from './MoodboardPreview'
import './moodboard.css'

type DensityName = 'comfortable' | 'compact'

const initialState: PanelState = {
    tab: 'overview',
    workspace: 'monority-prod',
    region: 'eu-west-1',
    checked: true,
    notifications: false,
    selectedRow: 'edge-router',
}

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

    const [state, setState] = useState<PanelState>(initialState)
    const [copied, setCopied] = useState(false)

    const updateState = (next: Partial<PanelState>) =>
        setState((current) => ({ ...current, ...next }))

    const updateConfig = <K extends keyof DesignConfig>(key: K, value: DesignConfig[K]) => {
        setConfig((current) => ({ ...current, [key]: value }))
    }

    const handleReset = () => {
        setConfig(DEFAULT_DESIGN_CONFIG)
        setState(initialState)
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

    const density: DensityName = config.density === 'compact' ? 'compact' : 'comfortable'
    const resolved = resolveDesignConfig(config)

    return (
        <>
            <AppHeader />
            <DesignProvider config={config} className="moodboard-design-root">
                <div className="moodboard-page" data-testid="moodboard-page">
                    <MoodboardSidebar
                        config={config}
                        onConfig={updateConfig}
                        onReset={handleReset}
                        onCopy={handleCopy}
                        copied={copied}
                    />
                    <ThemeScope
                        theme={config.theme}
                        density={density}
                        brand={config.brand === 'studio' ? 'studio' : undefined}
                        className="moodboard-preview-scope"
                        style={resolved.style}
                        data-testid="moodboard-preview-scope"
                        data-design-theme={config.theme}
                        data-design-accent={config.accent}
                        data-design-component-color={config.componentColor}
                        data-design-chart-palette={config.chartPalette}
                        data-design-radius={config.radius}
                        data-design-spacing={config.spacing}
                        data-design-density={config.density}
                    >
                        <MoodboardPreview state={state} onState={updateState} />
                    </ThemeScope>
                </div>
            </DesignProvider>
        </>
    )
}
