import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { ContainerProps } from './Container.types'

const containerVariants = cva({
  base: 'mr-container',
  variants: {
    size: {
      sm: 'mr-container--sm',
      md: 'mr-container--md',
      lg: 'mr-container--lg',
      xl: 'mr-container--xl',
    },
  },
  defaultVariants: { size: 'md' },
})

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = 'md', className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(containerVariants({ size }), className)} data-size={size} {...props}>
      {children}
    </div>
  )
})

export type { ContainerProps, ContainerSize } from './Container.types'
