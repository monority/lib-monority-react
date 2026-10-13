import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DocSectionProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    id?: string
    title: string
    description?: string
    action?: ReactNode
    children: ReactNode
}

export function DocSection({
    ref,
    id,
    title,
    description,
    action,
    children,
    className = '',
    ...props
}: DocSectionProps) {
    return (
        <section
            ref={ref}
            id={id}
            className={`docs-section-card ${className}`.trim()}
            aria-labelledby={id ? `${id}-heading` : undefined}
            {...props}
        >
            <div className="docs-section-card__header">
                <div className="docs-section-card__title-group">
                    <h2 id={id ? `${id}-heading` : undefined} className="docs-section-card__title">
                        {id ? (
                            <a href={`#${id}`} className="docs-section-card__anchor">
                                {title}
                            </a>
                        ) : (
                            title
                        )}
                    </h2>
                    {description && <p className="docs-section-card__desc">{description}</p>}
                </div>
                {action && <div className="docs-section-card__action">{action}</div>}
            </div>
            <div className="docs-section-card__content">{children}</div>
        </section>
    )
}
