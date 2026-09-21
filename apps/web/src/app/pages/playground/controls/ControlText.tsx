interface ControlTextProps {
    id: string
    label: string
    value: string
    placeholder?: string
    onChange: (value: string) => void
}

export function ControlText({ id, label, value, placeholder, onChange }: ControlTextProps) {
    return (
        <div className="pg-control">
            <label className="pg-control__label" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                className="pg-control__input"
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    )
}
