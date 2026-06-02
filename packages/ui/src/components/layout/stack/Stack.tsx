import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { StackProps } from './Stack.types'

const stackVariants = cva({
  base: 'mr-stack',
  variants: {
    gap: {
      xs: 'mr-stack--xs',
      sm: 'mr-stack--sm',
      md: 'mr-stack--md',
      lg: 'mr-stack--lg',
      xl: 'mr-stack--xl',
    },
    direction: {
      vertical: 'mr-stack--vertical',
      horizontal: 'mr-stack--horizontal',
    },
    align: {
      stretch: 'mr-stack--align-stretch',
      start: 'mr-stack--align-start',
      center: 'mr-stack--align-center',
      end: 'mr-stack--align-end',
    },
    justify: {
      start: 'mr-stack--justify-start',
      center: 'mr-stack--justify-center',
      end: 'mr-stack--justify-end',
      between: 'mr-stack--justify-between',
    },
  },
  defaultVariants: { gap: 'md', direction: 'vertical', align: 'stretch', justify: 'start' },
})

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap = 'md', direction = 'vertical', align = 'stretch', justify = 'start', className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(stackVariants({ gap, direction, align, justify }), className)}
      data-gap={gap}
      data-direction={direction}
      data-align={align}
      data-justify={justify}
      {...props}
    >
      {children}
    </div>
  )
})

export type { StackProps, StackGap, StackDirection, StackAlign, StackJustify } from './Stack.types'
