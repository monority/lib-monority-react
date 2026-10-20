import type { ReactNode } from 'react'

export interface PlaygroundStageProps {
    children: ReactNode
}

export function PlaygroundStage({ children }: PlaygroundStageProps) {
    return (
        <div className="component-playground__stage docs-preview-content">
            <div className="component-playground__canvas">{children}</div>
        </div>
    )
}
