import { Stack } from '@monority/ui/stack'

export function StackBasicExample() {
    return (
        <Stack data-surface="true">
            <strong>Review checklist</strong>
            <span style={{ color: 'var(--mr-fg-muted)' }}>
                Spacing, tone, contrast, interaction.
            </span>
        </Stack>
    )
}

export function StackGapExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Stack gap="xs" data-surface="true">
                <div>xs gap</div>
                <div>Item 2</div>
                <div>Item 3</div>
            </Stack>
            <Stack gap="md" data-surface="true">
                <div>md gap</div>
                <div>Item 2</div>
                <div>Item 3</div>
            </Stack>
            <Stack gap="xl" data-surface="true">
                <div>xl gap</div>
                <div>Item 2</div>
                <div>Item 3</div>
            </Stack>
        </div>
    )
}

export function StackHorizontalExample() {
    return (
        <Stack direction="horizontal" align="center" gap="md" data-surface="true">
            <div
                style={{
                    background: 'var(--mr-accent)',
                    color: 'var(--mr-accent-contrast)',
                    padding: '0.5rem 1rem',
                }}
            >
                Item 1
            </div>
            <div
                style={{
                    background: 'var(--mr-accent)',
                    color: 'var(--mr-accent-contrast)',
                    padding: '0.5rem 1rem',
                }}
            >
                Item 2
            </div>
            <div
                style={{
                    background: 'var(--mr-accent)',
                    color: 'var(--mr-accent-contrast)',
                    padding: '0.5rem 1rem',
                }}
            >
                Item 3
            </div>
        </Stack>
    )
}
