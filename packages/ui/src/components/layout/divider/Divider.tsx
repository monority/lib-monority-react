import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { DividerProps } from './Divider.types'

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { className, label, children, orientation = 'horizontal', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('mr-divider', className)}
      role='separator'
      aria-orientation={orientation}
      data-orientation={orientation}
      {...props}
    >
      {label || children ? <span className='mr-divider__label'>{label ?? children}</span> : null}
    </div>
  )
})

export type { DividerProps } from './Divider.types'
