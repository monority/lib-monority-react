import { createElement } from 'react'
import { cn } from '@/lib/cn'

const gapClassName = {
    s: 'stack-s',
    m: 'stack-m',
    l: 'stack-l',
    xl: 'stack-xl',
}

export function Stack({ as: Component = 'div', gap = 'm', className, ...props }) {
    return createElement(Component, {
        className: cn(gapClassName[gap], className),
        ...props,
    })
}
