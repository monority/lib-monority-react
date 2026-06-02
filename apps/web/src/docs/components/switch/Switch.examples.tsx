import { Switch } from '@monority/ui/switch'
import { useState } from 'react'

export function SwitchBasicExample() {
    const [checked, setChecked] = useState(false)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Switch
                label="Deployment alerts"
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <Switch label="Managed by organization" disabled />
        </div>
    )
}

export function SwitchSizesExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Switch label="Compact row" size="sm" defaultChecked />
            <Switch label="Settings form" size="md" defaultChecked />
            <Switch label="Touch target" size="lg" defaultChecked />
        </div>
    )
}

export function SwitchTonesExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Switch label="Enable feature" tone="accent" defaultChecked />
            <Switch label="Show archived" tone="neutral" defaultChecked />
            <Switch label="Delete protection" tone="danger" defaultChecked />
        </div>
    )
}

export function SwitchWithErrorExample() {
    return (
        <Switch
            label="Require two-person approval"
            invalid
            error="Approval policy is incomplete."
        />
    )
}
