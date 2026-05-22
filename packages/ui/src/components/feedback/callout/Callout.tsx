import { cn } from '@/lib/cn'

type CalloutTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
const toneClassName: Record<CalloutTone, string> = { neutral: 'ui-callout--neutral', info: 'ui-callout--info', success: 'ui-callout--success', warning: 'ui-callout--warning', danger: 'ui-callout--danger' }

interface CalloutProps { title?: React.ReactNode; description?: React.ReactNode; tone?: CalloutTone; className?: string; children?: React.ReactNode }

export function Callout({ title, description, tone = 'neutral', className, children }: CalloutProps) {
  return <div className={cn('ui-callout', toneClassName[tone], className)} role="note">
    {title ? <strong className="ui-callout__title">{title}</strong> : null}
    {description ? <p className="ui-callout__description">{description}</p> : null}
    {children}
  </div>
}
