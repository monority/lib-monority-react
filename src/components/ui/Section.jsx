import { createElement } from 'react'
import { cn } from '@/lib/cn'

const spacingClassName = {
    sm: 'section--sm',
    md: 'section--md',
    lg: 'section--lg',
}

export function Section({
    as: Component = 'section',
    spacing = 'md',
    surface = false,
    className,
    ...props
}) {
    return createElement(Component, {
        className: cn(
            'section',
            spacingClassName[spacing],
            surface && 'surface',
            surface && 'section--surface',
            className,
        ),
        ...props,
    })
}
