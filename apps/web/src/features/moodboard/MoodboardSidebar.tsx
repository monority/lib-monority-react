import { DESIGN_PRESETS, type DesignConfig } from '@monority/ui'
import { DesignAxisField } from './components/DesignAxisField'
import { MoodboardSidebarHeader } from './components/MoodboardSidebarHeader'
import { MoodboardTokenDetails } from './components/MoodboardTokenDetails'

export interface MoodboardSidebarProps {
    config: DesignConfig
    onConfig: <K extends keyof DesignConfig>(key: K, value: DesignConfig[K]) => void
    onReset: () => void
    onCopy: () => void
    copied: boolean
}

interface AxisDef {
    key: keyof DesignConfig
    label: string
    ariaLabel: string
    items: readonly { value: string; label: string }[]
}

const AXIS_DEFINITIONS: readonly AxisDef[] = [
    { key: 'theme', label: 'Theme', ariaLabel: 'Theme axis', items: DESIGN_PRESETS.themes },
    { key: 'brand', label: 'Brand', ariaLabel: 'Brand axis', items: DESIGN_PRESETS.brands },
    { key: 'accent', label: 'Accent', ariaLabel: 'Accent axis', items: DESIGN_PRESETS.accents },
    {
        key: 'componentColor',
        label: 'Components',
        ariaLabel: 'Component color axis',
        items: DESIGN_PRESETS.componentColors,
    },
    {
        key: 'chartPalette',
        label: 'Charts',
        ariaLabel: 'Chart palette axis',
        items: DESIGN_PRESETS.chartPalettes,
    },
    { key: 'radius', label: 'Radius', ariaLabel: 'Radius axis', items: DESIGN_PRESETS.radii },
    { key: 'spacing', label: 'Spacing', ariaLabel: 'Spacing axis', items: DESIGN_PRESETS.spacings },
    {
        key: 'density',
        label: 'Layout',
        ariaLabel: 'Layout density axis',
        items: DESIGN_PRESETS.densities,
    },
]

export function MoodboardSidebar({
    config,
    onConfig,
    onReset,
    onCopy,
    copied,
}: MoodboardSidebarProps) {
    const handleValue = (key: keyof DesignConfig) => (value: string | string[]) => {
        const v = Array.isArray(value) ? (value[0] ?? '') : String(value)
        if (v === '') return
        onConfig(key, v as DesignConfig[typeof key])
    }

    return (
        <div className="moodboard-sidebar" role="region" aria-label="Design configuration">
            <MoodboardSidebarHeader onCopy={onCopy} onReset={onReset} copied={copied} />

            <div className="moodboard-sidebar__axes">
                {AXIS_DEFINITIONS.map((axis) => (
                    <DesignAxisField
                        key={axis.key}
                        label={axis.label}
                        ariaLabel={axis.ariaLabel}
                        value={config[axis.key]}
                        onChange={handleValue(axis.key)}
                        items={axis.items as { value: string; label: string }[]}
                    />
                ))}
            </div>

            <MoodboardTokenDetails config={config} />
        </div>
    )
}
