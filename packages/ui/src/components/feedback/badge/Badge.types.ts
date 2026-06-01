import type { HTMLAttributes } from 'react'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}
