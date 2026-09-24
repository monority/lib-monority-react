import { Checkbox } from '@monority/ui/checkbox'

interface ControlBooleanProps {
    id: string
    label: string
    checked: boolean
    onChange: (value: boolean) => void
}

export function ControlBoolean({ id, label, checked, onChange }: ControlBooleanProps) {
    return (
        <Checkbox
            id={id}
            label={label}
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
        />
    )
}
