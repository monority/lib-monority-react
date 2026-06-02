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
        <AspectRatio>
            <iframe
                src="https://www.youtube.com/embed/dQw4W9WgXcQ"
                title="Video"
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
            />
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
