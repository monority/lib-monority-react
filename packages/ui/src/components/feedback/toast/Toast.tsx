import { cn } from '@/lib/cn'
import { Button } from '@/components/actions/button/Button'

type ToastTone = 'neutral' | 'success' | 'danger'
const toneClassName: Record<ToastTone, string> = { neutral: 'ui-toast--neutral', success: 'ui-toast--success', danger: 'ui-toast--danger' }

interface ToastProps { title?: React.ReactNode; description?: React.ReactNode; tone?: ToastTone; className?: string; onClose?: () => void }

export function Toast({ title, description, tone = 'neutral', className, onClose }: ToastProps) {
  const role = tone === 'danger' ? 'alert' : 'status'
  return (
    <div className={cn('ui-toast', toneClassName[tone], className)} role={role} aria-live={tone === 'danger' ? 'assertive' : 'polite'}>
      <div className="stack-s">
        <div className="ui-toast__header">
          <strong className="ui-toast__title">{title}</strong>
          {onClose ? <Button variant="ghost" size="sm" className="ui-toast__close" onClick={onClose} aria-label="Fermer la notification">×</Button> : null}
        </div>
        {description ? <p className="ui-toast__description">{description}</p> : null}
      </div>
    </div>
  )
}
