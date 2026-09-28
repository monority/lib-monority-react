import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { SpinnerProps } from './Spinner.types'

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
    { size = 'md', tone = 'base', className, ...props },
    ref
) {
    return (
        <span
            ref={ref}
            className={cn('mr-spinner', className)}
            role="status"
            aria-label="Loading"
            data-size={size}
            data-tone={tone}
            {...props}
        >
            <span className="mr-spinner__ring" />
        </span>
    )
})

export type { SpinnerProps, SpinnerSize, SpinnerTone } from './Spinner.types'
