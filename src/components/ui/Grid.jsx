import { createElement } from 'react'
import { cn } from '@/lib/cn'

const colsClassName = {
    2: 'cols-2',
    3: 'cols-3',
    4: 'cols-4',
}

const gapClassName = {
    sm: 'grid-gap-sm',
    md: 'grid-gap-md',
    lg: 'grid-gap-lg',
}

export function Grid({ as: Component = 'div', cols = 2, gap = 'md', className, ...props }) {
    return createElement(Component, {
        className: cn('grid', colsClassName[cols], gapClassName[gap], className),
        ...props,
    })
}
