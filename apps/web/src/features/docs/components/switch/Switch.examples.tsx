import { Switch } from '@monority/ui/switch'
import { Stack } from '@monority/ui/stack'
import { useState } from 'react'

export function SwitchBasicExample() {
    const [checked, setChecked] = useState(false)
    return (
        <Stack gap="sm">
            <Switch
                label="Deployment alerts"
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <Switch label="Managed by organization" disabled />
        </Stack>
    )
}

export function SwitchSizesExample() {
    return (
        <Stack gap="sm">
            <Switch
                data-testid="switch-compact"
                label="Compact row with a longer description"
                hint="Aligned against the full content block"
                size="sm"
                defaultChecked
            />
            <Switch data-testid="switch-medium" label="Settings form" size="md" defaultChecked />
            <Switch data-testid="switch-large" label="Touch target" size="lg" defaultChecked />
        </Stack>
    )
}

export function SwitchTonesExample() {
    return (
        <Stack gap="sm">
            <Switch label="Enable feature" tone="accent" defaultChecked />
            <Switch label="Show archived" tone="neutral" defaultChecked />
            <Switch label="Delete protection" tone="danger" defaultChecked />
        </Stack>
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
