import { useState } from 'react'
import { Toggle } from '@monority/ui/toggle'

export function ToggleBasicPreview() {
    return <Toggle>Preview</Toggle>
}

export function ToggleVariantsExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
            <Toggle>Active only</Toggle>
            <Toggle variant="outline">Include drafts</Toggle>
        </div>
    )
}

export function ToggleSizesExample() {
    return (
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Toggle size="sm">Dense</Toggle>
            <Toggle size="md">Default</Toggle>
            <Toggle size="lg">Touch</Toggle>
        </div>
    )
}

export function ToggleControlledExample() {
    const [pressed, setPressed] = useState(false)
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', alignItems: 'center' }}>
            <Toggle pressed={pressed} onPressedChange={setPressed}>
                Auto refresh
            </Toggle>
            <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
                {pressed ? 'Updates every minute' : 'Manual refresh'}
            </span>
        </div>
    )
}

export function ToggleDisabledExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
            <Toggle disabled>Locked filter</Toggle>
            <Toggle disabled defaultPressed>
                Required filter
            </Toggle>
        </div>
    )
}
