import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { ProgressProps, ProgressTone } from './Progress.types'

const progressVariants = cva({
  base: 'mr-progress',
  variants: {
    tone: {
      neutral: 'mr-progress--neutral',
      success: 'mr-progress--success',
      warning: 'mr-progress--warning',
      danger: 'mr-progress--danger',
    },
  },
  defaultVariants: { tone: 'neutral' },
})

function clamp(value: number): number {
  return Math.min(100, Math.max(0, value))
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      value = 0,
      label,
      showValue = true,
      tone,
      className,
      barClassName,
      ...props
    },
    ref,
  ) {
    const safeValue = clamp(value)
    const resolvedTone = tone ?? 'neutral'

    return (
      <div
        ref={ref}
        className={cn(progressVariants({ tone: resolvedTone }), className)}
        data-tone={resolvedTone}
        data-value={safeValue}
        {...props}
      >
        {label || showValue ? (
          <div className="mr-progress__meta">
            {label ? <span className="mr-progress__label">{label}</span> : <span />}
            {showValue ? <span className="mr-progress__value">{safeValue}%</span> : null}
          </div>
        ) : null}
        <div
          className="mr-progress__track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={safeValue}
          aria-label={typeof label === 'string' ? label : 'Progress'}
        >
          <div
            className={cn('mr-progress__bar', barClassName)}
            style={{ width: `${safeValue}%` }}
          />
        </div>
      </div>
    )
  },
)

export type { ProgressProps, ProgressTone } from './Progress.types'
