import { cn } from '@/lib/cn'
import { Text } from '@/components/typography/text/Text'
import { Title } from '@/components/typography/title/Title'

type BannerTone = 'info' | 'success' | 'warning' | 'danger'
const toneClassName: Record<BannerTone, string> = { info: 'ui-banner--info', success: 'ui-banner--success', warning: 'ui-banner--warning', danger: 'ui-banner--danger' }

interface BannerProps { tone?: BannerTone; eyebrow?: React.ReactNode; title?: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode; className?: string }

export function Banner({ tone = 'info', eyebrow, title, description, actions, className }: BannerProps) {
  return <section className={cn('ui-banner', toneClassName[tone], className)}>
    <div className="ui-banner__content">
      {eyebrow ? <Text as="span" tone="strong" size="sm" className="ui-banner__eyebrow">{eyebrow}</Text> : null}
      {title ? <Title as="h3" size="md" className="ui-banner__title">{title}</Title> : null}
      {description ? <Text tone="base" className="ui-banner__description">{description}</Text> : null}
    </div>
    {actions ? <div className="ui-banner__actions">{actions}</div> : null}
  </section>
}
