import { useState } from 'react'
import { NumberInput } from '@monority/ui/number-input'

export function NumberInputBasicPreview() {
    return <NumberInput label="Quantity" defaultValue={1} min={0} max={10} step={1} />
}

export function NumberInputControlledExample() {
    const [value, setValue] = useState<number | null>(5)
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-2)', maxWidth: '320px' }}>
            <NumberInput
                label="Tickets"
                hint="Select between 1 and 20"
                value={value}
                onValueChange={setValue}
                min={1}
                max={20}
            />
            <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
                Current value: {value ?? 'none'}
            </span>
        </div>
    )
}

export function NumberInputSizesExample() {
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-3)', maxWidth: '320px' }}>
            <NumberInput label="Small size" size="sm" defaultValue={10} />
            <NumberInput label="Medium size" size="md" defaultValue={20} />
            <NumberInput label="Large size" size="lg" defaultValue={30} />
        </div>
    )
}

export function NumberInputTonesExample() {
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-3)', maxWidth: '320px' }}>
            <NumberInput label="Neutral tone" tone="neutral" defaultValue={5} />
            <NumberInput label="Accent tone" tone="accent" defaultValue={10} />
            <NumberInput label="Danger tone" tone="danger" defaultValue={15} />
        </div>
    )
}

export function NumberInputStatesExample() {
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-3)', maxWidth: '320px' }}>
            <NumberInput label="Disabled input" disabled defaultValue={42} />
            <NumberInput label="Read-only input" readOnly defaultValue={100} />
            <NumberInput
                label="With error"
                error="Value must be at least 10"
                defaultValue={3}
                invalid
            />
        </div>
    )
}
