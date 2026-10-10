import type { ReactNode } from 'react'
import { PreviewCanvas } from '@/shared/components/PreviewCanvas'

interface PlaygroundPreviewProps {
    children: ReactNode
    componentLabel: string
}

export function PlaygroundPreview({ children, componentLabel }: PlaygroundPreviewProps) {
    return (
        <section className="pg-preview" aria-label={`Preview ${componentLabel}`}>
            <p className="pg-preview__kicker">Preview</p>
            <PreviewCanvas ariaLabel={`Preview ${componentLabel}`} padding="md">
                {children}
            </PreviewCanvas>
        </section>
    )
}
