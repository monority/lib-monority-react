import { forwardRef, useCallback } from 'react'
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
      onChange,
      ...props
    },
    ref,
  ) {
    const safeValue = clamp(value)
    const resolvedTone = tone ?? 'neutral'
    const isIndeterminate = mode === 'indeterminate'
    const isSlidable = !!onChange && !isIndeterminate

    const handleTrackClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!onChange) return
        const rect = e.currentTarget.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        onChange(clamp(Math.round(ratio * 100)))
      },
      [onChange],
    )

    return (
      <div
        ref={ref}
        className={cn(
          progressVariants({ tone: resolvedTone, mode }),
          isSlidable && 'mr-progress--slidable',
          className,
        )}
        data-tone={resolvedTone}
        data-mode={mode}
        data-value={isIndeterminate ? undefined : safeValue}
        {...props}
      >
        {label || showValue ? (
          <div className="mr-progress__meta">
            {label ? <span className="mr-progress__label">{label}</span> : <span />}
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
          aria-label={typeof label === 'string' ? label : 'Progress'}
          onClick={handleTrackClick}
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
