import { DESIGN_PRESETS, Stack, Text, ToggleGroup, type DesignConfig } from '@monority/ui'

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
        key: 'brand',
        label: 'Brand',
        ariaLabel: 'Brand axis',
        items: DESIGN_PRESETS.brands,
    },
    {
        key: 'accent',
        label: 'Accent',
        ariaLabel: 'Accent axis',
        items: DESIGN_PRESETS.accents,
    },
    {
        key: 'componentColor',
        label: 'Component Color',
        ariaLabel: 'Component color axis',
        items: DESIGN_PRESETS.componentColors,
    },
    {
        key: 'chartPalette',
        label: 'Chart Palette',
        ariaLabel: 'Chart palette axis',
        items: DESIGN_PRESETS.chartPalettes,
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
]

export interface MoodboardSidebarControlsProps {
    config: DesignConfig
    onConfig: <K extends keyof DesignConfig>(key: K, value: DesignConfig[K]) => void
}

export function MoodboardSidebarControls({ config, onConfig }: MoodboardSidebarControlsProps) {
    const handleChange = (key: keyof DesignConfig) => (val: string | string[]) => {
        const v = Array.isArray(val) ? (val[0] ?? '') : String(val)
        if (!v) return
        onConfig(key, v as DesignConfig[typeof key])
    }

    return (
        <Stack gap="md">
            {AXES.map((axis) => (
                <div key={axis.key}>
                    <Text
                        tone="muted"
                        size="sm"
                        style={{
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            fontSize: '0.6875rem',
                            marginBottom: 'var(--mr-space-1)',
                            display: 'block',
                        }}
                    >
                        {axis.label}
                    </Text>
                    <ToggleGroup
                        size="sm"
                        value={config[axis.key]}
                        onValueChange={handleChange(axis.key)}
                        items={axis.items.map((i) => ({ value: i.value, label: i.label }))}
                        aria-label={axis.ariaLabel}
                    />
                </div>
            ))}
        </Stack>
    )
}
