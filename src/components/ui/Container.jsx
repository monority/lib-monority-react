import { createElement } from 'react'
import { cn } from '@/lib/cn'

const sizeClassName = {
    sm: 'container-sm',
    md: 'container',
    lg: 'container-lg',
    fluid: 'container-fluid',
}

const gutterClassName = {
    sm: 'container-gutter-sm',
    md: 'container-gutter-md',
    lg: 'container-gutter-lg',
}

export function Container({
    as: Component = 'div',
    size = 'md',
    gutter = 'md',
    className,
    ...props
}) {
    return createElement(Component, {
        className: cn(sizeClassName[size], gutterClassName[gutter], className),
        ...props,
    })
}
