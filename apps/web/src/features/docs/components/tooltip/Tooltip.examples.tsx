import { Button } from '@monority/ui/button'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { Tooltip } from '@monority/ui/tooltip'

export function TooltipBasicExample() {
    return (
        <Tooltip>
            <Tooltip.Trigger>
                <Button>Hover me</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Inspect token details</Tooltip.Content>
        </Tooltip>
    )
}

export function TooltipWithRichContentExample() {
    return (
        <Tooltip>
            <Tooltip.Trigger>
                <Button variant="secondary">Rich content</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                <Stack gap="xs">
                    <Text.Strong size="sm">Token preview</Text.Strong>
                    <Text.Small tone="muted">
                        Spacing values inherit from the core scale.
                    </Text.Small>
                </Stack>
            </Tooltip.Content>
        </Tooltip>
    )
}

export function TooltipOnIconButtonExample() {
    return (
        <Tooltip>
            <Tooltip.Trigger>
                <Button iconOnly aria-label="Delete" variant="danger">
                    <Text.Span>{'\u2715'}</Text.Span>
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Delete item</Tooltip.Content>
        </Tooltip>
    )
}
