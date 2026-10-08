import { cn } from '@/lib/cn'
import type { DividerProps } from './Divider.types'

export function Divider({
    ref,
    className,
    label,
    children,
    orientation = 'horizontal',
    ...props
}: DividerProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-divider', className)}
            role="separator"
            aria-orientation={orientation}
            data-orientation={orientation}
            {...props}
        >
            {label || children ? (
                <span className="mr-divider__label">{label ?? children}</span>
            ) : null}
        </div>
    )
}

export type { DividerProps } from './Divider.types'
