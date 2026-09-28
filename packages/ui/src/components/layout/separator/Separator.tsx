import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { SeparatorProps } from './Separator.types'

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
    { orientation = 'horizontal', decorative = false, className, ...props },
    ref
) {
    const role = decorative ? 'presentation' : 'separator'

    return (
        <div
            ref={ref}
            className={cn('mr-separator', className)}
            role={role}
            aria-orientation={!decorative ? orientation : undefined}
            data-orientation={orientation}
            {...props}
        />
    )
})

export type { SeparatorProps } from './Separator.types'
