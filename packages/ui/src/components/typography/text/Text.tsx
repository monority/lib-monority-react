import { createElement } from 'react'
import { cn } from '@/lib/cn'
import type { TextProps } from './Text.types'

export function Text({
    as = 'p',
    tone = 'base',
    size = 'md',
    className,
    children,
    ref,
    ...props
}: TextProps) {
    return createElement(
        as,
        {
            ref,
            className: cn('mr-text', className),
            'data-tone': tone,
            'data-size': size,
            ...props,
        },
        children
    )
}

export type { TextProps, TextTone, TextSize } from './Text.types'
