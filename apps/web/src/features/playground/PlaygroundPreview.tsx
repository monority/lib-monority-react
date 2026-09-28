import type { ReactNode } from 'react'

interface PlaygroundPreviewProps {
    children: ReactNode
    componentLabel: string
}

export function PlaygroundPreview({ children, componentLabel }: PlaygroundPreviewProps) {
    return (
        <section className="pg-preview" aria-label={`Preview ${componentLabel}`}>
            <p className="pg-preview__kicker">Preview</p>
            <div className="pg-preview__canvas">{children}</div>
        </section>
    )
}
