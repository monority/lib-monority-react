import { createElement } from 'react'
import { cn } from '@/lib/cn'

const sizeClassName = {
    sm: 'ui-title--sm',
    md: 'ui-title--md',
    lg: 'ui-title--lg',
    display: 'ui-title--display',
}

export function Title({ as: Component = 'h2', size = 'md', className, ...props }) {
    return createElement(Component, {
        className: cn('ui-title', sizeClassName[size], className),
        ...props,
    })
}
