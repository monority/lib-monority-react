import { cn } from '@/lib/cn'
import type { ContainerProps } from './Container.types'

export function Container({ ref, size = 'md', className, children, ...props }: ContainerProps) {
    return (
        <div ref={ref} className={cn('mr-container', className)} data-size={size} {...props}>
            {children}
        </div>
    )
}

export type { ContainerProps, ContainerSize } from './Container.types'
