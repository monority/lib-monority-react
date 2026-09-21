interface ControlSelectProps {
    id: string
    label: string
    value: string
    options: readonly string[]
    onChange: (value: string) => void
}

export function ControlSelect({ id, label, value, options, onChange }: ControlSelectProps) {
    return (
        <div className="pg-control">
            <label className="pg-control__label" htmlFor={id}>
                {label}
            </label>
            <select
                id={id}
                className="pg-control__select"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}
