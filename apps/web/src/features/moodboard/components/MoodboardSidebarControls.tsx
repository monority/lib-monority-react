import { DESIGN_PRESETS, type DesignConfig, Select, Stack } from '@monority/ui'
import type { ChangeEvent } from 'react'

interface AxisDefinition {
    key: keyof DesignConfig
    label: string
    ariaLabel: string
    items: readonly { value: string; label: string }[]
}

const AXES: readonly AxisDefinition[] = [
    {
        key: 'theme',
        label: 'Theme',
        ariaLabel: 'Theme axis',
        items: DESIGN_PRESETS.themes,
    },
    {
        key: 'accent',
        label: 'Accent',
        ariaLabel: 'Accent axis',
        items: DESIGN_PRESETS.accents,
    },
    {
        key: 'radius',
        label: 'Corner Radius',
        ariaLabel: 'Radius axis',
        items: DESIGN_PRESETS.radii,
    },
    {
        key: 'spacing',
        label: 'Spacing Scale',
        ariaLabel: 'Spacing axis',
        items: DESIGN_PRESETS.spacings,
    },
    {
        key: 'density',
        label: 'Layout Density',
        ariaLabel: 'Layout density axis',
        items: DESIGN_PRESETS.densities,
    },
    {
        key: 'chartPalette',
        label: 'Chart Palette',
        ariaLabel: 'Chart palette axis',
        items: DESIGN_PRESETS.chartPalettes,
    },
]

export interface MoodboardSidebarControlsProps {
    config: DesignConfig
    onConfig: <K extends keyof DesignConfig>(key: K, value: DesignConfig[K]) => void
}

export function MoodboardSidebarControls({ config, onConfig }: MoodboardSidebarControlsProps) {
    const handleSelectChange = (key: keyof DesignConfig) => (e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value
        if (!val) return
        onConfig(key, val as DesignConfig[typeof key])
    }

    return (
        <Stack gap="sm">
            {AXES.map((axis) => (
                <div key={axis.key} role="group" aria-label={axis.ariaLabel}>
                    <Select
                        size="sm"
                        label={axis.label}
                        aria-label={axis.ariaLabel}
                        value={config[axis.key]}
                        onChange={handleSelectChange(axis.key)}
                        options={axis.items.map((i) => ({ value: i.value, label: i.label }))}
                    />
                </div>
            ))}
        </Stack>
    )
}
