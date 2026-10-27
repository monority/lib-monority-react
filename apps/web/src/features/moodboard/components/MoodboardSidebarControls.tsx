import { DESIGN_PRESETS, type DesignConfig, Select, Stack } from '@monority/ui'
import type { ChangeEvent } from 'react'
import { useMessages } from '@/shared/i18n'

interface AxisDefinition {
    key: keyof DesignConfig
    labelKey: 'theme' | 'accent' | 'radius' | 'spacing' | 'density' | 'chartPalette'
    ariaLabel: string
    items: readonly { value: string; label: string }[]
}

const AXES: readonly AxisDefinition[] = [
    {
        key: 'theme',
        labelKey: 'theme',
        ariaLabel: 'Theme axis',
        items: DESIGN_PRESETS.themes,
    },
    {
        key: 'accent',
        labelKey: 'accent',
        ariaLabel: 'Accent axis',
        items: DESIGN_PRESETS.accents,
    },
    {
        key: 'radius',
        labelKey: 'radius',
        ariaLabel: 'Radius axis',
        items: DESIGN_PRESETS.radii,
    },
    {
        key: 'spacing',
        labelKey: 'spacing',
        ariaLabel: 'Spacing axis',
        items: DESIGN_PRESETS.spacings,
    },
    {
        key: 'density',
        labelKey: 'density',
        ariaLabel: 'Layout density axis',
        items: DESIGN_PRESETS.densities,
    },
    {
        key: 'chartPalette',
        labelKey: 'chartPalette',
        ariaLabel: 'Chart palette axis',
        items: DESIGN_PRESETS.chartPalettes,
    },
]

export interface MoodboardSidebarControlsProps {
    config: DesignConfig
    onConfig: <K extends keyof DesignConfig>(key: K, value: DesignConfig[K]) => void
}

export function MoodboardSidebarControls({ config, onConfig }: MoodboardSidebarControlsProps) {
    const t = useMessages().moodboard
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
                        label={t.axes[axis.labelKey]}
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
