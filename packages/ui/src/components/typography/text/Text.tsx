import { createElement, forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { TextProps } from './Text.types'

const textVariants = cva({
  base: 'mr-text',
  variants: {
    tone: {
      muted: 'mr-text--muted',
      base: 'mr-text--base',
      strong: 'mr-text--strong',
    },
    size: {
      sm: 'mr-text--sm',
      md: 'mr-text--md',
      lg: 'mr-text--lg',
    },
  },
  defaultVariants: { tone: 'base', size: 'md' },
})

export const Text = forwardRef<HTMLElement, TextProps>(
  function Text(
    { as = 'p', tone = 'base', size = 'md', className, children, ...props },
    ref,
  ) {
    return createElement(
      as,
      {
        ref,
        className: cn(textVariants({ tone, size }), className),
        'data-tone': tone,
        'data-size': size,
        ...props,
      },
      children,
    )
  },
)

export type { TextProps, TextTone, TextSize } from './Text.types'
