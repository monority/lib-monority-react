import type { ReactNode, Ref } from 'react'
import './PreviewCanvas.css'

export interface PreviewCanvasProps {
    label?: string
    actions?: ReactNode
    children: ReactNode
    padding?: 'none' | 'sm' | 'md' | 'lg'
    className?: string
    ariaLabel?: string
    ref?: Ref<HTMLDivElement>
}

export function PreviewCanvas({
    label,
    actions,
    children,
    padding = 'md',
    className = '',
    ariaLabel,
    ref,
}: PreviewCanvasProps) {
    const hasHeader = Boolean(label || actions)

    return (
        <div
            ref={ref}
            className={`preview-canvas ${className}`.trim()}
            role={ariaLabel ? 'region' : undefined}
            aria-label={ariaLabel}
        >
            {hasHeader && (
                <div className="preview-canvas__header">
                    {label ? <span className="preview-canvas__label">{label}</span> : <div />}
                    {actions && <div className="preview-canvas__actions">{actions}</div>}
                </div>
            )}
            <div className={`preview-canvas__body preview-canvas__body--padding-${padding}`}>
                {children}
            </div>
        </div>
    )
}
