import type { HTMLAttributes } from 'react'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}
