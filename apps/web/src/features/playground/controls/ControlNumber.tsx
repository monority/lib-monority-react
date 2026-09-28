import { Input } from '@monority/ui/input'

interface ControlNumberProps {
    id: string
    label: string
    value: number
    min?: number
    max?: number
    onChange: (value: number) => void
}

export function ControlNumber({ id, label, value, min, max, onChange }: ControlNumberProps) {
    return (
        <Input
            id={id}
            label={label}
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={(event) => onChange(Number(event.target.value))}
        />
    )
}
