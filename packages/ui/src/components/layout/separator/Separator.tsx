import { cn } from '@/lib/cn'
import type { SeparatorProps } from './Separator.types'

export function Separator({
    ref,
    orientation = 'horizontal',
    decorative = false,
    className,
    ...props
}: SeparatorProps) {
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
}

export type { SeparatorProps } from './Separator.types'
