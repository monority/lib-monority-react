import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DocSectionProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    id?: string
    kicker?: string
    title: string
    description?: string
    action?: ReactNode
    children: ReactNode
}

export function DocSection({
    ref,
    id,
    kicker,
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
                    {kicker && <span className="docs-kicker">{kicker}</span>}
                    <h2 id={id ? `${id}-heading` : undefined} className="docs-section-card__title">
                        {id ? (
                            <a href={`#${id}`} className="docs-section-card__anchor">
                                <span>{title}</span>
                                <span className="docs-section-card__hash" aria-hidden="true">
                                    #
                                </span>
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
