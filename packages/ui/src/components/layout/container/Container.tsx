import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { ContainerProps } from './Container.types'

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
    { size = 'md', className, children, ...props },
    ref
) {
    return (
        <div ref={ref} className={cn('mr-container', className)} data-size={size} {...props}>
            {children}
        </div>
    )
})

export type { ContainerProps, ContainerSize } from './Container.types'
