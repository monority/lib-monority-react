import { useId } from 'react'
import { cn } from '@/lib/cn'
import type {
    ProgressBarProps,
    ProgressLabelProps,
    ProgressMetaProps,
    ProgressMode,
    ProgressProps,
    ProgressTone,
    ProgressTrackProps,
    ProgressValueProps,
} from './Progress.types'

function clamp(value: number, max: number): number {
    return Math.min(max, Math.max(0, value))
}

function ProgressTrack({ className, children, ref, ...props }: ProgressTrackProps) {
    return (
        <div ref={ref} className={cn('mr-progress__track', className)} {...props}>
            {children}
        </div>
    )
}

function ProgressBar({ className, ref, ...props }: ProgressBarProps) {
    return <div ref={ref} className={cn('mr-progress__bar', className)} {...props} />
}

function ProgressMeta({ className, children, ref, ...props }: ProgressMetaProps) {
    return (
        <div ref={ref} className={cn('mr-progress__meta', className)} {...props}>
            {children}
        </div>
    )
}

function ProgressLabel({ className, children, ref, ...props }: ProgressLabelProps) {
    return (
        <span ref={ref} className={cn('mr-progress__label', className)} {...props}>
            {children}
        </span>
    )
}

function ProgressValue({ className, children, ref, ...props }: ProgressValueProps) {
    return (
        <span ref={ref} className={cn('mr-progress__value', className)} {...props}>
            {children}
        </span>
    )
}

export function Progress({
    value = 0,
    max = 100,
    label,
    showValue = true,
    tone = 'neutral',
    mode = 'determinate',
    className,
    barClassName,
    ref,
    ...props
}: ProgressProps) {
    const isIndeterminate = mode === 'indeterminate'
    const safeValue = isIndeterminate ? 0 : clamp(value, max)
    const percentage = max > 0 ? Math.round((safeValue / max) * 100) : 0
    const labelId = useId()

    return (
        <div
            ref={ref}
            className={cn('mr-progress', className)}
            data-tone={tone}
            data-mode={mode}
            data-value={isIndeterminate ? undefined : safeValue}
            {...props}
        >
            {label != null || showValue ? (
                <ProgressMeta>
                    {label != null ? <ProgressLabel id={labelId}>{label}</ProgressLabel> : <span />}
                    {showValue && !isIndeterminate ? (
                        <ProgressValue>{percentage}%</ProgressValue>
                    ) : null}
                </ProgressMeta>
            ) : null}
            <div
                className="mr-progress__track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuenow={isIndeterminate ? undefined : safeValue}
                aria-labelledby={label != null ? labelId : undefined}
                aria-label={label != null ? undefined : 'Progress'}
            >
                <div
                    className={cn(
                        'mr-progress__bar',
                        isIndeterminate && 'mr-progress__bar--indeterminate',
                        barClassName
                    )}
                    style={isIndeterminate ? undefined : { inlineSize: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

Progress.Track = ProgressTrack
Progress.Bar = ProgressBar
Progress.Meta = ProgressMeta
Progress.Label = ProgressLabel
Progress.Value = ProgressValue

export type {
    ProgressBarProps,
    ProgressLabelProps,
    ProgressMetaProps,
    ProgressMode,
    ProgressProps,
    ProgressTone,
    ProgressTrackProps,
    ProgressValueProps,
} from './Progress.types'
