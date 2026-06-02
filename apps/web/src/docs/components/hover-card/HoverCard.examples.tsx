import { Button } from '@/components/actions/button/Button'
import { HoverCard } from '@monority/ui/hover-card'

export function HoverCardBasicExample() {
    return (
        <HoverCard
            content={
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <div
                        style={{
                            color: 'var(--mr-fg-strong)',
                            fontSize: 'var(--mr-text-sm)',
                            fontWeight: 600,
                        }}
                    >
                        Release note
                    </div>
                    <div style={{ color: 'var(--mr-fg-muted)', fontSize: 'var(--mr-text-sm)' }}>
                        Hover cards are useful for compact supporting detail without interrupting
                        the main flow.
                    </div>
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
                <div style={{ color: 'var(--mr-fg-muted)', fontSize: 'var(--mr-text-sm)' }}>
                    Slower reveal for dense data surfaces or crowded tables.
                </div>
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
            <HoverCard
                content={
                    <div style={{ color: 'var(--mr-fg-muted)', fontSize: 'var(--mr-text-sm)' }}>
                        Top side
                    </div>
                }
                side="top"
            >
                <Button variant="secondary">Top</Button>
            </HoverCard>
            <HoverCard
                content={
                    <div style={{ color: 'var(--mr-fg-muted)', fontSize: 'var(--mr-text-sm)' }}>
                        Bottom side
                    </div>
                }
                side="bottom"
            >
                <Button variant="secondary">Bottom</Button>
            </HoverCard>
            <HoverCard
                content={
                    <div style={{ color: 'var(--mr-fg-muted)', fontSize: 'var(--mr-text-sm)' }}>
                        Left side
                    </div>
                }
                side="left"
            >
                <Button variant="secondary">Left</Button>
            </HoverCard>
            <HoverCard
                content={
                    <div style={{ color: 'var(--mr-fg-muted)', fontSize: 'var(--mr-text-sm)' }}>
                        Right side
                    </div>
                }
                side="right"
            >
                <Button variant="secondary">Right</Button>
            </HoverCard>
        </div>
    )
}

export function HoverCardControlledExample() {
    return (
        <HoverCard
            content={
                <div style={{ color: 'var(--mr-fg-muted)', fontSize: 'var(--mr-text-sm)' }}>
                    Default open helps preview authored content in docs.
                </div>
            }
            defaultOpen
        >
            <Button variant="ghost">Always open</Button>
        </HoverCard>
    )
}
