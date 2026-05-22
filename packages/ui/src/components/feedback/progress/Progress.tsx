import { cn } from '@/lib/cn'

type ProgressTone = 'neutral' | 'success' | 'warning' | 'danger'
const toneClassName: Record<ProgressTone, string> = { neutral: 'ui-progress--neutral', success: 'ui-progress--success', warning: 'ui-progress--warning', danger: 'ui-progress--danger' }
const clampValue = (value: number): number => Math.min(100, Math.max(0, value))

interface ProgressProps { value?: number; label?: string; showValue?: boolean; tone?: ProgressTone; className?: string; barClassName?: string }

export function Progress({ value = 0, label, showValue = true, tone = 'neutral', className, barClassName }: ProgressProps) {
  const safeValue = clampValue(value)
  return (
    <div className={cn('ui-progress', toneClassName[tone], className)}>
      {label || showValue ? <div className="ui-progress__meta">{label ? <span className="ui-progress__label">{label}</span> : <span />}{showValue ? <span className="ui-progress__value">{safeValue}%</span> : null}</div> : null}
      <div className="ui-progress__track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue} aria-label={label || 'Progression'}>
        <div className={cn('ui-progress__bar', barClassName)} style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  )
}
