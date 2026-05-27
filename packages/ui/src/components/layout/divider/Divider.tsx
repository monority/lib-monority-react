import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { DividerProps } from './Divider.types'

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { className, ...props },
  ref,
) {
  return (
    <hr
      ref={ref}
      className={cn('mr-divider', className)}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  )
})

export type { DividerProps } from './Divider.types'
