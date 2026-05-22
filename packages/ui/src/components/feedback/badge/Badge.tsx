import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import './Badge.css'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { variant?: 'default' | 'primary' | 'success' | 'danger' }

const badgeVariants = cva({
  base: 'ui-badge',
  variants: { variant: { default: '', primary: 'ui-badge--primary', success: 'ui-badge--success', danger: 'ui-badge--danger' } },
  defaultVariants: { variant: 'default' },
})

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export type { BadgeProps }
