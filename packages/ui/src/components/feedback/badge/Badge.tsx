import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { BadgeProps } from './Badge.types'

const badgeVariants = cva({
  base: 'mr-badge',
  variants: {
    variant: {
      default: '',
      primary: 'mr-badge--primary',
      success: 'mr-badge--success',
      danger: 'mr-badge--danger',
      warning: 'mr-badge--warning',
    },
  },
  defaultVariants: { variant: 'default' },
})

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, ...props },
  ref,
) {
  const resolvedVariant = variant ?? 'default'

  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant: resolvedVariant }), className)}
      {...props}
      data-variant={resolvedVariant}
    />
  )
})

export type { BadgeProps, BadgeVariant } from './Badge.types'
