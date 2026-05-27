import { createElement, forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { TitleProps } from './Title.types'

const titleVariants = cva({
  base: 'mr-title',
  variants: {
    size: {
      sm: 'mr-title--sm',
      md: 'mr-title--md',
      lg: 'mr-title--lg',
      display: 'mr-title--display',
    },
  },
  defaultVariants: { size: 'md' },
})

export const Title = forwardRef<HTMLElement, TitleProps>(
  function Title(
    { as = 'h2', size = 'md', className, children, ...props },
    ref,
  ) {
    return createElement(
      as,
      {
        ref,
        className: cn(titleVariants({ size }), className),
        'data-size': size,
        ...props,
      },
      children,
    )
  },
)

export type { TitleProps, TitleSize } from './Title.types'
