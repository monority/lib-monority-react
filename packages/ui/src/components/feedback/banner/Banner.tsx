import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { BannerProps } from './Banner.types'

export const Banner = forwardRef<HTMLElement, BannerProps>(function Banner(
    { tone, eyebrow, title, description, actions, className, children, ...props },
    ref
) {
    const resolvedTone = tone ?? 'info'
    const hasStructuredContent = Boolean(eyebrow || title || description)

    return (
        <section
            ref={ref}
            className={cn('mr-banner', className)}
            data-tone={resolvedTone}
            {...props}
        >
            <div className="mr-banner__marker" aria-hidden="true" />
            <div className="mr-banner__body">
                {hasStructuredContent ? (
                    <>
                        {eyebrow ? <span className="mr-banner__eyebrow">{eyebrow}</span> : null}
                        {title ? <strong className="mr-banner__title">{title}</strong> : null}
                        {description ? (
                            <p className="mr-banner__description">{description}</p>
                        ) : null}
                    </>
                ) : children ? (
                    <p className="mr-banner__description">{children}</p>
                ) : null}
            </div>
            {actions ? <div className="mr-banner__actions">{actions}</div> : null}
        </section>
    )
})

export type { BannerProps, BannerTone } from './Banner.types'
