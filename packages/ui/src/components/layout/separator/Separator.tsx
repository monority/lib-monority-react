import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { SeparatorProps } from './Separator.types'

const separatorVariants = cva({
  base: 'mr-separator',
  variants: {
    orientation: {
      horizontal: 'mr-separator--horizontal',
      vertical: 'mr-separator--vertical',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
})

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', decorative = false, className, ...props },
  ref,
) {
  const role = decorative ? 'presentation' : 'separator'

  return (
    <div
      ref={ref}
      className={cn(separatorVariants({ orientation }), className)}
      role={role}
      aria-orientation={!decorative ? orientation : undefined}
      data-orientation={orientation}
      {...props}
    />
  )
})

export type { SeparatorProps } from './Separator.types'
