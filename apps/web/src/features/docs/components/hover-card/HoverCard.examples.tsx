import { Button } from '@monority/ui/button'
import { HoverCard } from '@monority/ui/hover-card'
import { Text } from '@monority/ui/text'

export function HoverCardBasicExample() {
    return (
        <HoverCard
            content={
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <Text.Strong size="sm">Release note</Text.Strong>
                    <Text.Muted size="sm">
                        Hover cards are useful for compact supporting detail without interrupting
                        the main flow.
                    </Text.Muted>
                </div>
            }
        >
            <Button>Preview note</Button>
        </HoverCard>
    )
}

export function HoverCardCustomDelayExample() {
    return (
        <HoverCard
            content={
                <Text.Muted size="sm">
                    Slower reveal for dense data surfaces or crowded tables.
                </Text.Muted>
            }
            openDelay={1000}
            closeDelay={500}
        >
            <Button variant="secondary">Slow hover</Button>
        </HoverCard>
    )
}

export function HoverCardSidesExample() {
    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <HoverCard content={<Text.Muted size="sm">Top side</Text.Muted>} side="top">
                <Button variant="secondary">Top</Button>
            </HoverCard>
            <HoverCard content={<Text.Muted size="sm">Bottom side</Text.Muted>} side="bottom">
                <Button variant="secondary">Bottom</Button>
            </HoverCard>
            <HoverCard content={<Text.Muted size="sm">Left side</Text.Muted>} side="left">
                <Button variant="secondary">Left</Button>
            </HoverCard>
            <HoverCard content={<Text.Muted size="sm">Right side</Text.Muted>} side="right">
                <Button variant="secondary">Right</Button>
            </HoverCard>
        </div>
    )
}

export function HoverCardControlledExample() {
    return (
        <HoverCard
            content={
                <Text.Muted size="sm">
                    Default open helps preview authored content in docs.
                </Text.Muted>
            }
            defaultOpen
        >
            <Button variant="ghost">Always open</Button>
        </HoverCard>
    )
}
