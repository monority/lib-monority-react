import { Button } from '@monority/ui/button'
import { HoverCard } from '@monority/ui/hover-card'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'

export function HoverCardBasicExample() {
    return (
        <HoverCard>
            <HoverCard.Trigger>
                <Button>Preview note</Button>
            </HoverCard.Trigger>
            <HoverCard.Content>
                <Stack gap="xs">
                    <Text.Strong size="sm">Release note</Text.Strong>
                    <Text.Muted size="sm">
                        Hover cards are useful for compact supporting detail without interrupting
                        the main flow.
                    </Text.Muted>
                </Stack>
            </HoverCard.Content>
        </HoverCard>
    )
}

export function HoverCardCustomDelayExample() {
    return (
        <HoverCard openDelay={1000} closeDelay={500}>
            <HoverCard.Trigger>
                <Button variant="secondary">Slow hover</Button>
            </HoverCard.Trigger>
            <HoverCard.Content>
                <Text.Muted size="sm">
                    Slower reveal for dense data surfaces or crowded tables.
                </Text.Muted>
            </HoverCard.Content>
        </HoverCard>
    )
}

export function HoverCardSidesExample() {
    return (
        <Stack direction="horizontal" gap="md">
            <HoverCard side="top">
                <HoverCard.Trigger>
                    <Button variant="secondary">Top</Button>
                </HoverCard.Trigger>
                <HoverCard.Content>
                    <Text.Muted size="sm">Top side</Text.Muted>
                </HoverCard.Content>
            </HoverCard>
            <HoverCard side="bottom">
                <HoverCard.Trigger>
                    <Button variant="secondary">Bottom</Button>
                </HoverCard.Trigger>
                <HoverCard.Content>
                    <Text.Muted size="sm">Bottom side</Text.Muted>
                </HoverCard.Content>
            </HoverCard>
            <HoverCard side="left">
                <HoverCard.Trigger>
                    <Button variant="secondary">Left</Button>
                </HoverCard.Trigger>
                <HoverCard.Content>
                    <Text.Muted size="sm">Left side</Text.Muted>
                </HoverCard.Content>
            </HoverCard>
            <HoverCard side="right">
                <HoverCard.Trigger>
                    <Button variant="secondary">Right</Button>
                </HoverCard.Trigger>
                <HoverCard.Content>
                    <Text.Muted size="sm">Right side</Text.Muted>
                </HoverCard.Content>
            </HoverCard>
        </Stack>
    )
}

export function HoverCardControlledExample() {
    return (
        <HoverCard defaultOpen>
            <HoverCard.Trigger>
                <Button variant="ghost">Always open</Button>
            </HoverCard.Trigger>
            <HoverCard.Content>
                <Text.Muted size="sm">
                    Default open helps preview authored content in docs.
                </Text.Muted>
            </HoverCard.Content>
        </HoverCard>
    )
}
