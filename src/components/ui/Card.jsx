import { createElement } from 'react'
import { cn } from '@/lib/cn'

const paddingClassName = {
    sm: 'ui-card--sm',
    md: 'ui-card--md',
    lg: 'ui-card--lg',
}

export function Card({
    as: Component = 'article',
    padding = 'md',
    interactive = false,
    className,
    ...props
}) {
    return createElement(Component, {
        className: cn(
            'ui-card',
            paddingClassName[padding],
            interactive && 'ui-card--interactive',
            className,
        ),
        ...props,
    })
}
