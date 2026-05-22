import { cn } from '@/lib/cn'
import './Spinner.css'

type SpinnerSize = 'sm' | 'md' | 'lg'
type SpinnerTone = 'base' | 'muted' | 'inverse'

const sizeClassName: Record<SpinnerSize, string> = { sm: 'ui-spinner--sm', md: 'ui-spinner--md', lg: 'ui-spinner--lg' }
const toneClassName: Record<SpinnerTone, string> = { base: 'ui-spinner--base', muted: 'ui-spinner--muted', inverse: 'ui-spinner--inverse' }

interface SpinnerProps { size?: SpinnerSize; tone?: SpinnerTone; className?: string }

export function Spinner({ size = 'md', tone = 'base', className }: SpinnerProps) {
  return <span className={cn('ui-spinner', sizeClassName[size], toneClassName[tone], className)} aria-label="Loading" role="status">
    <span className="ui-spinner__ring" />
  </span>
}

export type { SpinnerProps, SpinnerSize, SpinnerTone }
