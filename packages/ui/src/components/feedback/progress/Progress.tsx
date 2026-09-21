import { forwardRef, useId } from 'react'
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
    mode: {
      determinate: 'mr-progress--determinate',
      indeterminate: 'mr-progress--indeterminate',
    },
  },
  defaultVariants: { tone: 'neutral', mode: 'determinate' },
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
      mode = 'determinate',
      className,
      barClassName,
      ...props
    },
    ref,
  ) {
    const safeValue = clamp(value)
    const resolvedTone = tone ?? 'neutral'
    const isIndeterminate = mode === 'indeterminate'
    const labelId = useId()

    return (
      <div
        ref={ref}
        className={cn(progressVariants({ tone: resolvedTone, mode }), className)}
        data-tone={resolvedTone}
        data-mode={mode}
        data-value={isIndeterminate ? undefined : safeValue}
        {...props}
      >
        {label || showValue ? (
          <div className="mr-progress__meta">
            {label ? (
              <span className="mr-progress__label" id={labelId}>
                {label}
              </span>
            ) : (
              <span />
            )}
            {showValue && !isIndeterminate ? (
              <span className="mr-progress__value">{safeValue}%</span>
            ) : null}
          </div>
        ) : null}
        <div
          className="mr-progress__track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={isIndeterminate ? undefined : safeValue}
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : 'Progress'}
        >
          <div
            className={cn(
              'mr-progress__bar',
              isIndeterminate && 'mr-progress__bar--indeterminate',
              barClassName,
            )}
            style={isIndeterminate ? undefined : { width: `${safeValue}%` }}
          />
        </div>
      </div>
    )
  },
)

export type { ProgressProps, ProgressTone, ProgressMode } from './Progress.types'
