import type { HTMLAttributes, ReactNode } from 'react'

export type BannerTone = 'info' | 'success' | 'warning' | 'danger'

export interface BannerProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  tone?: BannerTone
  eyebrow?: ReactNode
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
}
