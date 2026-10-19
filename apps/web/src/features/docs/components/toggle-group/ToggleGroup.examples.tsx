import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { ToggleGroup } from '@monority/ui/toggle-group'
import { useState } from 'react'

const formatItems = [
    { value: 'bold', label: 'Bold' },
    { value: 'italic', label: 'Italic' },
    { value: 'underline', label: 'Underline' },
]

const alignItems = [
    { value: 'open', label: 'Open' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'closed', label: 'Closed' },
]

const viewItems = [
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List' },
    { value: 'table', label: 'Table' },
]

export function ToggleGroupSinglePreview() {
    const [value, setValue] = useState<string>('')
    return (
        <Stack gap="sm">
            <ToggleGroup
                items={alignItems}
                type="single"
                value={value}
                onValueChange={(next) => setValue(next as string)}
            />
            <Text.Small>Status: {value || 'all'}</Text.Small>
        </Stack>
    )
}

export function ToggleGroupMultipleExample() {
    const [value, setValue] = useState<string[]>([])
    return (
        <Stack gap="sm">
            <ToggleGroup
                items={formatItems}
                type="multiple"
                value={value}
                onValueChange={(next) => setValue(next as string[])}
            />
            <Text.Small>Formatting: {value.length > 0 ? value.join(', ') : 'none'}</Text.Small>
        </Stack>
    )
}

export function ToggleGroupDisabledExample() {
    const itemsWithDisabled = [
        { value: 'grid', label: 'Grid' },
        { value: 'list', label: 'List', disabled: true },
        { value: 'table', label: 'Table' },
    ]
    return (
        <Stack gap="sm">
            <ToggleGroup items={itemsWithDisabled} type="single" />
            <Text.Small>List view is unavailable for this dataset</Text.Small>
        </Stack>
    )
}

export function ToggleGroupVerticalExample() {
    return <ToggleGroup items={viewItems} type="single" orientation="vertical" />
}

export function ToggleGroupVariantsExample() {
    return (
        <Stack gap="md">
            <Stack gap="xs">
                <Text.Small tone="muted">Default</Text.Small>
                <ToggleGroup items={alignItems} variant="default" />
            </Stack>
            <Stack gap="xs">
                <Text.Small tone="muted">Outline</Text.Small>
                <ToggleGroup items={alignItems} variant="outline" />
            </Stack>
        </Stack>
    )
}

export function ToggleGroupSizesExample() {
    return (
        <Stack gap="md">
            <Stack gap="xs">
                <Text.Small tone="muted">Small</Text.Small>
                <ToggleGroup items={alignItems} size="sm" />
            </Stack>
            <Stack gap="xs">
                <Text.Small tone="muted">Medium</Text.Small>
                <ToggleGroup items={alignItems} size="md" />
            </Stack>
            <Stack gap="xs">
                <Text.Small tone="muted">Large</Text.Small>
                <ToggleGroup items={alignItems} size="lg" />
            </Stack>
        </Stack>
    )
}

export function ToggleGroupTonesExample() {
    return (
        <Stack gap="md">
            <Stack gap="xs">
                <Text.Small tone="muted">Neutral</Text.Small>
                <ToggleGroup items={alignItems} tone="neutral" />
            </Stack>
            <Stack gap="xs">
                <Text.Small tone="muted">Accent</Text.Small>
                <ToggleGroup items={alignItems} tone="accent" />
            </Stack>
        </Stack>
    )
}

export function ToggleGroupCompoundExample() {
    const [value, setValue] = useState('center')
    return (
        <Stack gap="xs">
            <ToggleGroup type="single" value={value} onValueChange={(v) => setValue(v as string)}>
                <ToggleGroup.Item value="left">Gauche</ToggleGroup.Item>
                <ToggleGroup.Item value="center">Centre</ToggleGroup.Item>
                <ToggleGroup.Item value="right">Droite</ToggleGroup.Item>
            </ToggleGroup>
            <Text.Small tone="muted">Alignement actif : {value}</Text.Small>
        </Stack>
    )
}
