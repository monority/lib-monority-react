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
        <Checkbox label="Confirm retention policy" error="Required before archiving this workspace." />
    )
}

export function CheckboxWithDescriptionExample() {
    return (
        <Checkbox
            label="Enable notifications"
            defaultChecked
            hint="Send alerts when deployment checks fail."
        />
    )
}

export function CheckboxIndeterminateExample() {
    return <Checkbox label="3 of 8 projects selected" indeterminate />
}
