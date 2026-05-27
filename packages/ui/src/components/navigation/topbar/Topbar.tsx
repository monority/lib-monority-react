import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { TopbarProps } from './Topbar.types'

export const Topbar = forwardRef<HTMLElement, TopbarProps>(
  function Topbar({ className, children, ...props }, ref) {
    return (
      <header ref={ref} className={cn('mr-topbar', className)} {...props}>
        {children}
      </header>
    )
  },
)

export type { TopbarProps } from './Topbar.types'
