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
        <div className="pg-control">
            <label className="pg-control__label" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                className="pg-control__input"
                type="number"
                value={value}
                min={min}
                max={max}
                onChange={(event) => onChange(Number(event.target.value))}
            />
        </div>
    )
}
