import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { SpinnerProps } from './Spinner.types'

const spinnerVariants = cva({
  base: 'mr-spinner',
  variants: {
    size: {
      sm: 'mr-spinner--sm',
      md: 'mr-spinner--md',
      lg: 'mr-spinner--lg',
    },
    tone: {
      base: 'mr-spinner--base',
      muted: 'mr-spinner--muted',
      inverse: 'mr-spinner--inverse',
    },
  },
  defaultVariants: { size: 'md', tone: 'base' },
})

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner({ size = 'md', tone = 'base', className, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cn(spinnerVariants({ size, tone }), className)}
        role="status"
        aria-label="Loading"
        data-size={size}
        data-tone={tone}
        {...props}
      >
        <span className="mr-spinner__ring" />
      </span>
    )
  },
)

export type { SpinnerProps, SpinnerSize, SpinnerTone } from './Spinner.types'
