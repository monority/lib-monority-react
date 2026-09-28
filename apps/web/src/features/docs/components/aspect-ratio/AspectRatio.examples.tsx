import { AspectRatio } from '@monority/ui/aspect-ratio'

export function AspectRatioBasicExample() {
    return (
        <AspectRatio style={{ background: 'var(--mr-bg-control)' }}>
            <span>16:9 content</span>
        </AspectRatio>
    )
}

export function AspectRatioVideoExample() {
    return (
        <AspectRatio style={{ background: 'var(--mr-bg-control)' }}>
            {/* CSP-safe stand-in for an embedded player: the ratio box is the demo. */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--mr-fg-muted)',
                    fontSize: 'var(--mr-text-sm)',
                }}
            >
                ▶ 16:9 video placeholder
            </div>
        </AspectRatio>
    )
}

export function AspectRatioSquareExample() {
    return (
        <AspectRatio ratio={1} style={{ background: 'var(--mr-bg-control)' }}>
            <span>1:1 square</span>
        </AspectRatio>
    )
}

export function AspectRatioFourThreeExample() {
    return (
        <AspectRatio ratio={4 / 3} style={{ background: 'var(--mr-bg-control)' }}>
            <span>4:3 content</span>
        </AspectRatio>
    )
}
