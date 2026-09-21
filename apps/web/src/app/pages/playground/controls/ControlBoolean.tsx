interface ControlBooleanProps {
    id: string
    label: string
    checked: boolean
    onChange: (value: boolean) => void
}

export function ControlBoolean({ id, label, checked, onChange }: ControlBooleanProps) {
    return (
        <div className="pg-control pg-control--boolean">
            <input
                id={id}
                className="pg-control__checkbox"
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
            />
            <label className="pg-control__label" htmlFor={id}>
                {label}
            </label>
        </div>
    )
}
