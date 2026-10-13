import { Stack, Text, ToggleGroup } from '@monority/ui'

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
        <Stack gap="xs">
            <Text size="sm" tone="muted">
                {label}
            </Text>
            <ToggleGroup
                value={value}
                onValueChange={onChange}
                items={items}
                size="sm"
                style={{ flexWrap: 'wrap', width: '100%' }}
                aria-label={ariaLabel ?? `${label} axis`}
            />
        </Stack>
    )
}
