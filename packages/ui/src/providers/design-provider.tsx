import type { CSSProperties, ReactNode } from 'react'
import { resolveDesignConfig, type DesignConfig } from '../lib/design-config'

export interface DesignProviderProps {
    config: DesignConfig
    children: ReactNode
    className?: string
    id?: string
}

export function DesignProvider({ config, children, className, id }: DesignProviderProps) {
    const resolved = resolveDesignConfig(config)
    return (
        <div
            id={id}
            className={className}
            data-design-provider=""
            data-design-theme={config.theme}
            data-brand={config.brand}
            data-design-accent={config.accent}
            data-design-component-color={config.componentColor}
            data-design-chart-palette={config.chartPalette}
            data-design-radius={config.radius}
            data-design-spacing={config.spacing}
            data-design-density={config.density}
            data-density={resolved.themeDensity}
            data-theme={config.theme}
            style={resolved.style as CSSProperties}
        >
            {children}
        </div>
    )
}
