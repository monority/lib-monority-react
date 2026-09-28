import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { CalloutProps } from './Callout.types'

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(function Callout(
    { tone = 'neutral', title, description, children, className, role = 'note', ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={cn('mr-callout', className)}
            role={role}
            data-tone={tone}
            {...props}
        >
            <div className="mr-callout__indicator" aria-hidden="true" />
            <div className="mr-callout__content">
                {title ? <strong className="mr-callout__title">{title}</strong> : null}
                {description ? <p className="mr-callout__description">{description}</p> : null}
                {children}
            </div>
        </div>
    )
})

export type { CalloutProps, CalloutTone } from './Callout.types'
