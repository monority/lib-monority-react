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
  },
  defaultVariants: { gap: 'md' },
})

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap = 'md', className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(stackVariants({ gap }), className)} data-gap={gap} {...props}>
      {children}
    </div>
  )
})

export type { StackProps, StackGap } from './Stack.types'
