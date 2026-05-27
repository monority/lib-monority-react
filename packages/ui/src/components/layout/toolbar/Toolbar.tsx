import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { ToolbarProps } from './Toolbar.types'

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('mr-toolbar', className)} role="toolbar" {...props}>
      {children}
    </div>
  )
})

export type { ToolbarProps } from './Toolbar.types'
