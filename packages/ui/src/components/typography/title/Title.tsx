import { createElement, forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { TitleProps } from './Title.types'

export const Title = forwardRef<HTMLElement, TitleProps>(function Title(
    { as = 'h2', size = 'md', className, children, ...props },
    ref
) {
    return createElement(
        as,
        {
            ref,
            className: cn('mr-title', className),
            'data-size': size,
            ...props,
        },
        children
    )
})

export type { TitleProps, TitleSize } from './Title.types'
