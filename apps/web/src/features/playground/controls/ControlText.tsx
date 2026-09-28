import { Input } from '@monority/ui/input'

interface ControlTextProps {
    id: string
    label: string
    value: string
    placeholder?: string
    onChange: (value: string) => void
}

export function ControlText({ id, label, value, placeholder, onChange }: ControlTextProps) {
    return (
        <Input
            id={id}
            label={label}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
        />
    )
}
