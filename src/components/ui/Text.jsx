import { createElement } from 'react'
import { cn } from '@/lib/cn'

const toneClassName = {
    muted: 'ui-text--muted',
    base: 'ui-text--base',
    strong: 'ui-text--strong',
}

const sizeClassName = {
    sm: 'ui-text--sm',
    md: 'ui-text--md',
    lg: 'ui-text--lg',
}

export function Text({
    as: Component = 'p',
    tone = 'muted',
    size = 'md',
    className,
    ...props
}) {
    return createElement(Component, {
        className: cn('ui-text', toneClassName[tone], sizeClassName[size], className),
        ...props,
    })
}
