import { Select } from '@monority/ui/select'

interface ControlSelectProps {
    id: string
    label: string
    value: string
    options: readonly string[]
    onChange: (value: string) => void
}

export function ControlSelect({ id, label, value, options, onChange }: ControlSelectProps) {
    return (
        <Select
            id={id}
            label={label}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </Select>
    )
}
