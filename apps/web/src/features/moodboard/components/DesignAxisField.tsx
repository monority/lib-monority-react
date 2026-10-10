import { ToggleGroup } from '@monority/ui'

export interface DesignAxisFieldProps {
    label: string
    value: string
    onChange: (value: string | string[]) => void
    items: { value: string; label: string }[]
    ariaLabel?: string
}

export function DesignAxisField({
    label,
    value,
    onChange,
    items,
    ariaLabel,
}: DesignAxisFieldProps) {
    return (
        <div className="moodboard-axis">
            <span className="moodboard-kicker">{label}</span>
            <ToggleGroup
                value={value}
                onValueChange={onChange}
                items={items}
                aria-label={ariaLabel ?? `${label} axis`}
            />
        </div>
    )
}
