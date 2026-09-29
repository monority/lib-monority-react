import { Button } from '@monority/ui/button'
import { HoverCard } from '@monority/ui/hover-card'

export function HoverCardBasicExample() {
    return (
        <HoverCard
            content={
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <div
                        style={{
                            color: 'var(--mr-text-primary)',
                            fontSize: 'var(--mr-fs-14)',
                            fontWeight: 600,
                        }}
                    >
                        Release note
                    </div>
                    <div style={{ color: 'var(--mr-text-secondary)', fontSize: 'var(--mr-fs-14)' }}>
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
                <div style={{ color: 'var(--mr-text-secondary)', fontSize: 'var(--mr-fs-14)' }}>
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
                    <div style={{ color: 'var(--mr-text-secondary)', fontSize: 'var(--mr-fs-14)' }}>
                        Top side
                    </div>
                }
                side="top"
            >
                <Button variant="secondary">Top</Button>
            </HoverCard>
            <HoverCard
                content={
                    <div style={{ color: 'var(--mr-text-secondary)', fontSize: 'var(--mr-fs-14)' }}>
                        Bottom side
                    </div>
                }
                side="bottom"
            >
                <Button variant="secondary">Bottom</Button>
            </HoverCard>
            <HoverCard
                content={
                    <div style={{ color: 'var(--mr-text-secondary)', fontSize: 'var(--mr-fs-14)' }}>
                        Left side
                    </div>
                }
                side="left"
            >
                <Button variant="secondary">Left</Button>
            </HoverCard>
            <HoverCard
                content={
                    <div style={{ color: 'var(--mr-text-secondary)', fontSize: 'var(--mr-fs-14)' }}>
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
                <div style={{ color: 'var(--mr-text-secondary)', fontSize: 'var(--mr-fs-14)' }}>
                    Default open helps preview authored content in docs.
                </div>
            }
            defaultOpen
        >
            <Button variant="ghost">Always open</Button>
        </HoverCard>
    )
}
