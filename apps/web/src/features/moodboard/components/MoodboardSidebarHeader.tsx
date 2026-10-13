import { Button, Stack, Text } from '@monority/ui'

export interface MoodboardSidebarHeaderProps {
    onCopy: () => void
    onReset: () => void
    copied: boolean
}

export function MoodboardSidebarHeader({ onCopy, onReset, copied }: MoodboardSidebarHeaderProps) {
    return (
        <Stack direction="horizontal" justify="between" align="center" gap="xs">
            <Stack gap="xs">
                <Text size="sm" tone="muted">
                    MONORITY UI
                </Text>
                <Text size="md" tone="strong">
                    Design Studio
                </Text>
            </Stack>
            <Stack direction="horizontal" gap="xs">
                <Button variant="ghost" size="sm" onClick={onCopy} data-testid="moodboard-copy">
                    {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onReset}
                    data-testid="moodboard-reset"
                >
                    Reset
                </Button>
            </Stack>
        </Stack>
    )
}
