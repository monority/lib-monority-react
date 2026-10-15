import { useState } from 'react'
import { ToggleGroup } from '@monority/ui/toggle-group'
import { Text } from '@monority/ui/text'

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <ToggleGroup
                items={alignItems}
                type="single"
                value={value}
                onValueChange={(next) => setValue(next as string)}
            />
            <Text.Small>Status: {value || 'all'}</Text.Small>
        </div>
    )
}

export function ToggleGroupMultipleExample() {
    const [value, setValue] = useState<string[]>([])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <ToggleGroup
                items={formatItems}
                type="multiple"
                value={value}
                onValueChange={(next) => setValue(next as string[])}
            />
            <Text.Small>Formatting: {value.length > 0 ? value.join(', ') : 'none'}</Text.Small>
        </div>
    )
}

export function ToggleGroupDisabledExample() {
    const itemsWithDisabled = [
        { value: 'grid', label: 'Grid' },
        { value: 'list', label: 'List', disabled: true },
        { value: 'table', label: 'Table' },
    ]
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
            <ToggleGroup items={itemsWithDisabled} type="single" />
            <Text.Small>List view is unavailable for this dataset</Text.Small>
        </div>
    )
}

export function ToggleGroupVerticalExample() {
    return <ToggleGroup items={viewItems} type="single" orientation="vertical" />
}

export function ToggleGroupVariantsExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-4)' }}>
            <div>
                <Text.Small style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}>
                    Default
                </Text.Small>
                <ToggleGroup items={alignItems} variant="default" />
            </div>
            <div>
                <Text.Small style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}>
                    Outline
                </Text.Small>
                <ToggleGroup items={alignItems} variant="outline" />
            </div>
        </div>
    )
}

export function ToggleGroupSizesExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-4)' }}>
            <div>
                <Text.Small style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}>
                    Small
                </Text.Small>
                <ToggleGroup items={alignItems} size="sm" />
            </div>
            <div>
                <Text.Small style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}>
                    Medium
                </Text.Small>
                <ToggleGroup items={alignItems} size="md" />
            </div>
            <div>
                <Text.Small style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}>
                    Large
                </Text.Small>
                <ToggleGroup items={alignItems} size="lg" />
            </div>
        </div>
    )
}
