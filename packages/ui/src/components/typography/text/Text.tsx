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

function TextStrong({ ref, tone = 'strong', as = 'strong', ...props }: TextProps) {
    return <Text ref={ref} as={as} tone={tone} {...props} />
}

function TextSpan({ ref, as = 'span', ...props }: TextProps) {
    return <Text ref={ref} as={as} {...props} />
}

function TextMuted({ ref, tone = 'muted', as = 'span', ...props }: TextProps) {
    return <Text ref={ref} as={as} tone={tone} {...props} />
}

function TextSmall({ ref, tone = 'muted', size = 'sm', as = 'small', ...props }: TextProps) {
    return <Text ref={ref} as={as} tone={tone} size={size} {...props} />
}

function TextCode({ ref, as = 'code', ...props }: TextProps) {
    return <Text ref={ref} as={as} {...props} />
}

Text.Strong = TextStrong
Text.Span = TextSpan
Text.Muted = TextMuted
Text.Small = TextSmall
Text.Code = TextCode

export { TextStrong, TextSpan, TextMuted, TextSmall, TextCode }
export type { TextProps, TextTone, TextSize } from './Text.types'
