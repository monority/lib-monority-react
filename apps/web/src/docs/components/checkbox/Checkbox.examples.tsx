import { Checkbox } from '@monority/ui/checkbox'

export function CheckboxBasicExample() {
    return (
        <>
            <Checkbox label="Send weekly summary" />
            <Checkbox label="Include failed jobs" defaultChecked />
        </>
    )
}

export function CheckboxDisabledExample() {
    return (
        <>
            <Checkbox label="Inherited from workspace" disabled />
            <Checkbox label="Required by policy" disabled defaultChecked />
        </>
    )
}

export function CheckboxWithErrorExample() {
    return (
        <div style={{ display: 'grid', gap: '0.375rem' }}>
            <Checkbox label="Confirm retention policy" invalid />
            <span style={{ fontSize: '0.8125rem', color: 'var(--mr-danger)' }}>
                Required before archiving this workspace.
            </span>
        </div>
    )
}

export function CheckboxWithDescriptionExample() {
    return (
        <div style={{ display: 'grid', gap: '0.375rem' }}>
            <Checkbox label="Enable notifications" defaultChecked />
            <span style={{ fontSize: '0.8125rem', color: 'var(--mr-fg-muted)' }}>
                Send alerts when deployment checks fail.
            </span>
        </div>
    )
}

export function CheckboxIndeterminateExample() {
    return <Checkbox label="3 of 8 projects selected" indeterminate />
}
